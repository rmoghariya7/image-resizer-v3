import type { Preset } from '@/types/registry'
import type { AcceptedMimeType } from '../types'

// ─── Geometry ─────────────────────────────────────────────────────────────────

interface DrawParams {
  sx: number; sy: number; sw: number; sh: number
  dx: number; dy: number; dw: number; dh: number
}

function coverFit(
  srcW: number, srcH: number,
  dstW: number, dstH: number,
): DrawParams {
  const srcRatio = srcW / srcH
  const dstRatio = dstW / dstH
  let sx = 0, sy = 0, sw = srcW, sh = srcH

  if (srcRatio > dstRatio) {
    sw = Math.round(srcH * dstRatio)
    sx = Math.round((srcW - sw) / 2)
  } else {
    sh = Math.round(srcW / dstRatio)
    sy = Math.round((srcH - sh) / 2)
  }

  return { sx, sy, sw, sh, dx: 0, dy: 0, dw: dstW, dh: dstH }
}

// ─── Quality binary search ────────────────────────────────────────────────────
// Returns the highest-quality blob that is ≤ targetBytes, or the minimum-quality
// blob if nothing in [loQ, hiQ] satisfies the constraint.
//
// The caller must check blob.size ≤ targetBytes to know whether the target
// was actually reached — this function never throws on failure.

async function binarySearchQuality(
  canvas: OffscreenCanvas,
  mimeType: string,
  loQ: number,
  hiQ: number,
  targetBytes: number,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  const MAX_ITER = 10

  // Fast exit: already fits at max quality — return immediately.
  let candidate = await canvas.convertToBlob({ type: mimeType, quality: hiQ })
  if (candidate.size <= targetBytes) return candidate

  let lo = loQ
  let hi = hiQ
  let best: Blob | null = null

  for (let i = 0; i < MAX_ITER; i++) {
    const mid = (lo + hi) / 2
    candidate = await canvas.convertToBlob({ type: mimeType, quality: mid })
    onProgress(Math.round(((i + 1) / MAX_ITER) * 100))

    if (candidate.size <= targetBytes) {
      best = candidate
      lo = mid   // try higher quality (might still fit)
    } else {
      hi = mid   // too big, go lower
    }
  }

  if (best) return best

  // Nothing in [loQ, hiQ] fits — return min-quality as absolute floor.
  // Caller checks blob.size > targetBytes and handles accordingly.
  return canvas.convertToBlob({ type: mimeType, quality: loQ })
}

// ─── Shared canvas factory ────────────────────────────────────────────────────

function drawToCanvas(bitmap: ImageBitmap, w: number, h: number): OffscreenCanvas {
  const canvas = new OffscreenCanvas(w, h)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('OffscreenCanvas 2D context not available in this environment.')
  ctx.drawImage(bitmap, 0, 0, w, h)
  return canvas
}

// ─── Image preset ─────────────────────────────────────────────────────────────

export async function processImagePreset(
  bitmap: ImageBitmap,
  preset: Extract<Preset, { kind: 'image' }>,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  const canvas = new OffscreenCanvas(preset.widthPx, preset.heightPx)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('OffscreenCanvas 2D context not available in this environment.')

  onProgress(5)

  if (preset.backgroundFill) {
    ctx.fillStyle = preset.backgroundFill
    ctx.fillRect(0, 0, preset.widthPx, preset.heightPx)
  }

  const fit = coverFit(bitmap.width, bitmap.height, preset.widthPx, preset.heightPx)
  ctx.drawImage(bitmap, fit.sx, fit.sy, fit.sw, fit.sh, fit.dx, fit.dy, fit.dw, fit.dh)
  bitmap.close()

  onProgress(15)

  const mimeType = `image/${preset.format}`

  if (!preset.maxSizeKB) {
    const blob = await canvas.convertToBlob({ type: mimeType, quality: preset.startQuality / 100 })
    onProgress(100)
    return blob
  }

  const blob = await binarySearchQuality(
    canvas, mimeType,
    0.3, preset.startQuality / 100,
    preset.maxSizeKB * 1024,
    onProgress,
  )
  onProgress(100)
  return blob
}

// ─── Compress preset ──────────────────────────────────────────────────────────
//
// Two-axis compression: binary-search quality at full resolution first, then
// progressively downscale if quality alone cannot reach the target.
//
// Why downscaling is necessary:
//   JPEG quality controls encoding fidelity, not pixel count. A 3MP image at
//   the absolute minimum quality (q=0.01) typically produces 40–120 KB — far
//   above the 15 KB target. Reducing dimensions is the only way to reach very
//   small targets. We prefer the highest scale (best quality) that can still
//   meet the byte budget.
//
// Algorithm:
//   For each scale in descending order [1.0, 0.70, 0.50, ...]:
//     1. Redraw bitmap at (width * scale, height * scale)
//     2. Binary-search quality between [minQ, maxQ]
//     3. If resulting blob ≤ targetBytes → return it (highest quality that fits)
//     4. Otherwise shrink further
//   Fallback: return the minimum-scale + minimum-quality blob (best we can do).

// Scale sequence: area halves roughly every 2 steps, giving ~7 progressively
// smaller canvases. Stops as soon as target is reached.
const COMPRESS_SCALES = [1.0, 0.70, 0.50, 0.35, 0.25, 0.17, 0.12] as const

export async function processCompressPreset(
  bitmap: ImageBitmap,
  preset: Extract<Preset, { kind: 'compress' }>,
  originalMime: AcceptedMimeType,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  const targetBytes = preset.targetKB * 1024
  // preserveFormat: false → JPEG always (better compression for small targets)
  const outputMime: string = preset.preserveFormat ? originalMime : 'image/jpeg'
  const minQ = preset.minQuality / 100
  const maxQ = preset.maxQuality / 100

  const totalPhases = COMPRESS_SCALES.length
  let fallback: Blob | null = null

  for (let phase = 0; phase < totalPhases; phase++) {
    const scale = COMPRESS_SCALES[phase]
    const w = Math.max(1, Math.round(bitmap.width * scale))
    const h = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = drawToCanvas(bitmap, w, h)

    // Spread progress evenly across phases: phase 0 = 5–19%, phase 1 = 20–34%, etc.
    const phaseStart = 5 + Math.round((phase / totalPhases) * 85)
    const phaseEnd   = 5 + Math.round(((phase + 1) / totalPhases) * 85)
    const phaseProgress = (p: number) =>
      onProgress(phaseStart + Math.round((p / 100) * (phaseEnd - phaseStart)))

    const blob = await binarySearchQuality(canvas, outputMime, minQ, maxQ, targetBytes, phaseProgress)

    // Track the last attempt for the absolute fallback return.
    fallback = blob

    if (blob.size <= targetBytes) {
      bitmap.close()
      onProgress(100)
      return blob
    }

    // This scale's minimum quality still produces a blob over target.
    // Continue to next (smaller) scale.
  }

  // Absolute fallback: return the last (smallest scale + min quality) blob.
  // The result panel shows target vs. actual so the user sees the overage.
  bitmap.close()
  onProgress(100)
  return fallback!
}

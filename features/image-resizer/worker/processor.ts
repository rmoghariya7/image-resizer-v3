import type { Preset } from '@/types/registry'
import type { AcceptedMimeType } from '../types'
import type { CompressionStatus } from '../types'

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
// Returns the candidate closest to targetBytes across the explored quality range.
//
// Objective: minimize |blob.size - targetBytes|
//
// The search range adapts to the initial probe at hiQ:
//   • If hiQ already fits (≤ target): explore ABOVE hiQ (up to QUALITY_CEIL) so
//     we find the highest-quality encoding that still fits — rather than stopping
//     at a potentially far-below-target result.
//   • If hiQ is over target: explore BELOW hiQ (down to loQ) as before.
//
// The caller checks blob.size vs targetBytes to determine compressionStatus.

const QUALITY_CEIL = 0.99 // ceiling for upward search (1.0 often acts like 0.99)

async function binarySearchQuality(
  canvas: OffscreenCanvas,
  mimeType: string,
  loQ: number,
  hiQ: number,
  targetBytes: number,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  const MAX_ITER = 12

  // Track the candidate with minimum |size - targetBytes| across all probes.
  let closest: Blob | null = null
  const nearest = (b: Blob): void => {
    if (!closest || Math.abs(b.size - targetBytes) < Math.abs(closest.size - targetBytes)) {
      closest = b
    }
  }

  // Initial probe at hiQ determines which direction to search.
  let probe = await canvas.convertToBlob({ type: mimeType, quality: hiQ })
  nearest(probe)

  let lo: number
  let hi: number

  if (probe.size <= targetBytes) {
    // hiQ fits under target. The closest match may be at a HIGHER quality
    // (producing more bytes, still ≤ target). Extend the range upward.
    const ceiling = await canvas.convertToBlob({ type: mimeType, quality: QUALITY_CEIL })
    nearest(ceiling)
    if (ceiling.size <= targetBytes) {
      // Even the ceiling fits — return it (maximum quality, closest to target).
      return closest!
    }
    // ceiling is over target, hiQ is under — binary search [hiQ, QUALITY_CEIL].
    lo = hiQ
    hi = QUALITY_CEIL
  } else {
    // hiQ is over target — binary search [loQ, hiQ] to find something that fits.
    lo = loQ
    hi = hiQ
  }

  for (let i = 0; i < MAX_ITER; i++) {
    const mid = (lo + hi) / 2
    probe = await canvas.convertToBlob({ type: mimeType, quality: mid })
    onProgress(Math.round(((i + 1) / MAX_ITER) * 100))
    nearest(probe)

    if (probe.size <= targetBytes) {
      lo = mid  // try higher quality (might get closer to target from below)
    } else {
      hi = mid  // too big, go lower
    }
  }

  return closest!
}

// ─── Shared canvas factory ────────────────────────────────────────────────────

function drawToCanvas(bitmap: ImageBitmap, w: number, h: number, outputMime: string): OffscreenCanvas {
  const canvas = new OffscreenCanvas(w, h)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('OffscreenCanvas 2D context not available in this environment.')
  if (outputMime === 'image/jpeg') {
    // JPEG has no alpha channel. Without this fill, the browser composites
    // transparent canvas pixels against black, producing black areas.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
  }
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

  // For JPEG output, a background fill is required — JPEG has no alpha channel.
  // Use the preset's explicit fill if provided, otherwise default to white so
  // transparent PNG inputs don't composite against black.
  const bgColor = preset.backgroundFill ?? (preset.format === 'jpeg' ? '#ffffff' : null)
  if (bgColor) {
    ctx.fillStyle = bgColor
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

// ─── Pure helpers (exported for unit tests) ───────────────────────────────────

/**
 * Decides the output MIME type for a compress operation.
 *
 * Rules:
 * - PNG inputs always output PNG: JPEG has no alpha channel and would composite
 *   transparent areas against black.
 * - JPEG/WEBP inputs follow the preset's preserveFormat flag: false allows
 *   conversion to JPEG for better compression at small sizes.
 */
export function selectOutputMime(
  originalMime: AcceptedMimeType,
  preserveFormat: boolean,
): string {
  if (originalMime === 'image/png') return 'image/png'
  return preserveFormat ? originalMime : 'image/jpeg'
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
): Promise<{ blob: Blob; compressionStatus: Extract<CompressionStatus, 'compressed' | 'could-not-reach-target'> }> {
  const targetBytes = preset.targetKB * 1024

  const outputMime = selectOutputMime(originalMime, preset.preserveFormat)

  const minQ = preset.minQuality / 100
  const maxQ = preset.maxQuality / 100

  const totalPhases = COMPRESS_SCALES.length

  // Track the globally closest blob across all scales for the could-not-reach-target path.
  // When all scales produce blobs > target, this is the one with minimum overshoot.
  let globalClosest: Blob | null = null
  const updateGlobal = (b: Blob): void => {
    if (!globalClosest || Math.abs(b.size - targetBytes) < Math.abs(globalClosest.size - targetBytes)) {
      globalClosest = b
    }
  }

  for (let phase = 0; phase < totalPhases; phase++) {
    const scale = COMPRESS_SCALES[phase]
    const w = Math.max(1, Math.round(bitmap.width * scale))
    const h = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = drawToCanvas(bitmap, w, h, outputMime)

    // Spread progress evenly across phases: phase 0 = 5–19%, phase 1 = 20–34%, etc.
    const phaseStart = 5 + Math.round((phase / totalPhases) * 85)
    const phaseEnd   = 5 + Math.round(((phase + 1) / totalPhases) * 85)
    const phaseProgress = (p: number) =>
      onProgress(phaseStart + Math.round((p / 100) * (phaseEnd - phaseStart)))

    const blob = await binarySearchQuality(canvas, outputMime, minQ, maxQ, targetBytes, phaseProgress)
    updateGlobal(blob)

    if (blob.size <= targetBytes) {
      // This scale's binary search already returned the closest match ≤ target.
      // Smaller scales would only move further below target, so stop here.
      bitmap.close()
      onProgress(100)
      return { blob, compressionStatus: 'compressed' }
    }

    // This scale's closest match is still over target — try a smaller scale.
  }

  // All scales exhausted. Return the globally closest blob (minimum overshoot).
  bitmap.close()
  onProgress(100)
  return { blob: globalClosest!, compressionStatus: 'could-not-reach-target' }
}

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
    // Source wider than target — crop sides, keep centre
    sw = Math.round(srcH * dstRatio)
    sx = Math.round((srcW - sw) / 2)
  } else {
    // Source taller — crop top/bottom, keep centre
    sh = Math.round(srcW / dstRatio)
    sy = Math.round((srcH - sh) / 2)
  }

  return { sx, sy, sw, sh, dx: 0, dy: 0, dw: dstW, dh: dstH }
}

// ─── Quality binary search ────────────────────────────────────────────────────

async function binarySearchQuality(
  canvas: OffscreenCanvas,
  mimeType: string,
  loQ: number,
  hiQ: number,
  targetBytes: number,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  const MAX_ITER = 12

  let candidate = await canvas.convertToBlob({ type: mimeType, quality: hiQ })
  if (candidate.size <= targetBytes) return candidate

  let lo = loQ
  let hi = hiQ
  let best: Blob | null = null

  for (let i = 0; i < MAX_ITER; i++) {
    const mid = (lo + hi) / 2
    candidate = await canvas.convertToBlob({ type: mimeType, quality: mid })
    onProgress(Math.round((i / MAX_ITER) * 70 + 20))

    if (candidate.size <= targetBytes) {
      best = candidate
      lo = mid
    } else {
      hi = mid
    }
  }

  if (best) return best

  // Nothing fit — return at minimum quality rather than throwing
  return canvas.convertToBlob({ type: mimeType, quality: loQ })
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

export async function processCompressPreset(
  bitmap: ImageBitmap,
  preset: Extract<Preset, { kind: 'compress' }>,
  originalMime: AcceptedMimeType,
  onProgress: (percent: number) => void,
): Promise<Blob> {
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('OffscreenCanvas 2D context not available in this environment.')

  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()

  onProgress(10)

  // preserveFormat: true = keep original format; false = convert to JPEG for best compression
  const outputMime: string = preset.preserveFormat ? originalMime : 'image/jpeg'

  const blob = await binarySearchQuality(
    canvas, outputMime,
    preset.minQuality / 100,
    preset.maxQuality / 100,
    preset.targetKB * 1024,
    onProgress,
  )

  onProgress(100)
  return blob
}

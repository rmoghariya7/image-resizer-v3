import type { ImagePreset, OutputFormat } from '@/registry/presets/schema'

export type CustomPresetInput = {
  widthPx: number
  heightPx: number
  format: OutputFormat
  /** 1-100 */
  quality: number
  aspectRatioLock?: boolean
}

/**
 * Builds an ImagePreset object at runtime for the standalone /resize-image
 * (custom dimensions) and /convert-image (format-only, dims = original)
 * Core Tool pages. These pages don't correspond to a fixed goal, so there is
 * no static file in registry/presets/image/ — this is the ONLY ImagePreset
 * ever constructed outside the registry.
 *
 * The result flows into the exact same useImageResizer → Web Worker →
 * processImagePreset pipeline used by every goal page. Nothing in the
 * worker changes: it already treats `preset` as plain data.
 */
export function buildCustomPreset(input: CustomPresetInput): ImagePreset {
  const widthPx = clampDimension(input.widthPx)
  const heightPx = clampDimension(input.heightPx)
  const quality = Math.min(100, Math.max(1, Math.round(input.quality)))

  return {
    key: 'custom',
    kind: 'image',
    widthPx,
    heightPx,
    dpi: 96,
    format: input.format,
    startQuality: quality,
    aspectRatioLock: input.aspectRatioLock ?? false,
    displayDimensions: `${widthPx} × ${heightPx} px`,
    displayFormat: input.format.toUpperCase(),
  }
}

/** Output pixel dimensions must stay within sane bounds — 1px to 8000px per side. */
export function clampDimension(value: number): number {
  if (!Number.isFinite(value)) return 1
  return Math.min(8000, Math.max(1, Math.round(value)))
}

/**
 * Reads the natural pixel dimensions of an image File without going through
 * the Web Worker pipeline — used before the worker starts so the caller can
 * build an exact preset (e.g. "keep original size" for /convert-image) before
 * any processing begins.
 */
export function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(objectUrl)
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Could not read this image. Please try a different file.'))
    }
    img.src = objectUrl
  })
}

/**
 * Given an original width/height and a new width (or height), returns the
 * other dimension scaled to preserve the original aspect ratio. Used by the
 * "lock aspect ratio" toggle in CustomResizeTool.
 */
export function scaleToAspect(
  originalWidth: number,
  originalHeight: number,
  changedDimension: 'width' | 'height',
  newValue: number,
): { width: number; height: number } {
  const ratio = originalWidth / originalHeight
  if (changedDimension === 'width') {
    return { width: newValue, height: clampDimension(newValue / ratio) }
  }
  return { width: clampDimension(newValue * ratio), height: newValue }
}

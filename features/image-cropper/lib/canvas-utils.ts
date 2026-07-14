import type { CropArea, ExportOptions } from '../types'

// ─── Pure geometry helpers (unit tested) ─────────────────────────────────────

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the bounding box of a `width`×`height` rectangle after it has been
 * rotated by `rotation` degrees around its centre. Used to size the
 * intermediate canvas large enough to hold the fully-rotated source image
 * without clipping any corners.
 */
export function rotateSize(
  width: number,
  height: number,
  rotation: number,
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * Clamps a value between min and max — used for zoom/rotation slider input
 * sanitisation before it reaches canvas math.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Parses a "W:H" custom ratio string (e.g. "5:7") into a numeric aspect ratio.
 * Returns null for anything that isn't two positive numbers.
 */
export function parseCustomRatio(raw: string): number | null {
  const match = raw.trim().match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/)
  if (!match) return null
  const w = Number(match[1])
  const h = Number(match[2])
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null
  return w / h
}

// ─── Browser-only image + canvas pipeline ────────────────────────────────────

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    // Needed to avoid a tainted-canvas error for cross-origin object URLs.
    image.crossOrigin = 'anonymous'
    image.src = url
  })
}

function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not available in this browser.')
  return ctx
}

/**
 * Crops `imageSrc` to `pixelCrop` (in the image's natural pixel space, as
 * produced by react-easy-crop's onCropComplete), applying rotation and/or
 * flip first, then optionally resizing the result to an exact output size.
 *
 * Pipeline:
 *   1. Draw the full source image onto a canvas sized to its rotated bounding
 *      box, centred, flipped and rotated as requested.
 *   2. Cut out `pixelCrop` from that canvas onto a second canvas.
 *   3. If outputWidth/outputHeight are set, draw step 2's canvas onto a third
 *      canvas at the exact target size (goal-first: e.g. "Passport" always
 *      exports exactly 600×600 regardless of what the user dragged).
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropArea,
  options: ExportOptions,
): Promise<Blob> {
  const image = await createImage(imageSrc)

  const rotRad = getRadianAngle(options.rotation)
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    options.rotation,
  )

  // Step 1 — rotated/flipped full image on a bounding-box-sized canvas.
  const rotCanvas = document.createElement('canvas')
  rotCanvas.width = bBoxWidth
  rotCanvas.height = bBoxHeight
  const rotCtx = getCanvasContext(rotCanvas)

  rotCtx.translate(bBoxWidth / 2, bBoxHeight / 2)
  rotCtx.rotate(rotRad)
  rotCtx.scale(options.flipHorizontal ? -1 : 1, options.flipVertical ? -1 : 1)
  rotCtx.translate(-image.width / 2, -image.height / 2)
  rotCtx.drawImage(image, 0, 0)

  // Step 2 — cut out the crop rectangle.
  const cropCanvas = document.createElement('canvas')
  cropCanvas.width = pixelCrop.width
  cropCanvas.height = pixelCrop.height
  const cropCtx = getCanvasContext(cropCanvas)

  if (options.format === 'jpeg') {
    // JPEG has no alpha channel — fill first so transparent source areas
    // composite against the preset's background colour (default white)
    // instead of black.
    cropCtx.fillStyle = options.backgroundFill ?? '#ffffff'
    cropCtx.fillRect(0, 0, pixelCrop.width, pixelCrop.height)
  }

  cropCtx.drawImage(
    rotCanvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  // Step 3 — optional final resize to an exact goal-first output size.
  let finalCanvas = cropCanvas
  if (options.outputWidth && options.outputHeight) {
    const outCanvas = document.createElement('canvas')
    outCanvas.width = options.outputWidth
    outCanvas.height = options.outputHeight
    const outCtx = getCanvasContext(outCanvas)

    if (options.format === 'jpeg') {
      outCtx.fillStyle = options.backgroundFill ?? '#ffffff'
      outCtx.fillRect(0, 0, options.outputWidth, options.outputHeight)
    }

    outCtx.drawImage(cropCanvas, 0, 0, options.outputWidth, options.outputHeight)
    finalCanvas = outCanvas
  }

  const mimeType = `image/${options.format}`
  const quality = options.format === 'png' ? undefined : 0.92

  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas export failed — the browser could not encode the image.'))
      },
      mimeType,
      quality,
    )
  })
}

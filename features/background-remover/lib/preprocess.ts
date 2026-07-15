// Preprocessing pipeline for the U^2-Net / U^2-Netp family of ONNX segmentation
// models (as exported by the `rembg` project). Both variants share the same
// 320x320 input resolution and ImageNet-style normalization regardless of
// which network size is loaded.
export const MODEL_INPUT_SIZE = 320

const MEAN = [0.485, 0.456, 0.406] as const
const STD = [0.229, 0.224, 0.225] as const

/**
 * Resizes `bitmap` to 320x320 (the model's fixed input resolution, ignoring
 * aspect ratio — matching the reference U^2-Net preprocessing) and returns a
 * normalized NCHW Float32Array tensor ready to feed the ONNX Runtime session.
 */
export function preprocessToTensor(bitmap: ImageBitmap): Float32Array {
  const size = MODEL_INPUT_SIZE
  const canvas = new OffscreenCanvas(size, size)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('OffscreenCanvas 2D context not available in this environment.')

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, size, size)

  const { data } = ctx.getImageData(0, 0, size, size)
  const tensorData = new Float32Array(3 * size * size)
  const plane = size * size

  // RGBA -> normalized planar RGB (NCHW): tensorData[c*plane + y*size + x]
  for (let i = 0; i < plane; i++) {
    const px = i * 4
    tensorData[i] = (data[px] / 255 - MEAN[0]) / STD[0]
    tensorData[plane + i] = (data[px + 1] / 255 - MEAN[1]) / STD[1]
    tensorData[2 * plane + i] = (data[px + 2] / 255 - MEAN[2]) / STD[2]
  }

  return tensorData
}

/**
 * Min-max normalizes the raw model output to a [0, 1] saliency/alpha map —
 * the standard U^2-Net postprocessing step, which stretches the mask to use
 * the full contrast range instead of whatever narrower band the network
 * happened to output.
 */
export function normalizeMask(raw: Float32Array): Float32Array {
  let min = Infinity
  let max = -Infinity
  for (let i = 0; i < raw.length; i++) {
    const v = raw[i]
    if (v < min) min = v
    if (v > max) max = v
  }
  const range = max - min + 1e-8
  const out = new Float32Array(raw.length)
  for (let i = 0; i < raw.length; i++) {
    out[i] = (raw[i] - min) / range
  }
  return out
}

/**
 * Upscales the model's 320x320 mask to `targetWidth` x `targetHeight` using
 * bilinear filtering (delegated to Canvas), returning one alpha byte [0-255]
 * per pixel in row-major order.
 */
export function resizeMaskToImage(
  mask: Float32Array,
  targetWidth: number,
  targetHeight: number,
): Uint8ClampedArray {
  const size = MODEL_INPUT_SIZE

  // Write the mask into a 320x320 grayscale ImageData (replicated into R/G/B,
  // full alpha) so Canvas can do the upscale for us.
  const smallCanvas = new OffscreenCanvas(size, size)
  const smallCtx = smallCanvas.getContext('2d')
  if (!smallCtx) throw new Error('OffscreenCanvas 2D context not available in this environment.')

  const smallImageData = smallCtx.createImageData(size, size)
  for (let i = 0; i < mask.length; i++) {
    const v = Math.round(mask[i] * 255)
    const px = i * 4
    smallImageData.data[px] = v
    smallImageData.data[px + 1] = v
    smallImageData.data[px + 2] = v
    smallImageData.data[px + 3] = 255
  }
  smallCtx.putImageData(smallImageData, 0, 0)

  const bigCanvas = new OffscreenCanvas(targetWidth, targetHeight)
  const bigCtx = bigCanvas.getContext('2d')
  if (!bigCtx) throw new Error('OffscreenCanvas 2D context not available in this environment.')
  bigCtx.imageSmoothingEnabled = true
  bigCtx.imageSmoothingQuality = 'high'
  bigCtx.drawImage(smallCanvas, 0, 0, targetWidth, targetHeight)

  const { data } = bigCtx.getImageData(0, 0, targetWidth, targetHeight)
  const alpha = new Uint8ClampedArray(targetWidth * targetHeight)
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = data[i * 4] // R channel — R/G/B are identical (grayscale)
  }
  return alpha
}

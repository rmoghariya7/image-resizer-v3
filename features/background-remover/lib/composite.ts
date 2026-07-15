import type { BackgroundChoice } from '../types'

/**
 * Cuts the subject out of `bitmap` using `alpha` (one byte per pixel, same
 * dimensions as the bitmap) as the alpha channel, then composites it onto
 * the requested background.
 *
 * Output format follows the background choice: transparent backgrounds must
 * be PNG (JPEG has no alpha channel); white/solid-color backgrounds are
 * flattened and exported as JPEG for a smaller file at equivalent visual quality.
 */
export async function compositeResult(
  bitmap: ImageBitmap,
  alpha: Uint8ClampedArray,
  background: BackgroundChoice,
): Promise<{ blob: Blob; mimeType: string }> {
  const { width, height } = bitmap

  // 1. Cut the subject out onto a transparent canvas.
  const cutoutCanvas = new OffscreenCanvas(width, height)
  const cutoutCtx = cutoutCanvas.getContext('2d')
  if (!cutoutCtx) throw new Error('OffscreenCanvas 2D context not available in this environment.')

  cutoutCtx.drawImage(bitmap, 0, 0, width, height)
  const imageData = cutoutCtx.getImageData(0, 0, width, height)
  const { data } = imageData

  for (let i = 0; i < alpha.length; i++) {
    const px = i * 4
    // Multiply (rather than overwrite) so any pre-existing transparency in
    // the source image — e.g. a PNG upload that already had soft edges — is
    // preserved rather than clobbered.
    data[px + 3] = Math.round((data[px + 3] * alpha[i]) / 255)
  }
  cutoutCtx.putImageData(imageData, 0, 0)

  // 2. Transparent output: the cutout canvas *is* the result.
  if (background.kind === 'transparent') {
    const blob = await cutoutCanvas.convertToBlob({ type: 'image/png' })
    return { blob, mimeType: 'image/png' }
  }

  // 3. White / solid-color output: flatten the cutout onto a filled canvas.
  const finalCanvas = new OffscreenCanvas(width, height)
  const finalCtx = finalCanvas.getContext('2d')
  if (!finalCtx) throw new Error('OffscreenCanvas 2D context not available in this environment.')

  finalCtx.fillStyle = background.kind === 'white' ? '#ffffff' : background.hex
  finalCtx.fillRect(0, 0, width, height)
  finalCtx.drawImage(cutoutCanvas, 0, 0)

  // Preserve the highest practical quality for the flattened JPEG.
  const blob = await finalCanvas.convertToBlob({ type: 'image/jpeg', quality: 0.95 })
  return { blob, mimeType: 'image/jpeg' }
}

import { preprocessToTensor, normalizeMask, resizeMaskToImage } from '../lib/preprocess'
import { compositeResult } from '../lib/composite'
import type { WorkerRequest, WorkerResponse } from '../types'

// Only lightweight, dependency-free helpers are imported statically above.
// onnxruntime-web (a multi-MB dependency once its WASM runtime is counted) is
// loaded via a dynamic import() inside handleProcess, so it never bloats this
// worker's initial bundle — it is fetched only once a user actually uploads
// an image (see ../lib/model-loader.ts).

type WorkerSelf = {
  postMessage: (msg: WorkerResponse) => void
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null
}

const workerSelf = self as unknown as WorkerSelf

function post(msg: WorkerResponse): void {
  workerSelf.postMessage(msg)
}

// Cached alpha mask + source bitmap from the most recent successful PROCESS,
// so switching the output background afterward (Transparent/White/Color) is
// an instant recomposite instead of a full re-inference. Replaced (and the
// old bitmap closed) whenever a new image is processed.
let lastProcessed: { bitmap: ImageBitmap; alpha: Uint8ClampedArray } | null = null

async function handleProcess(
  id: string,
  bitmap: ImageBitmap,
  background: import('../types').BackgroundChoice,
): Promise<void> {
  const { ensureModelLoaded, runSegmentation } = await import('../lib/model-loader')

  // Phase 1: model download + session creation (once per session; cached
  // after the first successful load — see lib/model-loader.ts).
  post({ type: 'PHASE', id, phase: 'loading-model' })
  await ensureModelLoaded(percent => post({ type: 'PROGRESS', id, phase: 'loading-model', percent }))

  // Phase 2: segmentation + compositing for this specific image.
  post({ type: 'PHASE', id, phase: 'removing-background' })
  const progress = (percent: number) => post({ type: 'PROGRESS', id, phase: 'removing-background', percent })

  progress(10)
  const tensorData = preprocessToTensor(bitmap)

  progress(30)
  const rawOutput = await runSegmentation(tensorData)

  progress(70)
  const mask = normalizeMask(rawOutput)
  const alpha = resizeMaskToImage(mask, bitmap.width, bitmap.height)

  progress(85)
  const { blob, mimeType } = await compositeResult(bitmap, alpha, background)

  lastProcessed?.bitmap.close()
  lastProcessed = { bitmap, alpha }

  progress(100)

  // One-decimal-place precision: validates the actual Blob size (not filename).
  const sizeKB = parseFloat((blob.size / 1024).toFixed(1))
  post({ type: 'SUCCESS', id, blob, sizeKB, mimeType })
}

async function handleRecomposite(
  id: string,
  background: import('../types').BackgroundChoice,
): Promise<void> {
  if (!lastProcessed) {
    throw new Error('No processed image to recomposite — upload an image first.')
  }
  const { blob, mimeType } = await compositeResult(lastProcessed.bitmap, lastProcessed.alpha, background)
  const sizeKB = parseFloat((blob.size / 1024).toFixed(1))
  post({ type: 'SUCCESS', id, blob, sizeKB, mimeType })
}

async function handleMessage(request: WorkerRequest): Promise<void> {
  const { id } = request
  try {
    if (request.type === 'PROCESS') {
      await handleProcess(id, request.bitmap, request.background)
    } else {
      await handleRecomposite(id, request.background)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Background removal failed unexpectedly.'
    post({ type: 'ERROR', id, message })
  }
}

workerSelf.onmessage = (event: MessageEvent<WorkerRequest>) => {
  void handleMessage(event.data)
}

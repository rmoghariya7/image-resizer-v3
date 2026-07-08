import { processImagePreset, processCompressPreset, processResizeOperation } from './processor'
import type { WorkerRequest, WorkerResponse } from '../types'

// ─── Typed worker self ────────────────────────────────────────────────────────

type WorkerSelf = {
  postMessage: (msg: WorkerResponse) => void
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null
}

const workerSelf = self as unknown as WorkerSelf

function post(msg: WorkerResponse): void {
  workerSelf.postMessage(msg)
}

// ─── Message handler ──────────────────────────────────────────────────────────

// One-decimal-place precision: validates the actual Blob size (not filename).
function toSizeKB(blob: Blob): number {
  return parseFloat((blob.size / 1024).toFixed(1))
}

async function handleMessage(request: WorkerRequest): Promise<void> {
  const { id } = request

  try {
    const onProgress = (percent: number) => post({ type: 'PROGRESS', id, percent })

    // Custom resize operation (free-form dimensions from /image-resizer).
    if (request.type === 'RESIZE') {
      const { blob, width, height } = await processResizeOperation(
        request.bitmap,
        request.operation,
        onProgress,
      )
      post({ type: 'SUCCESS', id, blob, sizeKB: toSizeKB(blob), width, height })
      return
    }

    // Registry preset (goal pages and compress pages).
    const { bitmap, preset, originalMime } = request

    let blob: Blob
    let compressionStatus: import('../types').CompressionStatus | undefined

    if (preset.kind === 'image') {
      blob = await processImagePreset(bitmap, preset, onProgress)
    } else {
      const result = await processCompressPreset(bitmap, preset, originalMime, onProgress)
      blob = result.blob
      compressionStatus = result.compressionStatus
    }

    // targetKB / compressionStatus are only meaningful for compress presets.
    const targetKB = preset.kind === 'compress' ? preset.targetKB : undefined

    post({ type: 'SUCCESS', id, blob, sizeKB: toSizeKB(blob), targetKB, compressionStatus })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Processing failed unexpectedly.'
    post({ type: 'ERROR', id, message })
  }
}

workerSelf.onmessage = (event: MessageEvent<WorkerRequest>) => {
  void handleMessage(event.data)
}

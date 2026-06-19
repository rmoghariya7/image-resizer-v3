import { processImagePreset, processCompressPreset } from './processor'
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

async function handleMessage(request: WorkerRequest): Promise<void> {
  const { id, bitmap, preset, originalMime } = request

  try {
    const onProgress = (percent: number) => post({ type: 'PROGRESS', id, percent })

    let blob: Blob

    if (preset.kind === 'image') {
      blob = await processImagePreset(bitmap, preset, onProgress)
    } else {
      blob = await processCompressPreset(bitmap, preset, originalMime, onProgress)
    }

    // One-decimal-place precision: validates the actual Blob size (not filename).
    const sizeKB = parseFloat((blob.size / 1024).toFixed(1))

    // targetKB is only meaningful for compress presets.
    const targetKB = preset.kind === 'compress' ? preset.targetKB : undefined

    post({ type: 'SUCCESS', id, blob, sizeKB, targetKB })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Processing failed unexpectedly.'
    post({ type: 'ERROR', id, message })
  }
}

workerSelf.onmessage = (event: MessageEvent<WorkerRequest>) => {
  void handleMessage(event.data)
}

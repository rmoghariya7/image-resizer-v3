import { processImagePreset, processCompressPreset } from './processor'
import type { WorkerRequest, WorkerResponse } from '../types'

// ─── Typed worker self ────────────────────────────────────────────────────────
// Cast to a structural type — avoids needing the webworker lib in tsconfig.

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

    const sizeKB = Math.round(blob.size / 1024)
    post({ type: 'SUCCESS', id, blob, sizeKB })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Processing failed unexpectedly.'
    post({ type: 'ERROR', id, message })
  }
}

workerSelf.onmessage = (event: MessageEvent<WorkerRequest>) => {
  void handleMessage(event.data)
}

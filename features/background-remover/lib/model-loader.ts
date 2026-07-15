import { MODEL_INPUT_SIZE } from './preprocess'
import type * as OrtWasm from 'onnxruntime-web/wasm'

// This module only runs inside the background-remover Web Worker (see
// ../worker/background-remover.worker.ts), and is itself only ever reached via
// a dynamic import() from that worker — so onnxruntime-web (a multi-MB
// dependency once its WASM runtime is counted) is never part of the initial
// worker bundle. It is fetched only the first time a user actually uploads an
// image, matching the "lazy-load the AI model" requirement.
//
// It lazily boots ONNX Runtime Web and caches the resulting InferenceSession
// for the rest of the worker's lifetime — the ~13 MB WASM binary and ~4.6 MB
// model download once per session, every later image reuses the same session.

const ORT_ASSET_PATH = '/ort'
const MODEL_URL = '/models/u2netp.onnx'
const MODEL_CACHE_NAME = 'presetly-bg-remover-model-v1'

/**
 * Fetches the model bytes, using the Cache Storage API so the ~4.6 MB
 * download survives across page reloads and future sessions — not just the
 * lifetime of this worker (HTTP cache headers alone are not guaranteed to
 * persist, e.g. in private browsing or under aggressive cache eviction).
 */
async function fetchModelBytes(onProgress: (percent: number) => void): Promise<ArrayBuffer> {
  const cache = await caches.open(MODEL_CACHE_NAME).catch(() => null)

  const cached = await cache?.match(MODEL_URL)
  if (cached) {
    onProgress(100)
    return cached.arrayBuffer()
  }

  const response = await fetch(MODEL_URL)
  if (!response.ok || !response.body) {
    throw new Error(
      `Could not download the background-removal model (HTTP ${response.status}). ` +
      'Check your connection and try again.',
    )
  }

  // Cache a clone before consuming the body, so a mid-stream failure never
  // poisons the cache with a partial response.
  await cache?.put(MODEL_URL, response.clone()).catch(() => undefined)

  const total = Number(response.headers.get('content-length')) || 0
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    received += value.byteLength
    if (total > 0) onProgress(Math.round((received / total) * 100))
  }

  onProgress(100)

  const bytes = new Uint8Array(received)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return bytes.buffer
}

type Engine = { ort: typeof OrtWasm; session: OrtWasm.InferenceSession }

let enginePromise: Promise<Engine> | null = null

async function createEngine(onProgress: (percent: number) => void): Promise<Engine> {
  // Dynamically imported here (not at module top-level) so the ~1 MB+
  // onnxruntime-web JS glue is its own lazily-loaded chunk.
  const ort = await import('onnxruntime-web/wasm')
  const origin = self.location.origin

  // Serve the WASM binary + glue JS from our own origin (CSP: worker-src 'self').
  ort.env.wasm.wasmPaths = `${origin}${ORT_ASSET_PATH}/`

  // The bundled binary supports multi-threading, but that requires
  // SharedArrayBuffer + cross-origin isolation (COOP/COEP headers), which
  // this site does not set. Force single-threaded, non-proxied execution —
  // it already runs off the main thread inside our own Web Worker, so the
  // UI stays responsive regardless. Mirrors the single-threaded FFmpeg
  // core choice in features/video-to-audio/lib/ffmpeg-client.ts.
  ort.env.wasm.numThreads = 1
  ort.env.wasm.proxy = false

  const buffer = await fetchModelBytes(onProgress)
  const session = await ort.InferenceSession.create(buffer, { executionProviders: ['wasm'] })
  return { ort, session }
}

/**
 * Lazily boots ONNX Runtime Web + the model, caching both for the rest of
 * the worker's lifetime. Safe to call before every image — a no-op after
 * the first successful call.
 */
export function ensureModelLoaded(onProgress: (percent: number) => void): Promise<void> {
  if (!enginePromise) {
    enginePromise = createEngine(onProgress).catch((err: unknown) => {
      // A failed boot must not poison the cache — the next attempt retries from scratch.
      enginePromise = null
      throw err instanceof Error
        ? err
        : new Error('Could not load the AI background-removal model.')
    })
  }
  return enginePromise.then(() => undefined)
}

/**
 * Runs the segmentation network on a preprocessed NCHW tensor (see
 * lib/preprocess.ts) and returns the raw 320x320 single-channel output.
 * Must be called after `ensureModelLoaded` has resolved.
 */
export async function runSegmentation(inputData: Float32Array): Promise<Float32Array> {
  if (!enginePromise) {
    throw new Error('Model not loaded — call ensureModelLoaded() first.')
  }
  const { ort, session } = await enginePromise

  const size = MODEL_INPUT_SIZE
  const inputTensor = new ort.Tensor('float32', inputData, [1, 3, size, size])
  const inputName = session.inputNames[0]
  const outputName = session.outputNames[0]

  const results = await session.run({ [inputName]: inputTensor })
  const output = results[outputName]

  return output.data as Float32Array
}

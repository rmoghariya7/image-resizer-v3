// Prepares the two static assets the AI Background Remover needs, both served
// from our own origin so the tool works under the site's CSP ('self' only)
// and so the browser can cache them across visits:
//
//   1. The onnxruntime-web WASM runtime  -> public/ort/
//   2. The u2netp.onnx segmentation model -> public/models/
//
// Why copy the ORT runtime instead of bundling it? Like @ffmpeg/core (see
// copy-ffmpeg-assets.mjs), the WASM binary is ~13 MB — too large for the JS
// bundle and unnecessary on every other page. It's fetched lazily, only when
// a user opens the Background Remover tool.
//
// Why download the model instead of shipping it via npm? U2-Net/U2-Netp have
// no official npm distribution — the canonical ONNX export is published as a
// GitHub release asset by the `rembg` project (Apache-2.0 licensed weights,
// same license as the upstream xuebinqin/U-2-Net repo). We fetch it once and
// commit nothing large to git, mirroring how @ffmpeg/core is treated as a
// lazily-fetched static asset rather than a bundled dependency.
//
// Runs automatically via the `predev` / `prebuild` npm hooks. Network failures
// are logged but do not fail the build — every other route still works
// without this tool, and the feature itself surfaces a clear runtime error if
// the model file is missing (see features/background-remover/lib/model-loader.ts).
import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// ─── 1. ONNX Runtime Web WASM runtime ────────────────────────────────────────
//
// Only the WASM binary and its Emscripten-generated JS glue are needed as
// static assets: the "onnxruntime-web/wasm" entry module itself is a normal
// npm import (dynamically imported from the worker — see lib/model-loader.ts)
// that Next.js bundles directly, but it resolves these two files at *runtime*
// via a plain string URL (ort.env.wasm.wasmPaths), which bundlers cannot see
// or inline — so they must exist as real static files.

const ortOutDir = join(root, 'public', 'ort')
const ORT_ASSETS = [
  ['node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs', 'ort-wasm-simd-threaded.mjs'],
  ['node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm', 'ort-wasm-simd-threaded.wasm'],
]

mkdirSync(ortOutDir, { recursive: true })
let copied = 0
for (const [src, dest] of ORT_ASSETS) {
  const srcPath = join(root, src)
  if (!existsSync(srcPath)) {
    console.warn(`[copy-bg-remover-assets] Missing ${src} — run "npm install" first.`)
    continue
  }
  copyFileSync(srcPath, join(ortOutDir, dest))
  copied++
}
console.log(`[copy-bg-remover-assets] Copied ${copied}/${ORT_ASSETS.length} onnxruntime-web files to public/ort/`)

// ─── 2. u2netp.onnx segmentation model (Apache-2.0) ──────────────────────────

const MODEL_URL = 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx'
const modelDir = join(root, 'public', 'models')
const modelPath = join(modelDir, 'u2netp.onnx')

// Sanity bounds instead of a hardcoded checksum (u2netp.onnx is ~4.6 MB;
// anything wildly outside this range is almost certainly a truncated
// download or an HTML error page saved by mistake).
const MIN_BYTES = 3_000_000
const MAX_BYTES = 8_000_000

async function downloadModel() {
  if (existsSync(modelPath)) {
    const { size } = statSync(modelPath)
    if (size >= MIN_BYTES && size <= MAX_BYTES) {
      console.log('[copy-bg-remover-assets] u2netp.onnx already present — skipping download.')
      return
    }
    console.warn('[copy-bg-remover-assets] Existing u2netp.onnx looks corrupt — re-downloading.')
    unlinkSync(modelPath)
  }

  mkdirSync(modelDir, { recursive: true })

  try {
    const res = await fetch(MODEL_URL, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const bytes = new Uint8Array(await res.arrayBuffer())
    if (bytes.byteLength < MIN_BYTES || bytes.byteLength > MAX_BYTES) {
      throw new Error(`Unexpected file size: ${bytes.byteLength} bytes`)
    }
    writeFileSync(modelPath, bytes)
    console.log(`[copy-bg-remover-assets] Downloaded u2netp.onnx (${(bytes.byteLength / 1024 / 1024).toFixed(1)} MB) to public/models/`)
  } catch (err) {
    console.warn(
      '[copy-bg-remover-assets] Could not download the background-removal model ' +
      `(${err instanceof Error ? err.message : String(err)}). ` +
      'The Background Remover tool will show a load error until this succeeds — ' +
      're-run "npm run dev" once you have a network connection, or place the file ' +
      `manually at public/models/u2netp.onnx (source: ${MODEL_URL}).`,
    )
  }
}

await downloadModel()

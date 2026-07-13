// Copies the FFmpeg WASM runtime from node_modules into public/ffmpeg/ so the
// browser can load it from our own origin (CSP: script-src 'self').
//
// Why not bundle it? The single-threaded @ffmpeg/core WASM binary is ~31 MB —
// far too large to commit to git or push through the bundler. Serving it as a
// static asset keeps the app bundle untouched; the files are fetched lazily
// only when a user starts a video-to-audio extraction.
//
// Why copy the @ffmpeg/ffmpeg ESM worker too? @ffmpeg/ffmpeg spawns its FFmpeg
// core inside a module Web Worker. Turbopack's `new Worker(new URL(...))`
// bundling is undocumented, so we sidestep the bundler entirely by passing an
// explicit same-origin `classWorkerURL` (see features/video-to-audio/lib/ffmpeg-client.ts).
// worker.js imports ./const.js and ./errors.js relatively, so those ship with it.
//
// Runs automatically via the `predev` / `prebuild` npm hooks.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'ffmpeg')

const ASSETS = [
  ['node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js', 'ffmpeg-core.js'],
  ['node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm', 'ffmpeg-core.wasm'],
  ['node_modules/@ffmpeg/ffmpeg/dist/esm/worker.js', 'worker.js'],
  ['node_modules/@ffmpeg/ffmpeg/dist/esm/const.js', 'const.js'],
  ['node_modules/@ffmpeg/ffmpeg/dist/esm/errors.js', 'errors.js'],
]

mkdirSync(outDir, { recursive: true })
for (const [src, dest] of ASSETS) {
  copyFileSync(join(root, src), join(outDir, dest))
}
console.log(`[copy-ffmpeg-assets] Copied ${ASSETS.length} files to public/ffmpeg/`)

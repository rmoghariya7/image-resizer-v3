import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import type { AdvancedSettings, OutputFormat } from '../types'
import {
  buildExtractArgs,
  buildInputName,
  buildOutputName,
  parseDurationFromLog,
} from './extract-args'

// This module is only ever imported via dynamic import() from the extractor
// hook, so neither @ffmpeg/ffmpeg nor the WASM engine is fetched until the
// user actually uploads a video.

// FFmpeg runs inside a module Web Worker (spawned by the FFmpeg class), so the
// UI thread stays responsive during extraction. The worker + core are served
// from our own origin (public/ffmpeg/, see scripts/copy-ffmpeg-assets.mjs)
// instead of relying on bundler worker resolution, which Turbopack does not
// document for node_modules code.
const FFMPEG_ASSET_PATH = '/ffmpeg'

let enginePromise: Promise<FFmpeg> | null = null

async function createEngine(): Promise<FFmpeg> {
  const ffmpeg = new FFmpeg()
  const origin = window.location.origin
  await ffmpeg.load({
    coreURL: `${origin}${FFMPEG_ASSET_PATH}/ffmpeg-core.js`,
    wasmURL: `${origin}${FFMPEG_ASSET_PATH}/ffmpeg-core.wasm`,
    classWorkerURL: `${origin}${FFMPEG_ASSET_PATH}/worker.js`,
  })
  return ffmpeg
}

/**
 * Lazily boots the FFmpeg engine and caches it for the rest of the session —
 * the ~31 MB core downloads once, every later extraction reuses the instance.
 */
export function getEngine(): Promise<FFmpeg> {
  if (!enginePromise) {
    enginePromise = createEngine().catch((err: unknown) => {
      // A failed boot (offline, CSP, unsupported browser) must not poison the
      // cache — the next attempt should retry from scratch.
      enginePromise = null
      throw err instanceof Error
        ? err
        : new Error('Could not load the audio engine. Check your connection and try again.')
    })
  }
  return enginePromise
}

export type ExtractionOutput = {
  data: Uint8Array
  /** Source duration in seconds, parsed from FFmpeg's log when available. */
  duration?: number
}

/**
 * Runs the actual extraction. Throws with a user-readable message on failure.
 */
export async function extractAudio(options: {
  engine: FFmpeg
  file: File
  format: OutputFormat
  settings: AdvancedSettings
  onProgress: (percent: number) => void
}): Promise<ExtractionOutput> {
  const { engine, file, format, settings, onProgress } = options

  const inputName = buildInputName(file.name)
  const outputName = buildOutputName(format)

  let duration: number | undefined
  const onLog = ({ message }: { message: string }) => {
    duration ??= parseDurationFromLog(message)
  }
  // Audio extraction preserves the source duration, so FFmpeg's time-based
  // progress maps 1:1 to completion percent.
  const onProgressEvent = ({ progress }: { progress: number }) => {
    onProgress(Math.min(100, Math.max(0, Math.round(progress * 100))))
  }

  engine.on('log', onLog)
  engine.on('progress', onProgressEvent)

  try {
    await engine.writeFile(inputName, await fetchFile(file))

    const exitCode = await engine.exec(
      buildExtractArgs(format, settings, inputName, outputName),
    )
    if (exitCode !== 0) {
      throw new Error(
        'Could not extract audio from this video. The file may be corrupted, DRM-protected, or contain no audio track.',
      )
    }

    const data = await engine.readFile(outputName)
    if (typeof data === 'string' || data.length === 0) {
      throw new Error('Extraction produced no audio. The video may not contain an audio track.')
    }

    return { data, duration }
  } finally {
    engine.off('log', onLog)
    engine.off('progress', onProgressEvent)
    // Free the in-memory filesystem — video files are large.
    await engine.deleteFile(inputName).catch(() => undefined)
    await engine.deleteFile(outputName).catch(() => undefined)
  }
}

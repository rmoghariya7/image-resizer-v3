'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  getFormatConfig,
  type AdvancedSettings,
  type ExtractedAudio,
  type ExtractorState,
  type OutputFormat,
  type SourceVideo,
} from '../types'
import { buildDownloadFilename } from '../lib/extract-args'

export interface UseAudioExtractorReturn {
  state: ExtractorState
  /** Accepts a validated video file and moves to `ready`. Warms up FFmpeg in the background. */
  loadFile: (file: File) => void
  /** Runs the extraction for the current video. */
  extract: (format: OutputFormat, settings: AdvancedSettings) => Promise<void>
  /** Back to the upload screen ("Process another video"). */
  reset: () => void
  /** From `error` back to `ready` (video kept) or `idle`. */
  dismissError: () => void
}

/**
 * Reads the duration off a <video> element. Works for containers the browser
 * can demux (MP4/WEBM/most MOV); resolves undefined for the rest (AVI/MKV) —
 * FFmpeg's log fills those in during extraction.
 */
function probeDuration(file: File): Promise<number | undefined> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    const finish = (duration: number | undefined) => {
      URL.revokeObjectURL(url)
      video.removeAttribute('src')
      resolve(duration && Number.isFinite(duration) ? duration : undefined)
    }
    video.preload = 'metadata'
    video.onloadedmetadata = () => finish(video.duration)
    video.onerror = () => finish(undefined)
    setTimeout(() => finish(undefined), 5000)
    video.src = url
  })
}

export function useAudioExtractor(): UseAudioExtractorReturn {
  const [state, setState] = useState<ExtractorState>({ status: 'idle' })
  const resultUrlRef = useRef<string | null>(null)

  // Invalidates in-flight async work after reset/replace — a stale job must
  // never write into the state machine.
  const jobIdRef = useRef(0)

  // Latest state for callbacks without re-creating them per render.
  const stateRef = useRef(state)
  // eslint-disable-next-line react-hooks/refs -- intentional latest-ref sync during render
  stateRef.current = state

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    }
  }, [])

  const revokeResultUrl = () => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }
  }

  const loadFile = useCallback((file: File) => {
    const jobId = ++jobIdRef.current
    revokeResultUrl()

    const video: SourceVideo = {
      file,
      name: file.name,
      sizeKB: Math.round(file.size / 1024),
    }
    setState({ status: 'ready', video })

    // Spec: FFmpeg downloads only once an upload begins. Warm it up now so the
    // engine is usually ready by the time the user taps Extract. Failures are
    // ignored here — extract() retries and surfaces them properly.
    void import('../lib/ffmpeg-client')
      .then(client => client.getEngine())
      .catch(() => undefined)

    void probeDuration(file).then(duration => {
      if (duration === undefined || jobIdRef.current !== jobId) return
      setState(prev =>
        prev.status === 'ready' && prev.video.file === file
          ? { ...prev, video: { ...prev.video, duration } }
          : prev,
      )
    })
  }, [])

  const extract = useCallback(async (format: OutputFormat, settings: AdvancedSettings) => {
    const current = stateRef.current
    if (current.status !== 'ready' && current.status !== 'done') return
    const video = current.video

    const jobId = ++jobIdRef.current
    revokeResultUrl()
    setState({ status: 'extracting', video, stage: 'engine', progress: 0 })

    try {
      const client = await import('../lib/ffmpeg-client')
      const engine = await client.getEngine()
      if (jobIdRef.current !== jobId) return

      setState({ status: 'extracting', video, stage: 'extract', progress: 0 })

      const { data, duration: loggedDuration } = await client.extractAudio({
        engine,
        file: video.file,
        format,
        settings,
        onProgress: percent => {
          if (jobIdRef.current !== jobId) return
          setState(prev =>
            prev.status === 'extracting' ? { ...prev, progress: percent } : prev,
          )
        },
      })
      if (jobIdRef.current !== jobId) return

      const config = getFormatConfig(format)
      // .slice() re-buffers the wasm-owned bytes into a plain ArrayBuffer.
      const blob = new Blob([data.slice()], { type: config.mimeType })
      const objectUrl = URL.createObjectURL(blob)
      resultUrlRef.current = objectUrl

      const duration = video.duration ?? loggedDuration
      const result: ExtractedAudio = {
        blob,
        objectUrl,
        filename: buildDownloadFilename(video.name, format),
        sizeKB: Math.round((blob.size / 1024) * 10) / 10,
        format,
        duration,
      }
      setState({ status: 'done', video: { ...video, duration }, result })
    } catch (err) {
      if (jobIdRef.current !== jobId) return
      setState({
        status: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'Something went wrong while extracting the audio.',
        video,
      })
    }
  }, [])

  const reset = useCallback(() => {
    jobIdRef.current += 1
    revokeResultUrl()
    setState({ status: 'idle' })
  }, [])

  const dismissError = useCallback(() => {
    jobIdRef.current += 1
    setState(prev =>
      prev.status === 'error' && prev.video
        ? { status: 'ready', video: prev.video }
        : { status: 'idle' },
    )
  }, [])

  return { state, loadFile, extract, reset, dismissError }
}

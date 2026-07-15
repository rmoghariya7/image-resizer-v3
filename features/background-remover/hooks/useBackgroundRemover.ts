'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  BackgroundChoice,
  OriginalImage,
  ProcessedResult,
  RemoverState,
  WorkerRequest,
  WorkerResponse,
} from '../types'

function buildFilename(mimeType: string): string {
  const ext = mimeType === 'image/png' ? 'png' : 'jpg'
  return `presetly-background-removed.${ext}`
}

export interface UseBackgroundRemoverReturn {
  state: RemoverState
  /** Currently selected output background — drives the option picker UI. */
  background: BackgroundChoice
  processFile: (file: File) => Promise<void>
  /** Switches the output background. Instant after the first result (no re-inference). */
  setBackground: (choice: BackgroundChoice) => void
  reset: () => void
}

export function useBackgroundRemover(): UseBackgroundRemoverReturn {
  const [state, setState] = useState<RemoverState>({ status: 'idle' })
  const [background, setBackgroundState] = useState<BackgroundChoice>({ kind: 'transparent' })
  const workerRef = useRef<Worker | null>(null)
  const originalUrlRef = useRef<string | null>(null)
  const resultUrlRef = useRef<string | null>(null)

  // worker.onmessage and setBackground are created once / are stable
  // callbacks, but both need the *current* value of `state`/`background`
  // without re-subscribing — refs sidestep the stale-closure problem.
  const backgroundRef = useRef(background)
  // eslint-disable-next-line react-hooks/refs -- intentional latest-ref sync during render
  backgroundRef.current = background

  const stateRef = useRef(state)
  // eslint-disable-next-line react-hooks/refs -- intentional latest-ref sync during render
  stateRef.current = state

  useEffect(() => {
    const worker = new Worker(
      new URL('../worker/background-remover.worker.ts', import.meta.url),
    )

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data

      switch (msg.type) {
        case 'PHASE':
          setState(prev =>
            prev.status === 'processing'
              ? { ...prev, phase: msg.phase, progress: 0 }
              : prev,
          )
          break

        case 'PROGRESS':
          setState(prev =>
            prev.status === 'processing' && prev.phase === msg.phase
              ? { ...prev, progress: msg.percent }
              : prev,
          )
          break

        case 'SUCCESS': {
          const objectUrl = URL.createObjectURL(msg.blob)
          if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
          resultUrlRef.current = objectUrl

          const result: ProcessedResult = {
            blob: msg.blob,
            objectUrl,
            sizeKB: msg.sizeKB,
            filename: buildFilename(msg.mimeType),
            mimeType: msg.mimeType,
            background: backgroundRef.current,
          }

          setState(prev => {
            // Response to the initial PROCESS request (full AI inference).
            if (prev.status === 'processing') {
              return { status: 'done', original: prev.original, result }
            }
            // Response to a RECOMPOSITE request (background switch) — the
            // result stays mounted throughout, only its content is replaced.
            if (prev.status === 'done' && prev.recompositing) {
              return { status: 'done', original: prev.original, result }
            }
            return prev
          })
          break
        }

        case 'ERROR':
          setState({ status: 'error', message: msg.message })
          break
      }
    }

    worker.onerror = (err: ErrorEvent) => {
      setState({
        status: 'error',
        message: err.message || 'An unexpected error occurred during processing.',
      })
    }

    workerRef.current = worker

    return () => {
      worker.terminate()
      if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current)
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    }
    // Worker lifetime == component lifetime (see backgroundRef/stateRef above
    // for how callbacks read the latest values without re-subscribing).
  }, [])

  const processFile = useCallback(async (file: File) => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current)
      originalUrlRef.current = null
    }
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }

    setState({ status: 'loading' })
    setBackgroundState({ kind: 'transparent' })

    try {
      if (typeof createImageBitmap === 'undefined') {
        throw new Error('Your browser does not support image processing. Please update to iOS 15+ or use Chrome/Firefox.')
      }
      const bitmap = await createImageBitmap(file)
      const { width, height } = bitmap // Read before transfer

      const objectUrl = URL.createObjectURL(file)
      originalUrlRef.current = objectUrl

      const original: OriginalImage = {
        file,
        objectUrl,
        width,
        height,
        sizeKB: Math.round(file.size / 1024),
      }

      setState({ status: 'processing', phase: 'loading-model', progress: 0, original })

      const request: WorkerRequest = {
        type: 'PROCESS',
        id: Math.random().toString(36).slice(2),
        bitmap,
        background: { kind: 'transparent' },
      }

      // Transfer bitmap — zero-copy move to worker
      workerRef.current?.postMessage(request, [request.bitmap])
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to read the image file.',
      })
    }
  }, [])

  // NOTE: postMessage is a side effect and must never live inside a setState
  // updater function — React is allowed to invoke updater functions more
  // than once (e.g. under StrictMode), which would fire two RECOMPOSITE
  // requests and let a later response revoke the blob URL a still-pending
  // response is about to render, leaving a broken <img>. Reading the current
  // state from a ref and sending the message directly in the callback body
  // (a real event handler, never re-invoked by React) avoids that entirely.
  const setBackground = useCallback((choice: BackgroundChoice) => {
    setBackgroundState(choice)

    const current = stateRef.current
    if (current.status !== 'done') return

    const request: WorkerRequest = {
      type: 'RECOMPOSITE',
      id: Math.random().toString(36).slice(2),
      background: choice,
    }
    workerRef.current?.postMessage(request)

    // Recomposite is fast (no re-inference, just a cached-mask canvas draw).
    // Stay in 'done' with recompositing:true so the result/slider/picker
    // never unmount — only the picker + download button dim briefly.
    setState({ ...current, recompositing: true })
  }, [])

  const reset = useCallback(() => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }
    setBackgroundState({ kind: 'transparent' })
    setState({ status: 'idle' })
  }, [])

  return { state, background, processFile, setBackground, reset }
}

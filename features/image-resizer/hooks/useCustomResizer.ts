'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  OriginalImage,
  ProcessedResult,
  ResizeOperation,
  WorkerRequest,
  WorkerResponse,
} from '../types'

// ─── State machine ────────────────────────────────────────────────────────────
// idle → loading → ready (editor visible) → processing → done
//                     ↑______________________________________|  backToEditor()

export type CustomResizeState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; original: OriginalImage }
  | { status: 'processing'; progress: number; original: OriginalImage; operation: ResizeOperation }
  | { status: 'done'; original: OriginalImage; result: ProcessedResult; operation: ResizeOperation }
  | { status: 'error'; message: string }

export interface UseCustomResizerReturn {
  state: CustomResizeState
  loadFile: (file: File) => Promise<void>
  process: (operation: ResizeOperation) => Promise<void>
  /** From 'done' back to 'ready' keeping the uploaded image (adjust & re-run). */
  backToEditor: () => void
  reset: () => void
}

function extensionFor(mimeType: string): string {
  if (mimeType === 'image/png') return 'png'
  if (mimeType === 'image/webp') return 'webp'
  return 'jpg'
}

export function useCustomResizer(): UseCustomResizerReturn {
  const [state, setState] = useState<CustomResizeState>({ status: 'idle' })
  const stateRef = useRef<CustomResizeState>(state)
  // eslint-disable-next-line react-hooks/refs -- intentional latest-ref sync during render
  stateRef.current = state

  const workerRef = useRef<Worker | null>(null)
  const originalUrlRef = useRef<string | null>(null)
  const resultUrlRef = useRef<string | null>(null)

  useEffect(() => {
    const worker = new Worker(
      new URL('../worker/image-resizer.worker.ts', import.meta.url),
    )

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data

      switch (msg.type) {
        case 'PROGRESS':
          setState(prev =>
            prev.status === 'processing'
              ? { ...prev, progress: msg.percent }
              : prev,
          )
          break

        case 'SUCCESS': {
          if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
          const resultUrl = URL.createObjectURL(msg.blob)
          resultUrlRef.current = resultUrl

          setState(prev => {
            if (prev.status !== 'processing') return prev
            const width = msg.width ?? prev.operation.targetWidth
            const height = msg.height ?? prev.operation.targetHeight
            const result: ProcessedResult = {
              blob: msg.blob,
              objectUrl: resultUrl,
              sizeKB: msg.sizeKB,
              width,
              height,
              filename: `presetly-resized-${width}x${height}.${extensionFor(msg.blob.type)}`,
              mimeType: msg.blob.type,
            }
            return {
              status: 'done',
              original: prev.original,
              result,
              operation: prev.operation,
            }
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
  }, [])

  const loadFile = useCallback(async (file: File) => {
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current)
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    originalUrlRef.current = null
    resultUrlRef.current = null

    setState({ status: 'loading' })

    try {
      if (typeof createImageBitmap === 'undefined') {
        throw new Error('Your browser does not support image processing. Please update to iOS 15+ or use Chrome/Firefox.')
      }
      // Bitmap is only used to read dimensions here; processing re-decodes
      // from the File so the editor can run any number of operations.
      const bitmap = await createImageBitmap(file)
      const { width, height } = bitmap
      bitmap.close()

      const objectUrl = URL.createObjectURL(file)
      originalUrlRef.current = objectUrl

      const original: OriginalImage = {
        file,
        objectUrl,
        width,
        height,
        sizeKB: Math.round(file.size / 1024),
      }
      setState({ status: 'ready', original })
    } catch {
      setState({ status: 'error', message: 'Failed to read the image file.' })
    }
  }, [])

  const process = useCallback(async (operation: ResizeOperation) => {
    const cur = stateRef.current
    if (cur.status !== 'ready' && cur.status !== 'done') return

    const original = cur.original
    setState({ status: 'processing', progress: 0, original, operation })

    try {
      if (typeof createImageBitmap === 'undefined') {
        throw new Error('Your browser does not support image processing. Please update to iOS 15+ or use Chrome/Firefox.')
      }
      const bitmap = await createImageBitmap(original.file)

      const request: WorkerRequest = {
        type: 'RESIZE',
        id: Math.random().toString(36).slice(2),
        bitmap,
        operation,
      }
      // Transfer bitmap — zero-copy move to worker
      workerRef.current?.postMessage(request, [request.bitmap])
    } catch {
      setState({ status: 'error', message: 'Failed to prepare the image for resizing.' })
    }
  }, [])

  const backToEditor = useCallback(() => {
    const cur = stateRef.current
    if (cur.status !== 'done') return
    // Keep the original (and its object URL); only the result is discarded.
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }
    setState({ status: 'ready', original: cur.original })
  }, [])

  const reset = useCallback(() => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }
    setState({ status: 'idle' })
  }, [])

  return { state, loadFile, process, backToEditor, reset }
}

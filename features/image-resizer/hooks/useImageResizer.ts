'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Preset, PresetKey } from '@/types/registry'
import {
  ACCEPTED_MIME_TYPES,
  type AcceptedMimeType,
  type OriginalImage,
  type ProcessedResult,
  type ResizerState,
  type WorkerRequest,
  type WorkerResponse,
} from '../types'

function buildFilename(presetKey: PresetKey, mimeType: string): string {
  const ext =
    mimeType === 'image/png'
      ? 'png'
      : mimeType === 'image/webp'
        ? 'webp'
        : 'jpg'
  return `presetly-${presetKey}.${ext}`
}

export interface UseImageResizerReturn {
  state: ResizerState
  processFile: (file: File) => Promise<void>
  reset: () => void
}

export function useImageResizer(preset: Preset): UseImageResizerReturn {
  const [state, setState] = useState<ResizerState>({ status: 'idle' })
  const workerRef = useRef<Worker | null>(null)
  const originalUrlRef = useRef<string | null>(null)
  const resultUrlRef = useRef<string | null>(null)

  // Keep preset current without recreating the worker
  const presetRef = useRef(preset)
  presetRef.current = preset

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
          const objectUrl = URL.createObjectURL(msg.blob)
          resultUrlRef.current = objectUrl

          setState(prev => {
            if (prev.status !== 'processing') return prev
            const result: ProcessedResult = {
              blob: msg.blob,
              objectUrl,
              sizeKB: msg.sizeKB,
              filename: buildFilename(presetRef.current.key, msg.blob.type),
              mimeType: msg.blob.type,
            }
            return { status: 'done', original: prev.original, result }
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
  }, []) // Worker lifetime == component lifetime

  const processFile = useCallback(async (file: File) => {
    // Revoke previous URLs before starting a new job
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current)
      originalUrlRef.current = null
    }
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }

    setState({ status: 'loading' })

    try {
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

      setState({ status: 'processing', progress: 0, original })

      const originalMime: AcceptedMimeType = ACCEPTED_MIME_TYPES.includes(
        file.type as AcceptedMimeType,
      )
        ? (file.type as AcceptedMimeType)
        : 'image/jpeg'

      const request: WorkerRequest = {
        type: 'PROCESS',
        id: Math.random().toString(36).slice(2),
        bitmap,
        preset: presetRef.current,
        originalMime,
      }

      // Transfer bitmap — zero-copy move to worker
      workerRef.current?.postMessage(request, [request.bitmap])
    } catch (err) {
      setState({
        status: 'error',
        message:
          err instanceof Error ? err.message : 'Failed to read the image file.',
      })
    }
  }, [])

  const reset = useCallback(() => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = null
    }
    setState({ status: 'idle' })
  }, [])

  return { state, processFile, reset }
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getPreset } from '@/registry/presets'
import type { CompressPresetKey } from '@/registry/presets/schema'
import {
  ACCEPTED_MIME_TYPES,
  type AcceptedMimeType,
  type OriginalImage,
  type ProcessedResult,
  type WorkerRequest,
  type WorkerResponse,
} from '../types'

// ─── State machine ─────────────────────────────────────────────────────────────

export type SizeFirstState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'ready'
      file: File
      width: number
      height: number
      sizeKB: number
      objectUrl: string
    }
  | {
      status: 'processing'
      progress: number
      file: File
      width: number
      height: number
      sizeKB: number
      objectUrl: string
      activePresetKey: CompressPresetKey
    }
  | {
      status: 'done'
      original: OriginalImage
      result: ProcessedResult
      activePresetKey: CompressPresetKey
    }
  | { status: 'error'; message: string }

export interface UseSizeFirstResizerReturn {
  state: SizeFirstState
  loadFile: (file: File) => Promise<void>
  process: (presetKey: CompressPresetKey) => Promise<void>
  reset: () => void
}

function buildFilename(presetKey: CompressPresetKey, mimeType: string): string {
  const ext =
    mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg'
  return `presetly-${presetKey}.${ext}`
}

export function useSizeFirstResizer(): UseSizeFirstResizerReturn {
  const [state, setState] = useState<SizeFirstState>({ status: 'idle' })
  const stateRef = useRef<SizeFirstState>(state)
  stateRef.current = state

  const workerRef = useRef<Worker | null>(null)
  const primaryUrlRef = useRef<string | null>(null)
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
            const result: ProcessedResult = {
              blob: msg.blob,
              objectUrl: resultUrl,
              // sizeKB from worker is the validated Blob size (one decimal place).
              // Never derived from filename.
              sizeKB: msg.sizeKB,
              targetKB: msg.targetKB,
              filename: buildFilename(prev.activePresetKey, msg.blob.type),
              mimeType: msg.blob.type,
            }
            const original: OriginalImage = {
              file: prev.file,
              objectUrl: prev.objectUrl,
              width: prev.width,
              height: prev.height,
              sizeKB: prev.sizeKB,
            }
            return { status: 'done', original, result, activePresetKey: prev.activePresetKey }
          })
          break
        }

        case 'ERROR':
          setState({ status: 'error', message: msg.message })
          break
      }
    }

    worker.onerror = (err: ErrorEvent) => {
      setState({ status: 'error', message: err.message || 'An unexpected error occurred.' })
    }

    workerRef.current = worker
    return () => {
      worker.terminate()
      if (primaryUrlRef.current) URL.revokeObjectURL(primaryUrlRef.current)
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    }
  }, [])

  const loadFile = useCallback(async (file: File) => {
    if (primaryUrlRef.current) URL.revokeObjectURL(primaryUrlRef.current)
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    primaryUrlRef.current = null
    resultUrlRef.current = null

    setState({ status: 'loading' })

    try {
      const bitmap = await createImageBitmap(file)
      const { width, height } = bitmap
      bitmap.close()

      const objectUrl = URL.createObjectURL(file)
      primaryUrlRef.current = objectUrl
      setState({ status: 'ready', file, width, height, sizeKB: Math.round(file.size / 1024), objectUrl })
    } catch {
      setState({ status: 'error', message: 'Failed to read the image file.' })
    }
  }, [])

  const process = useCallback(async (presetKey: CompressPresetKey) => {
    const cur = stateRef.current
    if (cur.status !== 'ready' && cur.status !== 'done') return

    const file = cur.status === 'ready' ? cur.file : cur.original.file
    const sizeKB = cur.status === 'ready' ? cur.sizeKB : cur.original.sizeKB
    const objectUrl = cur.status === 'ready' ? cur.objectUrl : cur.original.objectUrl
    const width = cur.status === 'ready' ? cur.width : cur.original.width
    const height = cur.status === 'ready' ? cur.height : cur.original.height

    setState({ status: 'processing', progress: 0, file, width, height, sizeKB, objectUrl, activePresetKey: presetKey })

    try {
      const bitmap = await createImageBitmap(file)
      const preset = getPreset(presetKey)

      const originalMime: AcceptedMimeType = ACCEPTED_MIME_TYPES.includes(
        file.type as AcceptedMimeType,
      )
        ? (file.type as AcceptedMimeType)
        : 'image/jpeg'

      const request: WorkerRequest = {
        type: 'PROCESS',
        id: Math.random().toString(36).slice(2),
        bitmap,
        preset,
        originalMime,
      }
      workerRef.current?.postMessage(request, [request.bitmap])
    } catch {
      setState({ status: 'error', message: 'Failed to prepare image for compression.' })
    }
  }, [])

  const reset = useCallback(() => {
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
    resultUrlRef.current = null
    setState({ status: 'idle' })
  }, [])

  return { state, loadFile, process, reset }
}

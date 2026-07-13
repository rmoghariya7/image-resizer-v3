'use client'

import { useCallback, useRef, useState } from 'react'
import {
  ACCEPTED_EXTENSION_LIST,
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_FILE_SIZE_BYTES,
  type AcceptedVideoMimeType,
  type DropZoneStatus,
  type ValidationError,
} from '../types'

interface Options {
  onFile: (file: File) => void
  disabled?: boolean
}

export interface UseVideoDropZoneReturn {
  status: DropZoneStatus
  validationError: ValidationError | null
  fileInputRef: React.RefObject<HTMLInputElement | null>
  containerProps: {
    onDragOver: (e: React.DragEvent) => void
    onDragEnter: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
  }
  openFilePicker: () => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function validate(file: File): ValidationError | null {
  // MIME check with extension fallback — Windows/Android frequently report
  // MKV/AVI files with an empty or generic MIME type.
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  const typeOk =
    ACCEPTED_MIME_TYPES.includes(file.type as AcceptedVideoMimeType) ||
    ACCEPTED_EXTENSION_LIST.includes(extension)

  if (!typeOk) {
    return {
      code: 'invalid-type',
      message: 'Please upload an MP4, MOV, AVI, MKV, WEBM or M4V video.',
    }
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      code: 'file-too-large',
      message: `Video must be under ${MAX_FILE_SIZE_MB} MB.`,
    }
  }
  return null
}

export function useVideoDropZone({ onFile, disabled = false }: Options): UseVideoDropZoneReturn {
  const [status, setStatus] = useState<DropZoneStatus>('idle')
  const [validationError, setValidationError] = useState<ValidationError | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dragCounter = useRef(0)

  const handleFile = useCallback(
    (file: File | null | undefined) => {
      if (!file) return
      const error = validate(file)
      if (error) {
        setValidationError(error)
        setStatus('rejected')
        setTimeout(() => setStatus('idle'), 2500)
        return
      }
      setValidationError(null)
      onFile(file)
    },
    [onFile],
  )

  const onDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      dragCounter.current += 1
      if (!disabled) setStatus('active')
    },
    [disabled],
  )

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setStatus('active')
    },
    [disabled],
  )

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current -= 1
    if (dragCounter.current <= 0) {
      dragCounter.current = 0
      setStatus('idle')
    }
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      dragCounter.current = 0
      setStatus('idle')
      if (disabled) return
      handleFile(e.dataTransfer.files[0])
    },
    [disabled, handleFile],
  )

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0])
      // Reset so the same file can be re-selected
      e.target.value = ''
    },
    [handleFile],
  )

  return {
    status,
    validationError,
    fileInputRef,
    containerProps: { onDragOver, onDragEnter, onDragLeave, onDrop },
    openFilePicker,
    onInputChange,
  }
}

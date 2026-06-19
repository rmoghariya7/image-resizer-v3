'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ACCEPTED_MIME_TYPES,
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE_MB,
  MAX_FILE_SIZE_BYTES,
  type AcceptedMimeType,
  type DropZoneStatus,
  type ValidationError,
} from '../types'

interface Options {
  onFile: (file: File) => void
  disabled?: boolean
}

export interface UseDropZoneReturn {
  status: DropZoneStatus
  validationError: ValidationError | null
  fileInputRef: React.RefObject<HTMLInputElement | null>
  cameraInputRef: React.RefObject<HTMLInputElement | null>
  containerProps: {
    onDragOver: (e: React.DragEvent) => void
    onDragEnter: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
  }
  openFilePicker: () => void
  openCamera: () => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function useDropZone({ onFile, disabled = false }: Options): UseDropZoneReturn {
  const [status, setStatus] = useState<DropZoneStatus>('idle')
  const [validationError, setValidationError] = useState<ValidationError | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)
  const dragCounter = useRef(0)

  function validate(file: File): ValidationError | null {
    if (!ACCEPTED_MIME_TYPES.includes(file.type as AcceptedMimeType)) {
      return {
        code: 'invalid-type',
        message: 'Please upload a JPEG, PNG, or WebP image.',
      }
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        code: 'file-too-large',
        message: `File must be under ${MAX_FILE_SIZE_MB} MB.`,
      }
    }
    return null
  }

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

  const openCamera = useCallback(() => {
    cameraInputRef.current?.click()
  }, [])

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0])
      // Reset so the same file can be re-selected
      e.target.value = ''
    },
    [handleFile],
  )

  // Global paste — user can paste an image from clipboard anywhere on the page
  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      if (disabled) return
      const items = Array.from(e.clipboardData?.items ?? [])
      const imageItem = items.find(
        item =>
          item.kind === 'file' &&
          ACCEPTED_MIME_TYPES.includes(item.type as AcceptedMimeType),
      )
      if (imageItem) {
        handleFile(imageItem.getAsFile())
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [disabled, handleFile])

  return {
    status,
    validationError,
    fileInputRef,
    cameraInputRef,
    containerProps: { onDragOver, onDragEnter, onDragLeave, onDrop },
    openFilePicker,
    openCamera,
    onInputChange,
  }
}

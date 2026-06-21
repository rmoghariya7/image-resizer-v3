'use client'

import { ACCEPTED_EXTENSIONS } from '../types'
import type { DropZoneStatus, ValidationError } from '../types'

interface Props {
  status: DropZoneStatus
  validationError: ValidationError | null
  disabled?: boolean
  containerProps: {
    onDragOver: (e: React.DragEvent) => void
    onDragEnter: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
  }
  fileInputRef: React.RefObject<HTMLInputElement | null>
  cameraInputRef: React.RefObject<HTMLInputElement | null>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onOpenFilePicker: () => void
  onOpenCamera: () => void
  children?: React.ReactNode
}

export function DropZone({
  status,
  validationError,
  disabled = false,
  containerProps,
  fileInputRef,
  cameraInputRef,
  onInputChange,
  onOpenFilePicker,
  onOpenCamera,
  children,
}: Props) {
  const areaStyles =
    status === 'active'
      ? 'border-indigo-400 bg-indigo-50/60'
      : status === 'rejected'
        ? 'border-red-400 bg-red-50/60'
        : 'border-gray-300 bg-white hover:border-gray-400'

  return (
    <section aria-label="Image upload" className="bg-gray-50 px-4 py-4 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Drop area */}
        <div
          {...containerProps}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload image — click, drag a file, or paste from clipboard"
          aria-disabled={disabled}
          className={[
            'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed',
            'px-6 py-8 text-center shadow-sm transition-colors duration-150 sm:py-14',
            disabled ? 'cursor-default opacity-60' : 'cursor-pointer',
            areaStyles,
          ].join(' ')}
          onClick={disabled ? undefined : onOpenFilePicker}
          onKeyDown={
            disabled
              ? undefined
              : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onOpenFilePicker()
                  }
                }
          }
        >
          {/* Loading / processing overlay (passed as children) */}
          {children}

          {/* Upload icon */}
          <div
            aria-hidden="true"
            className={[
              'mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-colors',
              status === 'active' ? 'bg-indigo-100' : 'bg-indigo-50',
            ].join(' ')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={[
                'h-7 w-7 transition-colors',
                status === 'active' ? 'text-indigo-600' : 'text-indigo-500',
              ].join(' ')}
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <p className="text-base font-semibold text-gray-900">
            {status === 'active' ? 'Drop to upload' : 'Drop your image here'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            or click to select &bull; paste from clipboard supported
          </p>
          <p className="mt-2 text-xs text-gray-400">JPEG, PNG, WebP &bull; Max 20 MB</p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={(e) => { e.stopPropagation(); onOpenFilePicker() }}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Select file
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={(e) => { e.stopPropagation(); onOpenCamera() }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Camera
            </button>
          </div>

          <p className="mt-5 text-xs text-gray-400">
            Processed entirely in your browser &mdash; nothing leaves your device.
          </p>
        </div>

        {/* Validation error */}
        {validationError && (
          <p
            role="alert"
            aria-live="assertive"
            className="mt-3 text-center text-sm font-medium text-red-600"
          >
            {validationError.message}
          </p>
        )}

        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          onChange={onInputChange}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          onChange={onInputChange}
        />
      </div>
    </section>
  )
}

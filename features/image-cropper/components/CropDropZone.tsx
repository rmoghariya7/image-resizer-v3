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
}

/**
 * Upload area for the Image Cropper. Structurally identical to the Image
 * Resizer's DropZone (same classNames, same a11y contract) — duplicated here
 * per the feature module's self-contained-architecture rule rather than a
 * cross-feature import, matching the existing image-resizer / video-to-audio
 * precedent in this codebase.
 */
export function CropDropZone({
  status,
  validationError,
  disabled = false,
  containerProps,
  fileInputRef,
  cameraInputRef,
  onInputChange,
  onOpenFilePicker,
  onOpenCamera,
}: Props) {
  const areaStyles =
    status === 'active'
      ? 'border-indigo-400 bg-indigo-50/60'
      : status === 'rejected'
        ? 'border-red-400 bg-red-50/60'
        : 'border-gray-300 bg-white hover:border-gray-400'

  return (
    <section aria-label="Image upload" className="bg-gray-50 px-4 py-3 sm:px-6 md:py-10">
      <div className="mx-auto max-w-2xl">
        <div
          {...containerProps}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload image to crop — click, drag a file, or paste from clipboard"
          aria-disabled={disabled}
          className={[
            'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed',
            'px-6 py-5 text-center shadow-sm transition-colors duration-150 md:py-10',
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
          <div
            aria-hidden="true"
            className={[
              'mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-colors md:mb-4 md:h-14 md:w-14',
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
                'h-6 w-6 transition-colors md:h-7 md:w-7',
                status === 'active' ? 'text-indigo-600' : 'text-indigo-500',
              ].join(' ')}
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 3v4a1 1 0 0 1-1 1H3" />
              <path d="M16 21v-4a1 1 0 0 1 1-1h4" />
            </svg>
          </div>

          <p className="text-base font-semibold text-gray-900">
            {status === 'active' ? 'Drop to upload' : 'Drop your image here'}
          </p>
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            or click to select &bull; paste from clipboard supported
          </p>
          <p className="mt-2 text-xs text-gray-400">JPEG, PNG, WebP &bull; Max 20 MB</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                onOpenFilePicker()
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Select file
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                onOpenCamera()
              }}
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

          <p className="mt-3 text-xs text-gray-400 md:mt-4">
            Processed entirely in your browser &mdash; nothing leaves your device.
          </p>
        </div>

        {validationError && (
          <p role="alert" aria-live="assertive" className="mt-3 text-center text-sm font-medium text-red-600">
            {validationError.message}
          </p>
        )}

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

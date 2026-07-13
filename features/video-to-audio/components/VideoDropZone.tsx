'use client'

import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_MB } from '../types'
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
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onOpenFilePicker: () => void
}

/**
 * Upload area for video files. Deliberately shorter than the image DropZone —
 * the format cards and Extract button must share the first viewport with it
 * on a 320px-wide phone (core UX rule: no scrolling before Extract).
 */
export function VideoDropZone({
  status,
  validationError,
  disabled = false,
  containerProps,
  fileInputRef,
  onInputChange,
  onOpenFilePicker,
}: Props) {
  const areaStyles =
    status === 'active'
      ? 'border-indigo-400 bg-indigo-50/60'
      : status === 'rejected'
        ? 'border-red-400 bg-red-50/60'
        : 'border-gray-300 bg-white hover:border-gray-400'

  return (
    <div>
      <div
        {...containerProps}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload video — click or drag a file"
        aria-disabled={disabled}
        className={[
          'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed',
          'px-4 py-3 text-center shadow-sm transition-colors duration-150 md:py-8',
          disabled ? 'cursor-default opacity-60' : 'cursor-pointer',
          areaStyles,
        ].join(' ')}
        onClick={disabled ? undefined : onOpenFilePicker}
        onKeyDown={
          disabled
            ? undefined
            : e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onOpenFilePicker()
                }
              }
        }
      >
        {/* Video icon */}
        <div
          aria-hidden="true"
          className={[
            'mb-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-colors md:mb-3 md:h-12 md:w-12',
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
              'h-5 w-5 transition-colors md:h-6 md:w-6',
              status === 'active' ? 'text-indigo-600' : 'text-indigo-500',
            ].join(' ')}
            aria-hidden="true"
          >
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
          </svg>
        </div>

        <p className="text-sm font-semibold text-gray-900 md:text-base">
          {status === 'active' ? 'Drop to upload' : 'Drop your video here'}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500 md:text-xs">
          MP4, MOV, AVI, MKV, WEBM, M4V &bull; Max {MAX_FILE_SIZE_MB} MB
        </p>

        <button
          type="button"
          disabled={disabled}
          onClick={e => {
            e.stopPropagation()
            onOpenFilePicker()
          }}
          className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 md:mt-4 md:py-2.5"
        >
          Select video
        </button>

        <p className="mt-1.5 text-[11px] leading-tight text-gray-400 md:mt-3 md:text-xs">
          🔒 Processed entirely in your browser &mdash; your video never leaves
          your device.
        </p>
      </div>

      {/* Validation error */}
      {validationError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-2 text-center text-sm font-medium text-red-600"
        >
          {validationError.message}
        </p>
      )}

      {/* Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={onInputChange}
      />
    </div>
  )
}

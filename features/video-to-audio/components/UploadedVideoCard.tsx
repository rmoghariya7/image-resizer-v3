'use client'

import type { SourceVideo } from '../types'
import { formatDuration, formatKB } from '../lib/format'

interface Props {
  video: SourceVideo
  onClear: () => void
  onReplace: () => void
  disabled?: boolean
}

/**
 * Compact chip shown once a video is loaded — replaces the tall drop area so
 * the format cards and Extract button stay above the fold on mobile.
 */
export function UploadedVideoCard({ video, onClear, onReplace, disabled = false }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm md:px-4 md:py-3">
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 md:h-10 md:w-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4.5 w-4.5 text-indigo-500 md:h-5 md:w-5"
          aria-hidden="true"
        >
          <path d="m22 8-6 4 6 4V8Z" />
          <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{video.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {formatKB(video.sizeKB)}
          {video.duration !== undefined && (
            <>
              {' '}
              <span aria-hidden="true">&middot;</span>{' '}
              <span aria-label={`Duration ${formatDuration(video.duration)}`}>
                {formatDuration(video.duration)}
              </span>
            </>
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={onReplace}
        disabled={disabled}
        className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Replace
      </button>

      <button
        type="button"
        onClick={onClear}
        disabled={disabled}
        aria-label="Remove video and start over"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

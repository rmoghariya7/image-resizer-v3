'use client'

import type { ExtractStage } from '../types'

interface Props {
  stage: ExtractStage
  progress: number
}

/**
 * In-place progress card shown while FFmpeg boots ('engine' — first visit
 * only, indeterminate) or converts ('extract' — determinate percent).
 */
export function ExtractionProgress({ stage, progress }: Props) {
  const isEngine = stage === 'engine'

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={
        isEngine ? 'Preparing audio engine' : `Extracting audio: ${progress}%`
      }
      className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-5 shadow-sm md:py-6"
    >
      {/* Spinner */}
      <svg
        className="mb-3 h-8 w-8 animate-spin text-indigo-500 motion-reduce:animate-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>

      <p className="text-sm font-medium text-gray-700">
        {isEngine ? 'Preparing the audio engine…' : 'Extracting audio…'}
      </p>
      {isEngine && (
        <p className="mt-1 text-xs text-gray-400">
          One-time download — future extractions start instantly.
        </p>
      )}

      {!isEngine && (
        <>
          <div
            className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-gray-200"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{ width: `${Math.max(2, progress)}%` }}
            />
          </div>
          <p className="mt-2 text-xs tabular-nums text-gray-400">{progress}%</p>
        </>
      )}
    </div>
  )
}

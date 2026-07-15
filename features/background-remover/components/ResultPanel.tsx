'use client'

import type { BackgroundChoice, OriginalImage, ProcessedResult } from '../types'
import { CompareSlider } from './CompareSlider'
import { BackgroundOptionPicker } from './BackgroundOptionPicker'

interface Props {
  original: OriginalImage
  result: ProcessedResult
  background: BackgroundChoice
  onBackgroundChange: (choice: BackgroundChoice) => void
  onReplace: () => void
  busy?: boolean
}

function fmtKB(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${Number.isInteger(kb) ? kb : kb.toFixed(1)} KB`
}

export function ResultPanel({ original, result, background, onBackgroundChange, onReplace, busy = false }: Props) {
  const fileExt = result.filename.split('.').pop()?.toUpperCase() ?? 'IMAGE'

  return (
    <section aria-label="Background removal result" className="bg-gray-50 px-4 pt-5 pb-4 sm:px-6 md:pt-16 md:pb-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2 md:mb-6">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-white"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-gray-900">Background removed</p>
          <span className="ml-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
            {fmtKB(result.sizeKB)}
          </span>
        </div>

        {/* Before/After slider */}
        <CompareSlider
          beforeSrc={original.objectUrl}
          afterSrc={result.objectUrl}
          beforeAlt={`${original.file.name} before background removal`}
          afterAlt="Photo with background removed"
        />

        {/* Output background picker */}
        <div className="mt-4">
          <BackgroundOptionPicker selected={background} onSelect={onBackgroundChange} disabled={busy} />
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col items-stretch justify-center gap-2 md:mt-6 md:flex-row md:items-center md:gap-3">
          <a
            href={result.objectUrl}
            download={result.filename}
            aria-disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 aria-disabled:pointer-events-none aria-disabled:opacity-50 md:w-auto"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download {fileExt}
          </a>
          <button
            type="button"
            onClick={onReplace}
            aria-label="Replace image — choose a different photo"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-auto"
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
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Try another photo
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-400 md:mt-4">
          Processed entirely in your browser &mdash; nothing was uploaded to any server.
        </p>
      </div>
    </section>
  )
}

'use client'

import { getFormatConfig, type ExtractedAudio, type SourceVideo } from '../types'
import { formatDuration, formatKB } from '../lib/format'

interface Props {
  video: SourceVideo
  result: ExtractedAudio
  /** "Process another video" — one tap back to the upload screen. */
  onProcessAnother: () => void
}

/**
 * Result screen: audio preview, source/output facts, Download +
 * "Process another video" actions. Mirrors the image ResultPanel layout.
 */
export function AudioResultPanel({ video, result, onProcessAnother }: Props) {
  const config = getFormatConfig(result.format)

  const facts: { label: string; value: string }[] = [
    { label: 'Original video', value: video.name },
    ...(result.duration !== undefined
      ? [{ label: 'Duration', value: formatDuration(result.duration) }]
      : []),
    { label: 'Output format', value: `${config.label} (.${config.extension})` },
    { label: 'Audio size', value: formatKB(result.sizeKB) },
  ]

  return (
    <div>
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
        <p className="text-sm font-semibold text-gray-900">Audio ready to download</p>
        <span className="ml-auto rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
          {config.label}
        </span>
      </div>

      {/* Audio card */}
      <div className="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm ring-2 ring-indigo-100">
        <div className="flex items-center gap-3 px-4 pt-4">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-indigo-500"
              aria-hidden="true"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">
            {result.filename}
          </p>
        </div>

        {/* Native audio preview — listen before downloading */}
        <div className="px-4 pb-2 pt-3">
          <audio
            controls
            preload="metadata"
            src={result.objectUrl}
            className="w-full"
            aria-label="Preview extracted audio"
          />
        </div>

        {/* Facts */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-gray-100 px-4 py-3 sm:grid-cols-4">
          {facts.map(fact => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {fact.label}
              </dt>
              <dd className="mt-0.5 truncate text-sm font-medium text-gray-700">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Compact source → output summary */}
      <p className="mt-3 text-center text-xs text-gray-500">
        {formatKB(video.sizeKB)} video →{' '}
        <span className="font-semibold text-gray-900">{formatKB(result.sizeKB)}</span>{' '}
        {config.label} audio
      </p>

      {/* Actions */}
      <div className="mt-4 flex flex-col items-stretch justify-center gap-2 md:mt-6 md:flex-row md:items-center md:gap-3">
        <a
          href={result.objectUrl}
          download={result.filename}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-auto"
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
          Download {config.label}
        </a>
        <button
          type="button"
          onClick={onProcessAnother}
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
          Process another video
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400 md:mt-4">
        🔒 Processed entirely in your browser &mdash; your video never left your
        device.
      </p>
    </div>
  )
}

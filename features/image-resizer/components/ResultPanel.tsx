'use client'

import type { OriginalImage, ProcessedResult } from '../types'

interface Props {
  original: OriginalImage
  result: ProcessedResult
  onReset: () => void
}

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${kb} KB`
}

export function ResultPanel({ original, result, onReset }: Props) {
  const reductionPercent = Math.max(
    0,
    Math.round((1 - result.sizeKB / original.sizeKB) * 100),
  )
  const savedKB = Math.max(0, original.sizeKB - result.sizeKB)
  const fileExt = result.filename.split('.').pop()?.toUpperCase() ?? 'IMAGE'

  return (
    <section
      aria-label="Processing result"
      className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2">
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
          <p className="text-sm font-semibold text-gray-900">Ready to download</p>
          {reductionPercent > 0 && (
            <span className="ml-auto rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              {reductionPercent}% smaller
            </span>
          )}
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Before */}
          <figure className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-[image:repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={original.objectUrl}
                alt="Original image before processing"
                className="h-52 w-full object-contain"
              />
            </div>
            <figcaption className="border-t border-gray-100 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Before
              </p>
              <p className="mt-1 truncate text-sm font-medium text-gray-700">
                {original.file.name}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                <span>{original.width} × {original.height}px</span>
                <span aria-hidden="true">·</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium">
                  {formatSize(original.sizeKB)}
                </span>
              </div>
            </figcaption>
          </figure>

          {/* After */}
          <figure className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm ring-2 ring-indigo-100">
            <div className="relative bg-[image:repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.objectUrl}
                alt="Processed image after resizing"
                className="h-52 w-full object-contain"
              />
            </div>
            <figcaption className="border-t border-indigo-100 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                After
              </p>
              <p className="mt-1 truncate text-sm font-medium text-gray-700">
                {result.filename}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700">
                  {formatSize(result.sizeKB)}
                </span>
                {savedKB > 0 && (
                  <span className="text-green-600">
                    {formatSize(savedKB)} saved
                  </span>
                )}
              </div>
            </figcaption>
          </figure>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={result.objectUrl}
            download={result.filename}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Process another image
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Your image was processed entirely in your browser &mdash; nothing was uploaded to any server.
        </p>
      </div>
    </section>
  )
}

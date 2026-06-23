'use client'

import type { OriginalImage, ProcessedResult } from '../types'

interface Props {
  original: OriginalImage
  result: ProcessedResult
}

function fmtKB(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  // Show one decimal for values that have a fractional part; integer otherwise.
  return `${Number.isInteger(kb) ? kb : kb.toFixed(1)} KB`
}

/**
 * Shows a before/after image comparison, compression stats, and a download button.
 * When result.targetKB is present (compress presets), also shows a target / actual /
 * difference row so the user can verify the output meets their target.
 */
export function ResultPanel({ original, result }: Props) {
  const reductionPercent = Math.max(
    0,
    Math.round((1 - result.sizeKB / original.sizeKB) * 100),
  )
  const savedKB = Math.max(0, original.sizeKB - result.sizeKB)
  const fileExt = result.filename.split('.').pop()?.toUpperCase() ?? 'IMAGE'

  // Target / actual comparison — only for compress presets.
  const hasTarget = result.targetKB !== undefined

  const isAlreadyBelow = result.compressionStatus === 'already-below-target'
  const isCouldNotReach = result.compressionStatus === 'could-not-reach-target'
  const headerLabel = isAlreadyBelow ? 'Already below target size' : 'Ready to download'

  const statusLabel =
    isAlreadyBelow ? 'Already Below Target' :
    isCouldNotReach ? 'Closest Match Available' :
    'Success'

  const statusColor =
    isAlreadyBelow ? 'text-blue-600' :
    isCouldNotReach ? 'text-amber-600' :
    'text-green-600'

  return (
    <section
      aria-label="Processing result"
      className="bg-gray-50 px-4 pt-12 pb-6 sm:px-6 sm:pt-16"
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              isAlreadyBelow ? 'bg-blue-500' : 'bg-green-500'
            }`}
          >
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
          <p className="text-sm font-semibold text-gray-900">{headerLabel}</p>
          {reductionPercent > 0 && !isAlreadyBelow && (
            <span className="ml-auto rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              {reductionPercent}% smaller
            </span>
          )}
          {isAlreadyBelow && (
            <span className="ml-auto rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              Original returned
            </span>
          )}
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Before */}
          <figure className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-size-[16px_16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={original.objectUrl}
                alt="Original image before processing"
                className="h-44 w-full object-contain sm:h-52"
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
                  {fmtKB(original.sizeKB)}
                </span>
              </div>
            </figcaption>
          </figure>

          {/* After */}
          <figure className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm ring-2 ring-indigo-100">
            <div className="bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-size-[16px_16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.objectUrl}
                alt="Processed image after compression"
                className="h-44 w-full object-contain sm:h-52"
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
                  {fmtKB(result.sizeKB)}
                </span>
                {savedKB > 0 && (
                  <span className="text-green-600">
                    {fmtKB(savedKB)} saved
                  </span>
                )}
              </div>
            </figcaption>
          </figure>
        </div>

        {/* Target / Actual / Difference — compress presets only */}
        {hasTarget && (
          <div
            className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            aria-label="Compression accuracy"
          >
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              <div className="px-4 py-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Target
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {fmtKB(result.targetKB!)}
                </p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Actual
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {fmtKB(result.sizeKB)}
                </p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </p>
                <p className={`mt-1 text-sm font-semibold ${statusColor}`}>
                  {statusLabel}
                </p>
              </div>
            </div>
            {isAlreadyBelow && (
              <p className="border-t border-blue-100 bg-blue-50 px-4 py-2 text-xs text-blue-700">
                Your image is already within the {fmtKB(result.targetKB!)} limit — the original
                file was returned unchanged to preserve maximum quality.
              </p>
            )}
            {isCouldNotReach && (
              <p className="border-t border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-700">
                Could not compress to {fmtKB(result.targetKB!)} — image is too complex at minimum
                quality. Try a larger target or upload a smaller image.
              </p>
            )}
          </div>
        )}

        {/* Download */}
        <div className="mt-6 flex justify-center">
          <a
            href={result.objectUrl}
            download={result.filename}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Processed entirely in your browser &mdash; nothing was uploaded to any server.
        </p>
      </div>
    </section>
  )
}

'use client'

import type { CroppedResult, OriginalImage } from '../types'

interface Props {
  original: OriginalImage
  result: CroppedResult
  onDownload?: () => void
  onCropAnother: () => void
}

function fmtKB(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${Number.isInteger(kb) ? kb : kb.toFixed(1)} KB`
}

/** Preview + dimensions + file size + Download + Crop another — shown right after cropping. */
export function CropResultPanel({ original, result, onDownload, onCropAnother }: Props) {
  const fileExt = result.filename.split('.').pop()?.toUpperCase() ?? 'IMAGE'

  return (
    <section aria-label="Crop result" className="bg-gray-50 px-4 pt-5 pb-4 sm:px-6 md:pt-10 md:pb-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
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
        </div>

        {/* Preview */}
        <figure className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm ring-2 ring-indigo-100">
          <div className="bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-size-[16px_16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.objectUrl}
              alt="Cropped image preview"
              className="mx-auto max-h-80 w-full object-contain"
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-indigo-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-gray-700">{result.filename}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700">
                {result.width} × {result.height}px
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 font-semibold text-gray-600">
                {fmtKB(result.sizeKB)}
              </span>
            </div>
          </figcaption>
        </figure>

        <p className="mt-2 text-center text-xs text-gray-500">
          Original {original.width} × {original.height}px ({fmtKB(original.sizeKB)}) → Cropped {result.width} × {result.height}px ({fmtKB(result.sizeKB)})
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-col items-stretch justify-center gap-2 md:mt-6 md:flex-row md:items-center md:gap-3">
          <a
            href={result.objectUrl}
            download={result.filename}
            onClick={onDownload}
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
            Download {fileExt}
          </a>
          <button
            type="button"
            onClick={onCropAnother}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-auto"
          >
            Crop another image
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-400 md:mt-4">
          Processed entirely in your browser &mdash; nothing was uploaded to any server.
        </p>
      </div>
    </section>
  )
}

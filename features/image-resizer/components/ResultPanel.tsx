'use client'

import { useState } from 'react'
import { formatKB as fmtKB } from '../lib/format-size'
import type { OriginalImage, ProcessedResult } from '../types'

interface Props {
  original: OriginalImage
  result: ProcessedResult
  /**
   * Remove the uploaded image and return to the upload screen (preset kept).
   * Renders a small × button on the image card when provided.
   */
  onClear?: () => void
  /**
   * Open the file picker to replace the current image (preset kept).
   * Renders a secondary "Replace image" button next to Download when provided.
   */
  onReplace?: () => void
}

/**
 * Shows a before/after image comparison, compression stats, and a download button.
 * When result.targetKB is present (compress presets), also shows a target / actual /
 * difference row so the user can verify the output meets their target.
 *
 * Responsive behaviour:
 * - Mobile (<768px): a Before/After segmented toggle showing one image at a
 *   time, plus a one-line compact stats summary — roughly half the vertical
 *   height of the stacked-cards layout.
 * - Desktop (md+): the original side-by-side cards + accuracy table — unchanged.
 */
export function ResultPanel({ original, result, onClear, onReplace }: Props) {
  // Mobile-only Before/After toggle. Defaults to the processed result, since
  // that's what the user came for.
  const [mobileView, setMobileView] = useState<'before' | 'after'>('after')

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

  // Small × overlay button, anchored to the image card (Canva/Figma-style).
  // Clears the uploaded image and returns to the upload screen.
  const clearButton = onClear && (
    <button
      type="button"
      onClick={onClear}
      aria-label="Remove image and start over"
      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
  )

  const segmentButton = (isActive: boolean) =>
    [
      'rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-gray-600 hover:bg-gray-50',
    ].join(' ')

  return (
    <section
      aria-label="Processing result"
      className="bg-gray-50 px-4 pt-5 pb-4 sm:px-6 md:pt-16 md:pb-6"
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2 md:mb-6">
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

        {/* ─── Mobile (<768px): Before/After toggle + compact summary ─────────── */}
        <div className="md:hidden">
          {/* Segmented toggle */}
          <div
            role="group"
            aria-label="Compare original and processed image"
            className="mb-2 grid grid-cols-2 gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm"
          >
            <button
              type="button"
              onClick={() => setMobileView('before')}
              aria-pressed={mobileView === 'before'}
              className={segmentButton(mobileView === 'before')}
            >
              Before · {fmtKB(original.sizeKB)}
            </button>
            <button
              type="button"
              onClick={() => setMobileView('after')}
              aria-pressed={mobileView === 'after'}
              className={segmentButton(mobileView === 'after')}
            >
              After · {fmtKB(result.sizeKB)}
            </button>
          </div>

          {/* Single preview — both images stay mounted to avoid decode flicker */}
          <figure
            className={[
              'relative overflow-hidden rounded-xl border bg-white shadow-sm',
              mobileView === 'after'
                ? 'border-indigo-200 ring-2 ring-indigo-100'
                : 'border-gray-200',
            ].join(' ')}
          >
            {clearButton}
            <div className="bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-size-[16px_16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={original.objectUrl}
                alt="Original image before processing"
                className={
                  mobileView === 'before' ? 'h-48 w-full object-contain' : 'hidden'
                }
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.objectUrl}
                alt="Processed image after compression"
                className={
                  mobileView === 'after' ? 'h-48 w-full object-contain' : 'hidden'
                }
              />
            </div>
            <figcaption className="flex items-center justify-between gap-2 border-t border-gray-100 px-3 py-2">
              <p className="truncate text-xs font-medium text-gray-700">
                {mobileView === 'before' ? original.file.name : result.filename}
              </p>
              <span
                className={[
                  'shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold',
                  mobileView === 'after'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'bg-gray-100 text-gray-600',
                ].join(' ')}
              >
                {mobileView === 'before'
                  ? `${original.width} × ${original.height}px`
                  : result.width && result.height
                    ? `${result.width} × ${result.height}px · ${fmtKB(result.sizeKB)}`
                    : fmtKB(result.sizeKB)}
              </span>
            </figcaption>
          </figure>

          {/* Compact stats summary */}
          <p className="mt-3 text-center text-xs text-gray-500">
            {fmtKB(original.sizeKB)} →{' '}
            <span className="font-semibold text-gray-900">
              {fmtKB(result.sizeKB)}
            </span>
            {savedKB > 0 && (
              <span className="text-green-600"> · {fmtKB(savedKB)} saved</span>
            )}
            {hasTarget && (
              <>
                {' '}· Target {fmtKB(result.targetKB!)} ·{' '}
                <span className={`font-semibold ${statusColor}`}>{statusLabel}</span>
              </>
            )}
          </p>

          {isAlreadyBelow && (
            <p className="mt-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
              Your image is already within the {fmtKB(result.targetKB!)} limit — the original
              file was returned unchanged to preserve maximum quality.
            </p>
          )}
          {isCouldNotReach && (
            <p className="mt-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Could not compress to {fmtKB(result.targetKB!)} — image is too complex at minimum
              quality. Try a larger target or upload a smaller image.
            </p>
          )}
        </div>

        {/* ─── Desktop (md+): original side-by-side cards — unchanged ─────────── */}
        <div className="hidden gap-4 md:grid md:grid-cols-2">
          {/* Before — carries the × since it represents the uploaded file */}
          <figure className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {clearButton}
            <div className="bg-[repeating-conic-gradient(#f3f4f6_0%_25%,white_0%_50%)] bg-size-[16px_16px]">
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
                {/* Output dimensions — present for custom resize operations */}
                {result.width && result.height && (
                  <span className="text-gray-500">
                    {result.width} × {result.height}px
                  </span>
                )}
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

        {/* Target / Actual / Difference — compress presets only (desktop) */}
        {hasTarget && (
          <div
            className="mt-4 hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block"
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

        {/* Actions — primary Download + secondary Replace image.
            Full-width stacked on mobile, centered row on md+ */}
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
            Download {fileExt}
          </a>
          {onReplace && (
            <button
              type="button"
              onClick={onReplace}
              aria-label="Replace image — choose a different file"
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
              Replace image
            </button>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-gray-400 md:mt-4">
          Processed entirely in your browser &mdash; nothing was uploaded to any server.
        </p>
      </div>
    </section>
  )
}

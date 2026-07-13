'use client'

import { useState } from 'react'
import {
  ACCEPTED_EXTENSIONS,
  DEFAULT_ADVANCED_SETTINGS,
  type AdvancedSettings,
  type OutputFormat,
} from '../types'
import { useAudioExtractor } from '../hooks/useAudioExtractor'
import { useVideoDropZone } from '../hooks/useVideoDropZone'
import { VideoDropZone } from './VideoDropZone'
import { UploadedVideoCard } from './UploadedVideoCard'
import { FormatSelector } from './FormatSelector'
import { AdvancedOptions } from './AdvancedOptions'
import { ExtractionProgress } from './ExtractionProgress'
import { AudioResultPanel } from './AudioResultPanel'

/**
 * Video to Audio Extractor — Upload → choose format → Extract → Download.
 *
 * Above-the-fold rule: in every pre-result state the upload control, the five
 * format cards and the Extract button fit a 320px-wide phone viewport without
 * scrolling. That's why the loaded-video state collapses the drop area into a
 * one-line chip and Advanced options stay in a collapsed <details>.
 *
 * FFmpeg (the heavy part) is NOT part of this bundle — it's dynamically
 * imported by useAudioExtractor when a video is first loaded, and runs in a
 * Web Worker so the UI never blocks.
 */
export function VideoToAudioTool() {
  const { state, loadFile, extract, reset, dismissError } = useAudioExtractor()
  const [format, setFormat] = useState<OutputFormat>('mp3')
  const [settings, setSettings] = useState<AdvancedSettings>(DEFAULT_ADVANCED_SETTINGS)

  const isExtracting = state.status === 'extracting'
  const {
    status: dropStatus,
    validationError,
    fileInputRef,
    containerProps,
    openFilePicker,
    onInputChange,
  } = useVideoDropZone({ onFile: loadFile, disabled: isExtracting })

  // ── Done: result panel replaces the tool controls ──────────────────────────
  if (state.status === 'done') {
    return (
      <section
        aria-label="Extraction result"
        className="scroll-mt-16 bg-gray-50 px-4 py-3 sm:px-6 md:py-10"
      >
        <div className="mx-auto max-w-2xl">
          <AudioResultPanel
            video={state.video}
            result={state.result}
            onProcessAnother={reset}
          />
        </div>
      </section>
    )
  }

  const video =
    state.status === 'ready' || state.status === 'extracting'
      ? state.video
      : state.status === 'error'
        ? state.video
        : undefined

  return (
    <section
      aria-label="Video to audio extractor"
      className="scroll-mt-16 bg-gray-50 px-4 py-3 sm:px-6 md:py-10"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-2 md:gap-4">
        {/* 1. Upload — full drop area before a file exists, compact chip after */}
        {video ? (
          <UploadedVideoCard
            video={video}
            onClear={reset}
            onReplace={openFilePicker}
            disabled={isExtracting}
          />
        ) : (
          <VideoDropZone
            status={dropStatus}
            validationError={validationError}
            disabled={isExtracting}
            containerProps={containerProps}
            fileInputRef={fileInputRef}
            onInputChange={onInputChange}
            onOpenFilePicker={openFilePicker}
          />
        )}

        {/* Hidden input must stay mounted for Replace while the chip is shown */}
        {video && (
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
            onChange={onInputChange}
          />
        )}

        {/* 2. Output format cards */}
        <FormatSelector selected={format} onSelect={setFormat} disabled={isExtracting} />

        {/* 3. Extract button / progress */}
        {isExtracting ? (
          <ExtractionProgress stage={state.stage} progress={state.progress} />
        ) : (
          <button
            type="button"
            disabled={!video}
            onClick={() => void extract(format, settings)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
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
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            {video ? `Extract ${format.toUpperCase()}` : 'Upload a video to extract audio'}
          </button>
        )}

        {/* Error state */}
        {state.status === 'error' && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex flex-col items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-700">{state.message}</p>
            </div>
            <button
              type="button"
              onClick={dismissError}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Try again
            </button>
          </div>
        )}

        {/* 4. Advanced — collapsed; power users only */}
        <AdvancedOptions
          format={format}
          settings={settings}
          onChange={setSettings}
          disabled={isExtracting}
        />
      </div>
    </section>
  )
}

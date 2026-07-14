'use client'

import { useEffect, useRef } from 'react'
import { usePhotoTextOverlay } from '../hooks/usePhotoTextOverlay'
import { useDropZone } from '../hooks/useDropZone'
import { useScrollToToolOnLoad } from '../hooks/useScrollToToolOnLoad'
import { trackTextOverlayEvent } from '../lib/analytics'
import { TextOverlayDropZone } from './TextOverlayDropZone'
import { FooterPreviewStage } from './FooterPreviewStage'
import { NameSettingsPanel } from './NameSettingsPanel'
import { DateSettingsPanel } from './DateSettingsPanel'
import { FooterSettingsPanel } from './FooterSettingsPanel'
import { ResultPanel } from './ResultPanel'

/**
 * Orchestrates the Photo Footer Generator workflow: Upload -> Live Preview ->
 * Date -> Name -> Footer -> Download. Date and Name are collapsible accordion
 * cards (Date open by default, Name collapsed) so the enable switch is always
 * reachable without opening the card. This is NOT a watermark/overlay tool —
 * the uploaded photo is never drawn on; Name and/or Date only ever appear in
 * a white (or chosen colour) footer band added below the photo.
 */
export function PhotoTextOverlayTool() {
  const {
    state,
    nameSettings,
    dateSettings,
    footerSettings,
    outputFormat,
    loadFile,
    updateNameSettings,
    updateDateSettings,
    updateFooterSettings,
    setOutputFormat,
    generate,
    reset,
    makeAnother,
  } = usePhotoTextOverlay()

  const toolRootRef = useRef<HTMLDivElement>(null)
  useScrollToToolOnLoad(toolRootRef)

  // Fixes a "page jumps down randomly after Download" bug: the editing view
  // (long, with Name/Date/Footer cards + a fixed bottom bar) is much taller
  // than the result view, so when generate() finishes and we swap to the
  // result screen, the document height collapses out from under the
  // browser's current scroll position — landing wherever the browser's
  // scroll-anchoring happens to leave it instead of at the result. Explicitly
  // scrolling the (newly mounted) result container into view on this exact
  // transition makes the post-download position deterministic.
  const prevStatusRef = useRef(state.status)
  useEffect(() => {
    if (state.status === 'done' && prevStatusRef.current !== 'done') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      toolRootRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
    prevStatusRef.current = state.status
  }, [state.status])

  const isEditing = state.status === 'ready' || state.status === 'processing'
  const canAcceptFile = state.status === 'idle' || state.status === 'error'

  const {
    status: dropStatus,
    validationError,
    fileInputRef,
    cameraInputRef,
    containerProps,
    openFilePicker,
    openCamera,
    onInputChange,
  } = useDropZone({ onFile: loadFile, disabled: !canAcceptFile })

  // Re-generate automatically whenever the output format changes on the
  // result screen, so the format switcher feels instant rather than
  // requiring a separate "regenerate" button.
  const prevFormatRef = useRef(outputFormat)
  useEffect(() => {
    if (state.status === 'done' && prevFormatRef.current !== outputFormat) {
      generate()
    }
    prevFormatRef.current = outputFormat
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to outputFormat changes
  }, [outputFormat])

  if (state.status === 'done') {
    return (
      <div ref={toolRootRef} className="scroll-mt-16">
        <ResultPanel
          original={state.original}
          result={state.result}
          outputFormat={outputFormat}
          onFormatChange={setOutputFormat}
          onDownload={() => trackTextOverlayEvent('text_overlay_download', { format: outputFormat })}
          onMakeAnother={makeAnother}
        />
      </div>
    )
  }

  if (isEditing) {
    const original = state.original

    return (
      <div ref={toolRootRef} className="scroll-mt-16 bg-gray-50">
        <div className="mx-auto max-w-2xl space-y-3 px-4 pb-28 pt-3 sm:px-6 sm:pb-8 md:pt-6">
          {/* Live preview — image untouched, footer band shown below it */}
          <FooterPreviewStage
            imageSrc={original.objectUrl}
            nameSettings={nameSettings}
            dateSettings={dateSettings}
            footerSettings={footerSettings}
          />

          <DateSettingsPanel
            settings={dateSettings}
            onChange={updateDateSettings}
            disabled={state.status === 'processing'}
          />

          <NameSettingsPanel
            settings={nameSettings}
            onChange={updateNameSettings}
            disabled={state.status === 'processing'}
          />

          <FooterSettingsPanel
            settings={footerSettings}
            onChange={updateFooterSettings}
            disabled={state.status === 'processing'}
          />
        </div>

        {/* Download button — sticky at the bottom on every viewport so it's always reachable */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="shrink-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={state.status === 'processing'}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.status === 'processing' ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating…
                </>
              ) : (
                'Download'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={toolRootRef} className="scroll-mt-16">
      <TextOverlayDropZone
        status={dropStatus}
        validationError={state.status === 'error' ? null : validationError}
        disabled={!canAcceptFile}
        containerProps={containerProps}
        fileInputRef={fileInputRef}
        cameraInputRef={cameraInputRef}
        onInputChange={onInputChange}
        onOpenFilePicker={openFilePicker}
        onOpenCamera={openCamera}
      />

      {state.status === 'error' && (
        <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6">
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          >
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
            <div>
              <p className="text-sm font-medium text-red-700">{state.message}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-1 text-xs text-red-600 underline underline-offset-2 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

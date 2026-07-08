'use client'

import { useRef, useState } from 'react'
import type { ResultScreenRecommendations } from '@/lib/recommendations/engine'
import { ACCEPTED_EXTENSIONS } from '../../types'
import { useCustomResizer } from '../../hooks/useCustomResizer'
import { useDropZone } from '../../hooks/useDropZone'
import { useScrollToToolOnLoad } from '../../hooks/useScrollToToolOnLoad'
import {
  defaultResizeSettings,
  settingsWithPreset,
  toResizeOperation,
  type ResizeSettings,
} from '../../lib/resize-settings'
import type { AcceptedMimeType } from '../../types'
import { ACCEPTED_MIME_TYPES } from '../../types'
import { DropZone } from '../DropZone'
import { ProcessingOverlay } from '../ProcessingOverlay'
import { ResultPanel } from '../ResultPanel'
import { ResultRecommendations } from '../ResultRecommendations'
import { ResizeEditor } from './ResizeEditor'
import { ResizePresetPicker } from './ResizePresetPicker'

interface Props {
  /** Pre-computed by the server; shown on the result screen. */
  recommendations?: ResultScreenRecommendations
}

function mimeOf(file: File): AcceptedMimeType {
  return ACCEPTED_MIME_TYPES.includes(file.type as AcceptedMimeType)
    ? (file.type as AcceptedMimeType)
    : 'image/jpeg'
}

/**
 * The flagship /image-resizer tool. Reuses the shared upload flow (DropZone,
 * paste, camera), the shared Web Worker, and the shared ResultPanel — only the
 * editor in the middle is new.
 *
 * Flow: upload → editor (dimensions / percentage / mode / format) → worker →
 * result (download / adjust & resize again / replace image).
 */
export function CustomResizeTool({ recommendations }: Props) {
  const { state, loadFile, process, backToEditor, reset } = useCustomResizer()

  // ─── Editor settings ────────────────────────────────────────────────────────
  // Owned here (not in ResizeEditor) so settings survive the ready → processing
  // → done → ready loop ("Adjust & resize again" keeps the user's values).
  //
  // Re-initialized whenever a NEW image arrives, using the adjust-state-during-
  // render pattern (React's recommended alternative to setState-in-effect).
  const original =
    state.status === 'ready' || state.status === 'processing' || state.status === 'done'
      ? state.original
      : null

  const [settings, setSettings] = useState<ResizeSettings | null>(null)
  const [settingsKey, setSettingsKey] = useState<string | null>(null)
  if (original && settingsKey !== original.objectUrl) {
    setSettingsKey(original.objectUrl)
    setSettings(
      defaultResizeSettings(original.width, original.height, mimeOf(original.file)),
    )
  }

  const isInteractive = state.status === 'idle' || state.status === 'error'
  const isProcessing = state.status === 'loading' || state.status === 'processing'
  // Dropping / pasting / picking a new file replaces the current one at any
  // point after upload — no confirmation (Canva/Figma-style).
  const canAcceptFile = isInteractive || state.status === 'ready' || state.status === 'done'

  const {
    status: dropStatus,
    validationError,
    fileInputRef,
    cameraInputRef,
    containerProps,
    openFilePicker,
    openCamera,
    onInputChange,
  } = useDropZone({
    onFile: loadFile,
    disabled: !canAcceptFile,
  })

  // Tool container — scroll anchor with sticky-header compensation via
  // `scroll-mt-16` (site header is h-14 = 56px). Mirrors the other tools.
  const toolRootRef = useRef<HTMLDivElement>(null)
  useScrollToToolOnLoad(toolRootRef)

  const wrap = (children: React.ReactNode) => (
    <div ref={toolRootRef} className="scroll-mt-16" {...containerProps}>
      {children}
    </div>
  )

  // Hidden picker input for states where the DropZone isn't mounted
  // ("Replace image" in ready / done states needs its own input).
  const hiddenPicker = (
    <input
      ref={fileInputRef}
      type="file"
      accept={ACCEPTED_EXTENSIONS}
      className="sr-only"
      aria-hidden="true"
      tabIndex={-1}
      onChange={onInputChange}
    />
  )

  // ─── Done: result → adjust again → recommendations ──────────────────────────

  if (state.status === 'done') {
    return wrap(
      <div>
        <ResultPanel
          original={state.original}
          result={state.result}
          onClear={reset}
          onReplace={openFilePicker}
        />

        {/* Adjust settings & run another resize on the same image */}
        <section
          aria-label="Resize again with different settings"
          className="bg-gray-50 px-4 pb-6 sm:px-6"
        >
          <div className="mx-auto max-w-2xl">
            <button
              type="button"
              onClick={backToEditor}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Adjust settings &amp; resize again
            </button>
          </div>
        </section>

        {recommendations && (
          <ResultRecommendations
            recommendations={recommendations}
            showImageResizerLink={false}
          />
        )}
        <div aria-hidden="true" className="h-8 bg-gray-50 md:h-12" />
        {hiddenPicker}
      </div>,
    )
  }

  // ─── Ready: file card + editor + presets ─────────────────────────────────────

  if ((state.status === 'ready' || state.status === 'processing') && original && settings) {
    const processing = state.status === 'processing'

    return wrap(
      <section
        aria-label="Resize settings"
        className="relative bg-gray-50 px-4 py-3 sm:px-6 md:py-10"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          {/* File info card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center gap-4 px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={original.objectUrl}
                alt="Uploaded image preview"
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {original.file.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {original.width} × {original.height}px
                  <span className="text-muted-foreground/60">
                    {' '}· {original.sizeKB >= 1024
                      ? `${(original.sizeKB / 1024).toFixed(1)} MB`
                      : `${original.sizeKB} KB`}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={openFilePicker}
                  disabled={processing}
                  aria-label="Replace image — choose a different file"
                  className="flex h-8 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={processing}
                  aria-label="Remove image and start over"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Editor — above the fold on mobile */}
          <ResizeEditor
            original={original}
            settings={settings}
            onChange={setSettings}
            onSubmit={() => process(toResizeOperation(settings))}
            disabled={processing}
          />

          {/* Quick presets — selecting one populates the editor immediately */}
          <ResizePresetPicker
            activePresetId={settings.presetId}
            disabled={processing}
            onSelect={preset => setSettings(settingsWithPreset(settings, preset))}
          />
        </div>

        {/* Processing overlay — covers the whole editor area */}
        {processing && (
          <div className="absolute inset-0 z-20 px-4 sm:px-6">
            <div className="mx-auto flex h-full max-w-2xl items-stretch">
              <div className="relative w-full">
                <ProcessingOverlay progress={state.progress} />
              </div>
            </div>
          </div>
        )}
        {hiddenPicker}
      </section>,
    )
  }

  // ─── Idle / loading / error: drop zone ───────────────────────────────────────

  return wrap(
    <div>
      <DropZone
        status={isProcessing ? 'idle' : dropStatus}
        validationError={state.status === 'error' ? null : validationError}
        disabled={!isInteractive}
        containerProps={containerProps}
        fileInputRef={fileInputRef}
        cameraInputRef={cameraInputRef}
        onInputChange={onInputChange}
        onOpenFilePicker={openFilePicker}
        onOpenCamera={openCamera}
      >
        {isProcessing && <ProcessingOverlay progress={0} />}
      </DropZone>

      {state.status === 'error' && (
        <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6">
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true">
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
    </div>,
  )
}

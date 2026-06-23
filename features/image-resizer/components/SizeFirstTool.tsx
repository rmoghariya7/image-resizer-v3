'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CompressPresetKey } from '@/registry/presets/schema'
import { useDropZone } from '../hooks/useDropZone'
import { useSizeFirstResizer } from '../hooks/useSizeFirstResizer'
import { DropZone } from './DropZone'
import { ProcessingOverlay } from './ProcessingOverlay'
import { ResultPanel } from './ResultPanel'
import { SizePresetSelector } from './SizePresetSelector'

interface Props {
  defaultPresetKey: CompressPresetKey
}

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${kb} KB`
}

export function SizeFirstTool({ defaultPresetKey }: Props) {
  const { state, loadFile, process, reset } = useSizeFirstResizer()

  // Tracks which preset the user has chosen in the idle-state selector.
  // Initialized to the page's preset; can be changed before upload.
  const [pendingPreset, setPendingPreset] = useState<CompressPresetKey>(defaultPresetKey)
  // Ref so the auto-process effect always reads the latest value without
  // making pendingPreset a dep that would re-register the effect on every change.
  const pendingPresetRef = useRef<CompressPresetKey>(pendingPreset)
  pendingPresetRef.current = pendingPreset

  // Auto-process: fires once each time a new file finishes loading.
  // 'ready' → call process() → 'processing' → 'done'. No loop risk because
  // process() only runs from 'ready' or 'done' (guard inside the hook), and
  // the effect condition is only true for 'ready'.
  useEffect(() => {
    if (state.status === 'ready') {
      process(pendingPresetRef.current)
    }
  }, [state.status, process])

  const isDroppable = state.status === 'idle' || state.status === 'error'
  const isProcessing = state.status === 'loading' || state.status === 'processing'

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
    disabled: !isDroppable,
  })

  const handleReprocess = useCallback(
    (presetKey: CompressPresetKey) => {
      process(presetKey)
    },
    [process],
  )

  // ─── Done: before/after + download → size picker → reset ────────────────────

  if (state.status === 'done') {
    return (
      <div>
        {/* Priority 1 — Download result */}
        <ResultPanel original={state.original} result={state.result} />

        {/* Priority 2 — Change target size (immediately visible after download) */}
        <section
          aria-label="Choose another target size"
          className="bg-gray-50 px-4 pb-6 sm:px-6"
        >
          <div className="mx-auto max-w-2xl">
            <SizePresetSelector
              activePresetKey={state.activePresetKey}
              currentSizeKB={state.result.sizeKB}
              onSelect={handleReprocess}
              heading="Choose another target size:"
            />
          </div>
        </section>

        {/* Priority 3 — Process a new image (lowest, after size picker) */}
        <div className="bg-gray-50 px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:border-gray-300 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Process another image
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Ready: file info card → size picker ─────────────────────────────────────

  if (state.status === 'ready') {
    return (
      <section
        aria-label="Choose compression target"
        className="bg-gray-50 px-4 py-4 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          {/* File info */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center gap-4 px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.objectUrl}
                alt="Uploaded image preview"
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {state.file.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {formatSize(state.sizeKB)}{' '}
                  <span className="text-muted-foreground/60">
                    · {state.width} × {state.height}px
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Remove image and start over"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
            </div>
          </div>

          {/* Size picker — shown briefly before auto-process fires */}
          <SizePresetSelector
            activePresetKey={pendingPreset}
            currentSizeKB={state.sizeKB}
            onSelect={process}
            heading="Choose target size:"
          />
        </div>
      </section>
    )
  }

  // ─── Processing ──────────────────────────────────────────────────────────────

  if (state.status === 'processing') {
    return (
      <section
        aria-label="Compressing image"
        className="bg-gray-50 px-4 py-4 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-2xl">
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-14 shadow-sm">
            <ProcessingOverlay progress={state.progress} />
          </div>
        </div>
      </section>
    )
  }

  // ─── Idle / error — drop zone + preset selector ──────────────────────────────

  return (
    <>
      <DropZone
        status={isProcessing ? 'idle' : dropStatus}
        validationError={state.status === 'error' ? null : validationError}
        disabled={!isDroppable}
        containerProps={containerProps}
        fileInputRef={fileInputRef}
        cameraInputRef={cameraInputRef}
        onInputChange={onInputChange}
        onOpenFilePicker={openFilePicker}
        onOpenCamera={openCamera}
      >
        {isProcessing && <ProcessingOverlay progress={0} />}
      </DropZone>

      {/* Preset selector — lets users change target before uploading */}
      <div className="bg-gray-50 px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <SizePresetSelector
            activePresetKey={pendingPreset}
            onSelect={setPendingPreset}
            heading="Target size:"
          />
        </div>
      </div>

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
                className="mt-1 text-xs text-red-600 underline underline-offset-2 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

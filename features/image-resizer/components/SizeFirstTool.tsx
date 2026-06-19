'use client'

import { useCallback } from 'react'
import type { CompressPresetKey } from '@/registry/presets/schema'
import { QUICK_ACTION_SIZES } from '@/registry/size-presets'
import { useDropZone } from '../hooks/useDropZone'
import { useSizeFirstResizer } from '../hooks/useSizeFirstResizer'
import { DropZone } from './DropZone'
import { ProcessingOverlay } from './ProcessingOverlay'
import { ResultPanel } from './ResultPanel'

interface Props {
  defaultPresetKey: CompressPresetKey
}

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${kb} KB`
}

export function SizeFirstTool({ defaultPresetKey }: Props) {
  const { state, loadFile, process, reset } = useSizeFirstResizer()

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

  // From done state, process again with a different target
  const handleReprocess = useCallback(
    (presetKey: CompressPresetKey) => {
      process(presetKey)
    },
    [process],
  )

  // ─── Done state ──────────────────────────────────────────────────────────────

  if (state.status === 'done') {
    const compressFurtherSizes = QUICK_ACTION_SIZES.filter(
      t => t.targetKB < state.result.sizeKB && t.id !== state.activePresetKey,
    ).slice(0, 3)

    return (
      <div>
        <ResultPanel original={state.original} result={state.result} onReset={reset} />

        {/* Compress further section */}
        {compressFurtherSizes.length > 0 && (
          <section
            aria-labelledby="compress-further-heading"
            className="bg-muted/30 px-4 py-8 sm:px-6"
          >
            <div className="mx-auto max-w-2xl">
              <p
                id="compress-further-heading"
                className="mb-3 text-sm font-semibold text-foreground"
              >
                Compress further:
              </p>
              <div className="flex flex-wrap gap-2">
                {compressFurtherSizes.map(target => (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() => handleReprocess(target.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                  >
                    Under {target.displaySize}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    )
  }

  // ─── Ready state — file loaded, picking target size ──────────────────────────

  if (state.status === 'ready') {
    return (
      <section aria-label="Choose compression target" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            {/* File info */}
            <div className="flex items-center gap-4 border-b border-border px-5 py-4">
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
                  Current size:{' '}
                  <span className="font-semibold text-foreground">
                    {formatSize(state.sizeKB)}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {state.width} × {state.height}px
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Remove image and start over"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Size picker */}
            <div className="px-5 py-5">
              <p className="mb-3 text-sm font-semibold text-foreground">
                Choose target size:
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {QUICK_ACTION_SIZES.map(target => {
                  const isDefault = target.id === defaultPresetKey
                  return (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => process(target.id)}
                      className={[
                        'flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-colors',
                        isDefault
                          ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50',
                      ].join(' ')}
                    >
                      <span className="text-base font-bold leading-none">
                        {target.targetKB >= 1024
                          ? `${target.targetKB / 1024}MB`
                          : `${target.targetKB}KB`}
                      </span>
                      {isDefault && (
                        <span className="mt-1 text-[9px] font-semibold uppercase tracking-wide opacity-70">
                          This page
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                The tool automatically finds the highest quality that fits your target size.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── Processing state ────────────────────────────────────────────────────────

  if (state.status === 'processing') {
    return (
      <section aria-label="Compressing image" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-14 shadow-sm">
            <ProcessingOverlay progress={state.progress} />
          </div>
        </div>
      </section>
    )
  }

  // ─── Idle / error state — show dropzone ──────────────────────────────────────

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

      {state.status === 'error' && (
        <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6">
          <div role="alert" aria-live="assertive" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-700">{state.message}</p>
              <button type="button" onClick={reset} className="mt-1 text-xs text-red-600 underline underline-offset-2 hover:text-red-500">
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

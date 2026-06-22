'use client'

import type { Preset } from '@/types/registry'
import type { ResultScreenRecommendations } from '@/lib/recommendations/engine'
import { useImageResizer } from '../hooks/useImageResizer'
import { useDropZone } from '../hooks/useDropZone'
import { DropZone } from './DropZone'
import { ProcessingOverlay } from './ProcessingOverlay'
import { ResultPanel } from './ResultPanel'
import { ResultRecommendations } from './ResultRecommendations'

interface Props {
  preset: Preset
  /** Pre-computed by the server; determines what links appear after compression. */
  recommendations?: ResultScreenRecommendations
}

export function ImageResizerTool({ preset, recommendations }: Props) {
  const { state, processFile, reset } = useImageResizer(preset)

  const isInteractive = state.status === 'idle' || state.status === 'error'
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
    onFile: processFile,
    disabled: !isInteractive,
  })

  if (state.status === 'done') {
    return (
      <div>
        <ResultPanel original={state.original} result={state.result} />
        {recommendations && (
          <ResultRecommendations recommendations={recommendations} />
        )}
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

  return (
    <>
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
        {isProcessing && (
          <ProcessingOverlay
            progress={state.status === 'loading' ? 0 : state.progress}
          />
        )}
      </DropZone>

      {/* Processing error */}
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
    </>
  )
}

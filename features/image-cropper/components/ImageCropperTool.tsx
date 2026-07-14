'use client'

import { useRef } from 'react'
import { CUSTOM_RATIO_SENTINEL_ID } from '@/registry/crop-presets'
import { useImageCropper } from '../hooks/useImageCropper'
import { useDropZone } from '../hooks/useDropZone'
import { useScrollToToolOnLoad } from '../hooks/useScrollToToolOnLoad'
import { trackCropEvent } from '../lib/analytics'
import { CropDropZone } from './CropDropZone'
import { PresetPicker } from './PresetPicker'
import { CropStage } from './CropStage'
import { AdvancedPanel } from './AdvancedPanel'
import { CropResultPanel } from './CropResultPanel'

/**
 * Orchestrates the full crop workflow: Upload → Choose preset → Adjust crop →
 * Crop → Download, in at most 4 interactions (CLAUDE.md core philosophy).
 */
export function ImageCropperTool() {
  const {
    state,
    presetId,
    effectiveAspect,
    transform,
    customRatioInput,
    outputFormat,
    loadFile,
    selectPreset,
    setCustomRatioInput,
    setOutputFormat,
    updateTransform,
    onCropComplete,
    crop,
    reset,
    cropAnother,
  } = useImageCropper()

  const toolRootRef = useRef<HTMLDivElement>(null)
  useScrollToToolOnLoad(toolRootRef)

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

  if (state.status === 'done') {
    return (
      <div ref={toolRootRef} className="scroll-mt-16">
        <CropResultPanel
          original={state.original}
          result={state.result}
          onDownload={() => trackCropEvent('crop_image_download', { preset: presetId })}
          onCropAnother={cropAnother}
        />
      </div>
    )
  }

  if (isEditing) {
    const original = state.original
    const resolvedAspect = effectiveAspect ?? original.width / original.height

    return (
      <div ref={toolRootRef} className="scroll-mt-16 bg-gray-50">
        <div className="mx-auto max-w-2xl space-y-3 px-4 pb-28 pt-3 sm:px-6 sm:pb-8 md:pt-6">
          <PresetPicker presetId={presetId} onSelect={selectPreset} disabled={state.status === 'processing'} />

          {presetId === CUSTOM_RATIO_SENTINEL_ID && (
            <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 shadow-sm">
              <label htmlFor="custom-ratio" className="text-xs font-medium text-foreground">
                Ratio (W:H)
              </label>
              <input
                id="custom-ratio"
                type="text"
                inputMode="decimal"
                placeholder="e.g. 5:7"
                value={customRatioInput}
                onChange={(e) => setCustomRatioInput(e.target.value)}
                disabled={state.status === 'processing'}
                className="w-24 rounded-lg border border-border px-2.5 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
              />
            </div>
          )}

          <CropStage
            imageSrc={original.objectUrl}
            aspect={resolvedAspect}
            transform={transform}
            onCropChange={(crop) => updateTransform({ crop })}
            onZoomChange={(zoom) => updateTransform({ zoom })}
            onCropComplete={onCropComplete}
            onReset={() =>
              updateTransform({ crop: { x: 0, y: 0 }, zoom: 1, rotation: 0, flipHorizontal: false, flipVertical: false })
            }
            disabled={state.status === 'processing'}
          />

          <AdvancedPanel
            transform={transform}
            outputFormat={outputFormat}
            onRotationChange={(rotation) => updateTransform({ rotation })}
            onFlipHorizontalToggle={() => updateTransform({ flipHorizontal: !transform.flipHorizontal })}
            onFlipVerticalToggle={() => updateTransform({ flipVertical: !transform.flipVertical })}
            onFormatChange={setOutputFormat}
            onUseCustomRatio={() => selectPreset(CUSTOM_RATIO_SENTINEL_ID)}
            disabled={state.status === 'processing'}
          />
        </div>

        {/* Crop button — sticky at the bottom on every viewport so it's always reachable */}
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
              onClick={crop}
              disabled={state.status === 'processing'}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.status === 'processing' ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Cropping…
                </>
              ) : (
                'Crop image'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={toolRootRef} className="scroll-mt-16">
      <CropDropZone
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

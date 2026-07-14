'use client'

import { useEffect, useRef, useState } from 'react'
import type { ImagePreset, OutputFormat } from '@/registry/presets/schema'
import { useDropZone } from '../hooks/useDropZone'
import { useScrollToToolOnLoad } from '../hooks/useScrollToToolOnLoad'
import { useImageResizer } from '../hooks/useImageResizer'
import { DropZone } from './DropZone'
import { ProcessingOverlay } from './ProcessingOverlay'
import { ResultPanel } from './ResultPanel'
import { buildCustomPreset, readImageDimensions, scaleToAspect } from '../lib/custom-preset'

export type CustomResizeMode = 'resize' | 'convert'

interface Props {
  mode: CustomResizeMode
}

const QUICK_SIZES = [
  { label: 'HD', width: 1920, height: 1080 },
  { label: 'Square', width: 1080, height: 1080 },
  { label: 'Portrait', width: 1080, height: 1350 },
  { label: '4K', width: 3840, height: 2160 },
]

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WEBP' },
]

type Phase =
  | { kind: 'upload' }
  | {
      kind: 'configure'
      file: File
      objectUrl: string
      naturalWidth: number
      naturalHeight: number
      sizeKB: number
    }
  | { kind: 'process'; file: File; preset: ImagePreset }
  | { kind: 'error'; message: string }

function fmtKB(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${Math.round(kb)} KB`
}

/**
 * Standalone Core Tool used by /resize-image ("Resize Image" + "Custom
 * Resize" Quick Actions) and /convert-image ("Convert Image"). Both share
 * one component because they're the same underlying operation — resize to
 * exact pixels vs. resize to the image's own pixels (i.e. no-op resize, just
 * a format change) — and both reuse the existing image-resizer Web Worker
 * pipeline unchanged via a runtime-built preset (see lib/custom-preset.ts).
 *
 * Two-phase flow: the image's natural dimensions are read client-side
 * BEFORE the preset is built and handed to useImageResizer, so /convert-image
 * can lock the output to "exactly the original size" with no race between
 * reading dimensions and starting the worker.
 */
export function CustomResizeTool({ mode }: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: 'upload' })
  const [width, setWidth] = useState(1920)
  const [height, setHeight] = useState(1080)
  const [lockAspect, setLockAspect] = useState(true)
  const [format, setFormat] = useState<OutputFormat>('jpeg')
  const [quality, setQuality] = useState(90)

  const toolRootRef = useRef<HTMLDivElement>(null)
  useScrollToToolOnLoad(toolRootRef)

  const canAcceptFile = phase.kind === 'upload' || phase.kind === 'error'

  const handleFile = async (file: File) => {
    try {
      const { width: naturalWidth, height: naturalHeight } = await readImageDimensions(file)
      const objectUrl = URL.createObjectURL(file)
      setWidth(naturalWidth)
      setHeight(naturalHeight)
      setPhase({
        kind: 'configure',
        file,
        objectUrl,
        naturalWidth,
        naturalHeight,
        sizeKB: Math.round((file.size / 1024) * 10) / 10,
      })
    } catch (err) {
      setPhase({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Could not read this image.',
      })
    }
  }

  const {
    status: dropStatus,
    validationError,
    fileInputRef,
    cameraInputRef,
    containerProps,
    openFilePicker,
    openCamera,
    onInputChange,
  } = useDropZone({ onFile: handleFile, disabled: !canAcceptFile })

  function reset() {
    if (phase.kind === 'configure') URL.revokeObjectURL(phase.objectUrl)
    setPhase({ kind: 'upload' })
  }

  function startProcessing() {
    if (phase.kind !== 'configure') return
    const preset =
      mode === 'convert'
        ? buildCustomPreset({
            widthPx: phase.naturalWidth,
            heightPx: phase.naturalHeight,
            format,
            quality,
          })
        : buildCustomPreset({ widthPx: width, heightPx: height, format, quality, aspectRatioLock: lockAspect })
    setPhase({ kind: 'process', file: phase.file, preset })
  }

  if (phase.kind === 'process') {
    return (
      <div ref={toolRootRef} className="scroll-mt-16">
        <ProcessingEngine file={phase.file} preset={phase.preset} onReset={reset} />
      </div>
    )
  }

  if (phase.kind === 'configure') {
    return (
      <div ref={toolRootRef} className="scroll-mt-16 bg-gray-50 px-4 py-3 sm:px-6 md:py-10">
        <div className="mx-auto max-w-2xl space-y-3">
          {/* File info */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center gap-4 px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phase.objectUrl}
                alt="Uploaded image preview"
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{phase.file.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {fmtKB(phase.sizeKB)}{' '}
                  <span className="text-muted-foreground/60">
                    · {phase.naturalWidth} × {phase.naturalHeight}px
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Remove image and start over"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Resize mode: dimensions */}
          {mode === 'resize' && (
            <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
              <p className="mb-3 text-sm font-semibold text-foreground">Dimensions</p>

              <div className="mb-3 flex flex-wrap gap-2">
                {QUICK_SIZES.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => {
                      setWidth(q.width)
                      setHeight(q.height)
                    }}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                  >
                    {q.label} · {q.width}×{q.height}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-3">
                <label className="flex-1 text-xs font-medium text-muted-foreground">
                  Width (px)
                  <input
                    type="number"
                    min={1}
                    max={8000}
                    value={width}
                    onChange={(e) => {
                      const next = Number(e.target.value)
                      if (lockAspect) {
                        const scaled = scaleToAspect(phase.naturalWidth, phase.naturalHeight, 'width', next)
                        setWidth(scaled.width)
                        setHeight(scaled.height)
                      } else {
                        setWidth(next)
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </label>
                <button
                  type="button"
                  aria-pressed={lockAspect}
                  aria-label="Lock aspect ratio"
                  onClick={() => setLockAspect((v) => !v)}
                  className={`mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    lockAspect ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted/60'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    {lockAspect ? (
                      <path d="M12 15v2m-6-6V7a6 6 0 0 1 12 0v4M6 11h12v9H6z" />
                    ) : (
                      <path d="M12 15v2M8 11V7a4 4 0 0 1 8 0M6 11h12v9H6z" />
                    )}
                  </svg>
                </button>
                <label className="flex-1 text-xs font-medium text-muted-foreground">
                  Height (px)
                  <input
                    type="number"
                    min={1}
                    max={8000}
                    value={height}
                    onChange={(e) => {
                      const next = Number(e.target.value)
                      if (lockAspect) {
                        const scaled = scaleToAspect(phase.naturalWidth, phase.naturalHeight, 'height', next)
                        setWidth(scaled.width)
                        setHeight(scaled.height)
                      } else {
                        setHeight(next)
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </label>
              </div>
            </div>
          )}

          {mode === 'convert' && (
            <div className="rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground shadow-sm sm:p-5">
              Output stays at the original <span className="font-semibold text-foreground">{phase.naturalWidth} × {phase.naturalHeight}px</span> — only the file format changes below.
            </div>
          )}

          {/* Format + quality — shared by both modes */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-2 text-sm font-semibold text-foreground">Output format</p>
            <div className="mb-4 flex gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={format === f.value}
                  onClick={() => setFormat(f.value)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    format === f.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted/60'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {format !== 'png' && (
              <>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Quality</p>
                  <span className="text-xs tabular-nums text-muted-foreground">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                  aria-label="Output quality"
                />
              </>
            )}
          </div>

          <button
            type="button"
            onClick={startProcessing}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {mode === 'convert' ? `Convert to ${format.toUpperCase()}` : 'Resize image'}
          </button>
        </div>
      </div>
    )
  }

  // ─── Upload / error ───────────────────────────────────────────────────────
  return (
    <div ref={toolRootRef} className="scroll-mt-16">
      <DropZone
        status={dropStatus}
        validationError={phase.kind === 'error' ? null : validationError}
        disabled={!canAcceptFile}
        containerProps={containerProps}
        fileInputRef={fileInputRef}
        cameraInputRef={cameraInputRef}
        onInputChange={onInputChange}
        onOpenFilePicker={openFilePicker}
        onOpenCamera={openCamera}
      />

      {phase.kind === 'error' && (
        <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6">
          <div role="alert" aria-live="assertive" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{phase.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Processing engine — mounted only once width/height/format are fully resolved ───

function ProcessingEngine({
  file,
  preset,
  onReset,
}: {
  file: File
  preset: ImagePreset
  onReset: () => void
}) {
  const { state, processFile, reset } = useImageResizer(preset)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    void processFile(file)
  }, [file, processFile])

  if (state.status === 'done') {
    return (
      <>
        <ResultPanel
          original={state.original}
          result={state.result}
          onClear={() => {
            reset()
            onReset()
          }}
        />
        <div aria-hidden="true" className="h-8 bg-gray-50 md:h-12" />
      </>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6 sm:pt-10">
        <div role="alert" aria-live="assertive" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-red-700">{state.message}</p>
            <button
              type="button"
              onClick={onReset}
              className="mt-1 text-xs text-red-600 underline underline-offset-2 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section aria-label="Processing image" className="bg-gray-50 px-4 py-3 sm:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="relative flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-14 shadow-sm">
          <ProcessingOverlay progress={state.status === 'processing' ? state.progress : 0} />
        </div>
      </div>
    </section>
  )
}

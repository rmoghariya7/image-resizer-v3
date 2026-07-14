'use client'

import { FlipHorizontal2, FlipVertical2 } from 'lucide-react'
import type { CropOutputFormat } from '@/registry/crop-presets'
import type { CropTransform } from '../types'

interface Props {
  transform: CropTransform
  outputFormat: CropOutputFormat
  onRotationChange: (rotation: number) => void
  onFlipHorizontalToggle: () => void
  onFlipVerticalToggle: () => void
  onFormatChange: (format: CropOutputFormat) => void
  onUseCustomRatio: () => void
  disabled?: boolean
}

const FORMATS: { value: CropOutputFormat; label: string }[] = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WEBP' },
]

/**
 * Collapsed-by-default advanced controls. The tool must feel approachable on
 * first load (CLAUDE.md: "Do NOT overwhelm users. Hide advanced controls.") —
 * everything here is one tap away via the <details> summary, never shown
 * up front.
 */
export function AdvancedPanel({
  transform,
  outputFormat,
  onRotationChange,
  onFlipHorizontalToggle,
  onFlipVerticalToggle,
  onFormatChange,
  onUseCustomRatio,
  disabled = false,
}: Props) {
  return (
    <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-foreground marker:content-none sm:px-5">
        Advanced options
        <span
          aria-hidden="true"
          className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </summary>

      <div className="space-y-5 border-t border-border/60 px-4 py-4 sm:px-5">
        {/* Rotation */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="crop-rotation" className="text-xs font-medium text-foreground">
              Rotation
            </label>
            <span className="text-xs tabular-nums text-muted-foreground">{transform.rotation}°</span>
          </div>
          <input
            id="crop-rotation"
            type="range"
            min={-180}
            max={180}
            step={1}
            value={transform.rotation}
            disabled={disabled}
            onChange={(e) => onRotationChange(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="mt-2 flex gap-2">
            {[-90, 0, 90].map((deg) => (
              <button
                key={deg}
                type="button"
                disabled={disabled}
                onClick={() => onRotationChange(deg)}
                className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                {deg === 0 ? 'Straighten' : `${deg > 0 ? '+' : ''}${deg}°`}
              </button>
            ))}
          </div>
        </div>

        {/* Flip */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">Flip</p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={disabled}
              aria-pressed={transform.flipHorizontal}
              onClick={onFlipHorizontalToggle}
              className={[
                'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
                transform.flipHorizontal
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              ].join(' ')}
            >
              <FlipHorizontal2 size={13} aria-hidden="true" />
              Horizontal
            </button>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={transform.flipVertical}
              onClick={onFlipVerticalToggle}
              className={[
                'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
                transform.flipVertical
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              ].join(' ')}
            >
              <FlipVertical2 size={13} aria-hidden="true" />
              Vertical
            </button>
          </div>
        </div>

        {/* Custom aspect ratio shortcut */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">Aspect ratio</p>
          <button
            type="button"
            disabled={disabled}
            onClick={onUseCustomRatio}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            Use a custom ratio…
          </button>
        </div>

        {/* Output format */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">Output format</p>
          <div role="radiogroup" aria-label="Output format" className="flex gap-2">
            {FORMATS.map((f) => (
              <button
                key={f.value}
                type="button"
                role="radio"
                aria-checked={outputFormat === f.value}
                disabled={disabled}
                onClick={() => onFormatChange(f.value)}
                className={[
                  'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
                  outputFormat === f.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </details>
  )
}

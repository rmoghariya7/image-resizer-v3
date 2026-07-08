'use client'

import { useState } from 'react'
import {
  RESIZE_PRESET_CATEGORIES,
  getResizePresetsByCategory,
  type ResizePreset,
  type ResizePresetCategory,
} from '@/registry/resize-presets'

interface Props {
  activePresetId: string | null
  onSelect: (preset: ResizePreset) => void
  disabled?: boolean
}

/**
 * Categorized quick-preset cards (Government / Social / Developer / Desktop).
 * Selecting a preset populates the dimension editor immediately.
 *
 * Mobile-first: category tabs + a 2-column grid — no horizontal scrolling,
 * every chip is a ≥44px touch target. 3 columns on sm+.
 */
export function ResizePresetPicker({ activePresetId, onSelect, disabled = false }: Props) {
  const [category, setCategory] = useState<ResizePresetCategory>('government')
  const presets = getResizePresetsByCategory(category)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="px-4 py-4 md:px-5 md:py-5">
        <p className="mb-2 text-sm font-semibold text-foreground md:mb-3">
          Quick presets:
        </p>

        {/* Category tabs */}
        <div
          role="group"
          aria-label="Preset category"
          className="mb-3 grid grid-cols-4 gap-1 rounded-xl border border-border bg-muted/40 p-1"
        >
          {RESIZE_PRESET_CATEGORIES.map(cat => {
            const isActive = cat.id === category
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                disabled={disabled}
                aria-pressed={isActive}
                className={[
                  'rounded-lg px-1 py-2 text-xs font-semibold transition-colors md:text-sm',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  'disabled:pointer-events-none disabled:opacity-50',
                  isActive
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Preset grid — 2 cols mobile, 3 cols sm+; no horizontal scrolling */}
        <div role="group" aria-label={`${category} size presets`} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {presets.map(preset => {
            const isActive = preset.id === activePresetId
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelect(preset)}
                disabled={disabled}
                aria-pressed={isActive}
                aria-label={`${preset.label} — ${preset.width} by ${preset.height} pixels${isActive ? ' (selected)' : ''}`}
                className={[
                  'flex min-h-11 flex-col items-start justify-center rounded-xl border px-3 py-2 text-left transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  'disabled:pointer-events-none disabled:opacity-50',
                  isActive
                    ? 'border-primary bg-primary/10 text-primary shadow-sm inset-ring-1 inset-ring-primary'
                    : 'border-border text-foreground hover:border-primary/50 hover:bg-muted/50',
                ].join(' ')}
              >
                <span className="text-sm font-semibold leading-tight">
                  {preset.label}
                </span>
                <span
                  className={[
                    'mt-0.5 font-mono text-[11px] leading-tight',
                    isActive ? 'text-primary/80' : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {preset.width} × {preset.height}px · {preset.hint}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

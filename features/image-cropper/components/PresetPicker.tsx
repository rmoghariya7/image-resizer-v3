'use client'

import { useState } from 'react'
import {
  CROP_CATEGORIES,
  CROP_CATEGORY_LABELS,
  CUSTOM_RATIO_SENTINEL_ID,
  getCropPreset,
  getCropPresetsByCategory,
  type CropCategory,
} from '@/registry/crop-presets'

interface Props {
  presetId: string
  onSelect: (id: string) => void
  disabled?: boolean
}

const CATEGORY_ICON: Record<CropCategory, string> = {
  government: '🏛️',
  social: '📱',
  developer: '💻',
  custom: '✂️',
}

function resolveCategory(presetId: string): CropCategory {
  if (presetId === CUSTOM_RATIO_SENTINEL_ID) return 'custom'
  return getCropPreset(presetId)?.category ?? 'government'
}

/**
 * Preset browser: a Government / Social Media / Developer / Custom tab bar,
 * plus a chip grid for whichever category is active. Browsing a tab does not
 * change the applied preset until a chip is tapped — only the Custom tab
 * additionally exposes the raw aspect-ratio input, kept out of every other
 * category per the "no technical controls first" rule in CLAUDE.md.
 */
export function PresetPicker({ presetId, onSelect, disabled = false }: Props) {
  const [activeCategory, setActiveCategory] = useState<CropCategory>(() =>
    resolveCategory(presetId),
  )

  const presets = getCropPresetsByCategory(activeCategory)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Category tabs */}
      <div
        role="tablist"
        aria-label="Preset category"
        className="flex gap-1 overflow-x-auto border-b border-border/60 px-2 py-2 sm:px-3"
      >
        {CROP_CATEGORIES.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={disabled}
              onClick={() => setActiveCategory(category)}
              className={[
                'shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                'disabled:pointer-events-none disabled:opacity-50',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              ].join(' ')}
            >
              <span aria-hidden="true" className="mr-1.5">
                {CATEGORY_ICON[category]}
              </span>
              {CROP_CATEGORY_LABELS[category]}
            </button>
          )
        })}
      </div>

      {/* Preset chips for the active category */}
      <div className="px-4 py-4 sm:px-5">
        <div
          role="group"
          aria-label={`${CROP_CATEGORY_LABELS[activeCategory]} crop presets`}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {presets.map((preset) => {
            const isActive = preset.id === presetId
            return (
              <button
                key={preset.id}
                type="button"
                disabled={disabled}
                aria-pressed={isActive}
                onClick={() => onSelect(preset.id)}
                className={[
                  'relative flex min-h-16 flex-col items-start justify-center gap-0.5 rounded-xl border px-3 py-2 text-left transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  'disabled:pointer-events-none disabled:opacity-50',
                  isActive
                    ? 'border-primary bg-primary/10 text-primary shadow-sm inset-ring-1 inset-ring-primary'
                    : 'border-border text-foreground hover:border-primary/50 hover:bg-muted/50',
                ].join(' ')}
              >
                <span className="text-sm font-semibold leading-tight">{preset.name}</span>
                <span className="text-[11px] leading-tight text-muted-foreground">
                  {preset.description}
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-2 w-2 text-primary-foreground"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            )
          })}

          {/* Custom category only: switch into "type your own ratio" mode */}
          {activeCategory === 'custom' && (
            <button
              type="button"
              disabled={disabled}
              aria-pressed={presetId === CUSTOM_RATIO_SENTINEL_ID}
              onClick={() => onSelect(CUSTOM_RATIO_SENTINEL_ID)}
              className={[
                'relative flex min-h-16 flex-col items-start justify-center gap-0.5 rounded-xl border px-3 py-2 text-left transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                'disabled:pointer-events-none disabled:opacity-50',
                presetId === CUSTOM_RATIO_SENTINEL_ID
                  ? 'border-primary bg-primary/10 text-primary shadow-sm inset-ring-1 inset-ring-primary'
                  : 'border-border text-foreground hover:border-primary/50 hover:bg-muted/50',
              ].join(' ')}
            >
              <span className="text-sm font-semibold leading-tight">Custom ratio</span>
              <span className="text-[11px] leading-tight text-muted-foreground">Type your own W:H</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

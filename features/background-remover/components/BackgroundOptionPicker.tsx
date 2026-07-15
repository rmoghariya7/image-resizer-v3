'use client'

import { useState } from 'react'
import type { BackgroundChoice } from '../types'

interface Props {
  selected: BackgroundChoice
  onSelect: (choice: BackgroundChoice) => void
  disabled?: boolean
}

const DEFAULT_COLOR = '#3b82f6'

const OPTIONS = [
  {
    key: 'transparent' as const,
    label: 'Transparent',
    tagline: 'PNG',
    swatch: 'bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-size-[10px_10px]',
  },
  {
    key: 'white' as const,
    label: 'White',
    tagline: 'JPG',
    swatch: 'bg-white',
  },
  {
    key: 'color' as const,
    label: 'Custom color',
    tagline: 'JPG',
    swatch: null, // rendered dynamically from the chosen hex
  },
]

export function BackgroundOptionPicker({ selected, onSelect, disabled = false }: Props) {
  // Remembers the last custom color even while "Transparent" or "White" is
  // active, so re-selecting "Custom color" doesn't reset the picker.
  const [customColor, setCustomColor] = useState(
    selected.kind === 'color' ? selected.hex : DEFAULT_COLOR,
  )

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-foreground md:mb-2">Output background:</p>
      <div role="group" aria-label="Output background" className="grid grid-cols-3 gap-2">
        {OPTIONS.map(option => {
          const isActive = option.key === selected.kind
          const swatchClass = option.key === 'color' ? undefined : option.swatch

          return (
            <button
              key={option.key}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (option.key === 'color') {
                  onSelect({ kind: 'color', hex: customColor })
                } else {
                  onSelect({ kind: option.key })
                }
              }}
              aria-pressed={isActive}
              aria-label={`${option.label} background — output as ${option.tagline}${isActive ? ' (selected)' : ''}`}
              className={[
                'relative flex min-h-11 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-center transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                'disabled:pointer-events-none disabled:opacity-50',
                isActive
                  ? 'border-primary bg-primary/10 shadow-sm inset-ring-1 inset-ring-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50',
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                className={[
                  'h-5 w-5 rounded-full border border-black/10',
                  swatchClass ?? '',
                ].join(' ')}
                style={option.key === 'color' ? { backgroundColor: customColor } : undefined}
              />
              <span className={['text-xs font-semibold', isActive ? 'text-primary' : 'text-foreground'].join(' ')}>
                {option.label}
              </span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary"
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
      </div>

      {selected.kind === 'color' && (
        <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Pick a color:</span>
          <input
            type="color"
            value={customColor}
            disabled={disabled}
            onChange={(e) => {
              setCustomColor(e.target.value)
              onSelect({ kind: 'color', hex: e.target.value })
            }}
            aria-label="Custom background color"
            className="h-7 w-10 cursor-pointer rounded border border-border bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span className="font-mono uppercase">{customColor}</span>
        </label>
      )}
    </div>
  )
}

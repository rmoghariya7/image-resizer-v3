'use client'

import { OUTPUT_FORMATS, type OutputFormat } from '../types'

interface Props {
  selected: OutputFormat
  onSelect: (format: OutputFormat) => void
  disabled?: boolean
}

/**
 * Output format cards (Presetly card pattern — no radio buttons).
 *
 * Layout:
 * - Mobile (<768px): 3-column grid → all five formats in two compact rows,
 *   no horizontal scrolling, ≥44px touch targets.
 * - Desktop (md+): single 5-column row with the extra detail line.
 *
 * Selected state matches SizePresetSelector: primary border + tint via an
 * inset ring (no layout shift) + absolutely-positioned corner checkmark.
 */
export function FormatSelector({ selected, onSelect, disabled = false }: Props) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-foreground md:mb-2">Output format:</p>
      <div
        role="group"
        aria-label="Output format"
        className="grid grid-cols-3 gap-2 md:grid-cols-5"
      >
        {OUTPUT_FORMATS.map(format => {
          const isActive = format.key === selected
          return (
            <button
              key={format.key}
              type="button"
              onClick={() => onSelect(format.key)}
              disabled={disabled}
              aria-pressed={isActive}
              aria-label={`${format.label} — ${format.tagline}${isActive ? ' (selected)' : ''}`}
              className={[
                'relative flex min-h-11 flex-col items-center justify-center rounded-xl border px-1 py-2 text-center transition-colors',
                'md:px-2 md:py-3',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                'disabled:pointer-events-none disabled:opacity-50',
                isActive
                  ? 'border-primary bg-primary/10 shadow-sm inset-ring-1 inset-ring-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50',
              ].join(' ')}
            >
              {/* Mobile: emoji + name on one line to keep the two card rows
                  short enough for the 320px above-the-fold rule. Desktop: stacked. */}
              <span className="flex items-center gap-1 md:flex-col md:gap-0">
                <span aria-hidden="true" className="text-sm leading-none md:text-lg">
                  {format.icon}
                </span>
                <span
                  className={[
                    'text-sm font-bold leading-none md:mt-1',
                    isActive ? 'text-primary' : 'text-foreground',
                  ].join(' ')}
                >
                  {format.label}
                </span>
              </span>
              <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground md:mt-1 md:text-xs">
                {format.tagline}
              </span>
              {/* Second detail line — desktop only, keeps mobile rows short */}
              <span className="hidden text-[10px] leading-tight text-muted-foreground/70 md:block md:text-xs">
                {format.detail}
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
    </div>
  )
}

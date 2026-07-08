'use client'

import type { CompressPresetKey } from '@/registry/presets/schema'
import { QUICK_ACTION_SIZES } from '@/registry/size-presets'

interface Props {
  /** The currently active (selected or most-recently-processed) preset. */
  activePresetKey: CompressPresetKey
  /**
   * File size to show as "Current size: X KB" context label.
   * Omit (or leave undefined) to hide the label — e.g. before any file is uploaded.
   */
  currentSizeKB?: number
  onSelect: (key: CompressPresetKey) => void
  /** Section heading — defaults to "Choose target size:" */
  heading?: string
  /** Disable all buttons while processing. */
  disabled?: boolean
}

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${kb} KB`
}

// Mobile column count: enough columns to fit every preset in exactly two
// balanced rows, however many presets exist. 6 presets → 3×2, 8 → 4×2, etc.
// New presets added to QUICK_ACTION_SIZES adapt automatically.
const MOBILE_COLS = Math.ceil(QUICK_ACTION_SIZES.length / 2)

/**
 * Reusable set of compression size target buttons. Renders as a self-contained
 * white card and can be dropped into any gray-background section.
 *
 * Layout is responsive:
 * - Mobile (<768px): a two-row CSS grid — every preset visible at once, no
 *   horizontal scrolling, equal-width equal-height chips (≥44px touch targets).
 * - Desktop (md+): the original 6-column grid — unchanged.
 *
 * Used in both the pre-processing (ready) state and post-processing (done) state
 * so that adding a new preset automatically updates both locations.
 */
export function SizePresetSelector({
  activePresetKey,
  currentSizeKB,
  onSelect,
  heading = 'Choose target size:',
  disabled = false,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="px-4 py-4 md:px-5 md:py-5">
        {/* Context label — only shown when a file is loaded */}
        {currentSizeKB !== undefined && (
          <p className="mb-0.5 text-sm text-muted-foreground">
            Current size:{' '}
            <span className="font-semibold text-foreground">
              {formatSize(currentSizeKB)}
            </span>
          </p>
        )}

        {/* Section heading */}
        <p className="mb-2 text-sm font-semibold text-foreground md:mb-4">
          {heading}
        </p>

        {/* Size targets — two-row grid on mobile, 6-col grid on md+.
            --preset-cols is consumed by the mobile grid-cols arbitrary value;
            md:grid-cols-6 overrides it so desktop is untouched. */}
        <div
          role="group"
          aria-label={heading}
          style={{ '--preset-cols': MOBILE_COLS } as React.CSSProperties}
          className="grid grid-cols-[repeat(var(--preset-cols),minmax(0,1fr))] gap-2 md:grid-cols-6"
        >
          {QUICK_ACTION_SIZES.map(target => {
            const isActive = target.id === activePresetKey
            return (
              <button
                key={target.id}
                type="button"
                onClick={() => onSelect(target.id)}
                disabled={disabled}
                aria-pressed={isActive}
                aria-label={`Compress to ${target.displaySize}${isActive ? ' (current)' : ''}`}
                className={[
                  // Equal-size cell on every breakpoint: min-h-11 = 44px touch
                  // target on mobile, centered no-wrap label. `relative`
                  // anchors the corner checkmark, which is absolutely
                  // positioned so the active chip never changes size.
                  'relative flex min-h-11 flex-col items-center justify-center whitespace-nowrap rounded-xl border px-1 py-2 text-center transition-colors',
                  // Desktop: original grid cell sizing
                  'md:min-h-0 md:px-2 md:py-3',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  'disabled:pointer-events-none disabled:opacity-50',
                  // Active: 1px border + 1px inset ring = a crisp 2px primary
                  // border rendered entirely inside the box (box-shadow), so
                  // active and inactive chips are pixel-identical in size —
                  // no outer ring, no extra white space, no layout shift.
                  isActive
                    ? 'border-primary bg-primary/10 text-primary shadow-sm inset-ring-1 inset-ring-primary'
                    : 'border-border text-foreground hover:border-primary/50 hover:bg-muted/50',
                ].join(' ')}
              >
                <span className="text-sm font-bold leading-none md:text-base">
                  {target.targetKB >= 1024
                    ? `${target.targetKB / 1024}MB`
                    : `${target.targetKB}KB`}
                </span>
                {/* Corner checkmark — replaces the old "ACTIVE" text label.
                    Absolutely positioned: adds zero height/width, shared by
                    mobile and desktop. Decorative only; the selected state is
                    announced via aria-pressed + the "(current)" aria-label. */}
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

        <p className="mt-2 text-xs text-muted-foreground md:mt-3">
          The tool automatically finds the highest quality that fits your target.
        </p>
      </div>
    </div>
  )
}

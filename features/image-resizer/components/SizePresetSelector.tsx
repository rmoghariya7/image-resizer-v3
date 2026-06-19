'use client'

import type { CompressPresetKey } from '@/registry/presets/schema'
import { QUICK_ACTION_SIZES } from '@/registry/size-presets'

interface Props {
  /** The currently active (selected or most-recently-processed) preset. */
  activePresetKey: CompressPresetKey
  /** File size to show as "Current size: X KB" context label. */
  currentSizeKB: number
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

/**
 * Reusable grid of compression size buttons. Renders as a self-contained white
 * card and can be dropped into any gray-background section.
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
      <div className="px-5 py-5">
        {/* Context label */}
        <p className="mb-0.5 text-sm text-muted-foreground">
          Current size:{' '}
          <span className="font-semibold text-foreground">
            {formatSize(currentSizeKB)}
          </span>
        </p>

        {/* Section heading */}
        <p className="mb-4 text-sm font-semibold text-foreground">{heading}</p>

        {/* Size grid — 3 columns on mobile, 6 on sm+ */}
        <div
          role="group"
          aria-label={heading}
          className="grid grid-cols-3 gap-2 sm:grid-cols-6"
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
                  'flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  'disabled:pointer-events-none disabled:opacity-50',
                  isActive
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-border text-foreground hover:border-primary/50 hover:bg-muted/50',
                ].join(' ')}
              >
                <span className="text-base font-bold leading-none">
                  {target.targetKB >= 1024
                    ? `${target.targetKB / 1024}MB`
                    : `${target.targetKB}KB`}
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="mt-1 text-[9px] font-semibold uppercase tracking-wide opacity-70"
                  >
                    Active
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          The tool automatically finds the highest quality that fits your target.
        </p>
      </div>
    </div>
  )
}

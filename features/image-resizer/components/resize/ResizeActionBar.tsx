'use client'

import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ResizePreset } from '@/registry/resize-presets'
import type { LastResult } from '../../hooks/useCustomResizer'
import type { OriginalImage } from '../../types'
import { formatKB } from '../../lib/format-size'
import { resolveOutputDimensions } from '../../lib/resize-geometry'
import {
  getResizeWarnings,
  sameResizeOperation,
  toResizeOperation,
  validateSettings,
  type ResizeSettings,
} from '../../lib/resize-settings'

interface Props {
  original: OriginalImage
  settings: ResizeSettings
  /** The selected preset, resolved from settings.presetId. Null = custom. */
  activePreset: ResizePreset | null
  /** True while settings still match the upload defaults (nothing chosen yet). */
  pristine: boolean
  onSubmit: () => void
  disabled?: boolean
  /** Last completed job — its size is shown while the config still matches it. */
  lastResult?: LastResult
}

/**
 * The act-and-review bar between the preset picker and the advanced section:
 * what's selected (preset chip / Custom Configuration badge), the live
 * Original → Output summary, plain-language warnings, and the primary CTA
 * (sticky at the viewport bottom on mobile while browsing presets).
 *
 * Two goal kinds flow through here: dimension presets / custom settings
 * (resize pipeline) and compression goals (compress engine). For a
 * compression goal the dimension settings are irrelevant, so dimension
 * validation and warnings are suppressed.
 */
export function ResizeActionBar({
  original,
  settings,
  activePreset,
  pristine,
  onSubmit,
  disabled = false,
  lastResult,
}: Props) {
  const compressGoal = activePreset?.kind === 'compress' ? activePreset : null

  // Dimension validation/warnings only gate the resize pipeline.
  const validationError = compressGoal ? null : validateSettings(settings)
  const warnings = compressGoal
    ? []
    : getResizeWarnings(original.width, original.height, settings)

  const output = !compressGoal && validationError === null
    ? resolveOutputDimensions(
        original.width, original.height,
        settings.width, settings.height,
        settings.mode,
      )
    : null

  // Actual output file size — only while the config that produced the last
  // result is still active, so a stale size never appears next to new values.
  const outputSizeKB = lastResult && lastResultMatches() ? lastResult.sizeKB : null

  function lastResultMatches(): boolean {
    if (!lastResult) return false
    if (compressGoal) {
      return (
        lastResult.job.kind === 'compress' &&
        lastResult.job.preset.key === compressGoal.presetKey
      )
    }
    return (
      output !== null &&
      lastResult.job.kind === 'resize' &&
      sameResizeOperation(lastResult.job.operation, toResizeOperation(settings))
    )
  }

  const reductionPercent =
    outputSizeKB !== null && original.sizeKB > 0
      ? Math.round((1 - outputSizeKB / original.sizeKB) * 100)
      : null

  const alreadyUnderTarget =
    compressGoal !== null && original.sizeKB <= compressGoal.targetKB

  // On mobile the selection status lives in the sticky bottom bar and the
  // summary is deferred to the result screen — the review card only appears
  // when it has something the user must see (validation / warnings).
  const hasNotices =
    alreadyUnderTarget || validationError !== null || warnings.length > 0

  return (
    <>
      <div
        className={[
          hasNotices ? '' : 'hidden md:block',
          'overflow-hidden rounded-2xl border border-border bg-white shadow-sm',
        ].join(' ')}
      >
        <div className="space-y-3 px-3 py-3 md:space-y-4 md:px-5 md:py-5">

          {/* ── Selection status — desktop only (mobile: sticky bar) ─────── */}
          <div aria-live="polite" className="hidden min-h-6 flex-wrap items-center gap-2 md:flex">
            {activePreset ? (
              <>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-3 w-3 text-white" aria-hidden="true" strokeWidth={3} />
                </span>
                <p className="text-sm font-semibold text-foreground">{activePreset.label}</p>
                <span className="font-mono text-xs text-muted-foreground">
                  {activePreset.kind === 'dimensions'
                    ? `${activePreset.width} × ${activePreset.height}px`
                    : `≤ ${activePreset.targetKB} KB`}
                </span>
              </>
            ) : pristine ? (
              <p className="text-sm text-muted-foreground">
                Pick a preset above — or resize at the original size.
              </p>
            ) : (
              <>
                <Badge variant="secondary">Custom Configuration</Badge>
                <span className="text-xs text-muted-foreground">
                  Using your own dimensions and settings.
                </span>
              </>
            )}
          </div>

          {/* ── Output summary — desktop only ────────────────────────────── */}
          <dl className="hidden grid-cols-2 gap-2 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm md:grid">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Original</dt>
              <dd className="mt-0.5 font-mono text-xs text-foreground">
                {original.width} × {original.height}px · {formatKB(original.sizeKB)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Output</dt>
              <dd className="mt-0.5 font-mono text-xs text-foreground">
                {compressGoal
                  ? outputSizeKB !== null
                    ? `${formatKB(outputSizeKB)} · target ≤ ${compressGoal.targetKB} KB`
                    : `Under ${compressGoal.targetKB} KB`
                  : output
                    ? `${output.width} × ${output.height}px${outputSizeKB !== null ? ` · ${formatKB(outputSizeKB)}` : ''}`
                    : '—'}
                {reductionPercent !== null && reductionPercent > 0 && (
                  <span className="block font-semibold text-green-600">
                    ↓ {reductionPercent}% smaller
                  </span>
                )}
              </dd>
            </div>
          </dl>

          {/* ── Validation + notices ─────────────────────────────────────── */}
          {alreadyUnderTarget && (
            <p className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
              Your image is already under {compressGoal!.targetKB} KB — you&rsquo;ll get the
              original back untouched, at full quality.
            </p>
          )}
          {validationError && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {validationError}
            </p>
          )}
          {warnings.length > 0 && (
            <ul className="space-y-1.5" role="list" aria-label="Resize warnings">
              {warnings.map(w => (
                <li
                  key={w.id}
                  className={[
                    'rounded-lg border px-3 py-2 text-xs',
                    w.severity === 'warning'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-blue-100 bg-blue-50 text-blue-700',
                  ].join(' ')}
                >
                  {w.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Primary action — mobile: a sticky bottom bar (selection + CTA)
          that stays visible while scrolling; desktop (md+): the original
          static button, unchanged. Rendered as a fragment sibling so the
          sticky containing block is the whole tool column. */}
      <div
        className={[
          'sticky bottom-0 z-10 -mx-4 border-t border-border bg-white/95 px-4 pt-2',
          'pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-sm',
          'sm:-mx-6 sm:px-6',
          'md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none',
        ].join(' ')}
      >
        {/* Selection line — mobile only */}
        <p
          aria-live="polite"
          className="mb-1.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground md:hidden"
        >
          {activePreset ? (
            <>
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500">
                <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" strokeWidth={3} />
              </span>
              <span className="truncate font-semibold text-foreground">{activePreset.label}</span>
              <span className="shrink-0 font-mono">
                {activePreset.kind === 'dimensions'
                  ? `${activePreset.width} × ${activePreset.height}px`
                  : `≤ ${activePreset.targetKB} KB`}
              </span>
            </>
          ) : pristine ? (
            <span className="truncate">
              Pick a preset above — or resize at the original size.
            </span>
          ) : (
            <>
              <span className="truncate font-semibold text-foreground">Custom configuration</span>
              <span className="shrink-0 font-mono">
                {settings.width} × {settings.height}px
              </span>
            </>
          )}
        </p>

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || validationError !== null}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 md:shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          {compressGoal
            ? `Compress to under ${compressGoal.targetKB} KB`
            : activePreset
              ? `Resize for ${activePreset.label}`
              : 'Resize image'}
        </button>
      </div>
    </>
  )
}

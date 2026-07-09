'use client'

import { useId } from 'react'
import { Input } from '@/components/ui/input'
import type { OutputFormat } from '@/registry/presets/schema'
import type { OriginalImage } from '../../types'
import {
  PERCENT_OPTIONS,
  RESIZE_MODES,
  settingsWithFormat,
  settingsWithHeight,
  settingsWithMode,
  settingsWithPercent,
  settingsWithQuality,
  settingsWithWidth,
  type ResizeSettings,
} from '../../lib/resize-settings'

interface Props {
  original: OriginalImage
  settings: ResizeSettings
  onChange: (next: ResizeSettings) => void
  disabled?: boolean
}

const FORMAT_OPTIONS: readonly { id: OutputFormat; label: string }[] = [
  { id: 'jpeg', label: 'JPEG' },
  { id: 'png', label: 'PNG' },
  { id: 'webp', label: 'WEBP' },
]

const sectionHeading =
  'text-xs font-semibold uppercase tracking-wider text-muted-foreground'

const chipButton = (isActive: boolean) =>
  [
    'min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors md:min-h-0',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:pointer-events-none disabled:opacity-50',
    isActive
      ? 'border-primary bg-primary/10 text-primary shadow-sm inset-ring-1 inset-ring-primary'
      : 'border-border text-foreground hover:border-primary/50 hover:bg-muted/50',
  ].join(' ')

/**
 * Advanced custom-resize controls: dimensions (with aspect-ratio lock),
 * percentage quick buttons, resize mode, output format and quality. Lives
 * collapsed inside "Need custom dimensions?" — presets are the primary flow.
 *
 * Every manual edit here leaves preset mode (the settings transitions clear
 * presetId), which flips the summary bar to "Custom Configuration".
 */
export function ResizeEditor({
  original,
  settings,
  onChange,
  disabled = false,
}: Props) {
  const widthId = useId()
  const heightId = useId()
  const qualityId = useId()

  const activeMode = RESIZE_MODES.find(m => m.id === settings.mode)
  const isLossy = settings.format !== 'png'

  return (
    <div className="space-y-5">

      {/* ── Dimensions ─────────────────────────────────────────────────── */}
      <div>
        <p className={sectionHeading}>Dimensions (px)</p>
        <div className="mt-2 flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor={widthId} className="mb-1 block text-sm font-medium text-foreground">
              Width
            </label>
            <Input
              id={widthId}
              type="number"
              inputMode="numeric"
              min={1}
              max={8192}
              value={settings.width || ''}
              disabled={disabled}
              onChange={e =>
                onChange(settingsWithWidth(settings, original.width, original.height, e.target.valueAsNumber))
              }
              className="h-11 text-base md:h-9 md:text-sm"
            />
          </div>

          {/* Aspect ratio lock */}
          <button
            type="button"
            onClick={() => onChange({ ...settings, locked: !settings.locked })}
            disabled={disabled}
            aria-pressed={settings.locked}
            aria-label={
              settings.locked
                ? 'Aspect ratio locked — changing one side updates the other. Click to unlock.'
                : 'Aspect ratio unlocked — width and height are independent. Click to lock.'
            }
            title={settings.locked ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
            className={[
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors md:h-9 md:w-9',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              'disabled:pointer-events-none disabled:opacity-50',
              settings.locked
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
            ].join(' ')}
          >
            {settings.locked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <label htmlFor={heightId} className="mb-1 block text-sm font-medium text-foreground">
              Height
            </label>
            <Input
              id={heightId}
              type="number"
              inputMode="numeric"
              min={1}
              max={8192}
              value={settings.height || ''}
              disabled={disabled}
              onChange={e =>
                onChange(settingsWithHeight(settings, original.width, original.height, e.target.valueAsNumber))
              }
              className="h-11 text-base md:h-9 md:text-sm"
            />
          </div>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {settings.locked
            ? 'Aspect ratio locked — changing one side updates the other.'
            : 'Aspect ratio unlocked — both sides are independent.'}
        </p>
      </div>

      {/* ── Percentage quick buttons ───────────────────────────────────── */}
      <div>
        <p className={sectionHeading}>Scale</p>
        <div role="group" aria-label="Scale by percentage" className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {PERCENT_OPTIONS.map(pct => (
            <button
              key={pct}
              type="button"
              onClick={() =>
                onChange(settingsWithPercent(settings, original.width, original.height, pct))
              }
              disabled={disabled}
              aria-pressed={settings.percent === pct}
              aria-label={`Scale to ${pct} percent of the original size`}
              className={chipButton(settings.percent === pct)}
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* ── Resize mode ────────────────────────────────────────────────── */}
      <div>
        <p className={sectionHeading}>Resize mode</p>
        <div role="group" aria-label="Resize mode" className="mt-2 grid grid-cols-3 gap-2">
          {RESIZE_MODES.map(mode => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(settingsWithMode(settings, mode.id))}
              disabled={disabled}
              aria-pressed={settings.mode === mode.id}
              aria-label={`${mode.label} — ${mode.description}`}
              className={chipButton(settings.mode === mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>
        {activeMode && (
          <p className="mt-1.5 text-xs text-muted-foreground" aria-live="polite">
            {activeMode.description}
          </p>
        )}
      </div>

      {/* ── Output format + quality ────────────────────────────────────── */}
      <div>
        <p className={sectionHeading}>Output format</p>
        <div role="group" aria-label="Output format" className="mt-2 grid grid-cols-3 gap-2">
          {FORMAT_OPTIONS.map(fmt => (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onChange(settingsWithFormat(settings, fmt.id))}
              disabled={disabled}
              aria-pressed={settings.format === fmt.id}
              className={chipButton(settings.format === fmt.id)}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {isLossy && (
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <label htmlFor={qualityId} className="text-sm font-medium text-foreground">
                Quality
              </label>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {settings.quality}%
              </span>
            </div>
            <input
              id={qualityId}
              type="range"
              min={10}
              max={100}
              step={5}
              value={settings.quality}
              disabled={disabled}
              onChange={e => onChange(settingsWithQuality(settings, Number(e.target.value)))}
              aria-valuetext={`${settings.quality} percent quality`}
              className="mt-1.5 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-indigo-600 disabled:cursor-default disabled:opacity-50"
            />
          </div>
        )}
      </div>
    </div>
  )
}

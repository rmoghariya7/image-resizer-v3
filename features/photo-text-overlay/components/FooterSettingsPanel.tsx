'use client'

import type { FooterSettings } from '../types'

interface Props {
  settings: FooterSettings
  onChange: (partial: Partial<FooterSettings>) => void
  disabled?: boolean
}

/** Footer settings card: height, background color, text color. */
export function FooterSettingsPanel({ settings, onChange, disabled = false }: Props) {
  return (
    <div className="space-y-4 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-semibold text-foreground">Footer</p>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="footer-height" className="text-xs font-medium text-foreground">
            Footer height
          </label>
          <span className="text-xs tabular-nums text-muted-foreground">{settings.heightPx}px</span>
        </div>
        <input
          id="footer-height"
          type="range"
          min={40}
          max={160}
          step={4}
          value={settings.heightPx}
          disabled={disabled}
          onChange={(e) => onChange({ heightPx: Number(e.target.value) })}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="footer-bg-color" className="mb-1.5 block text-xs font-medium text-foreground">
            Background color
          </label>
          <input
            id="footer-bg-color"
            type="color"
            value={settings.backgroundColor}
            disabled={disabled}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            className="h-9 w-full cursor-pointer rounded-lg border border-border disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="footer-text-color" className="mb-1.5 block text-xs font-medium text-foreground">
            Text color
          </label>
          <input
            id="footer-text-color"
            type="color"
            value={settings.textColor}
            disabled={disabled}
            onChange={(e) => onChange({ textColor: e.target.value })}
            className="h-9 w-full cursor-pointer rounded-lg border border-border disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  )
}

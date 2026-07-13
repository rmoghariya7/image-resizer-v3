'use client'

import {
  getFormatConfig,
  type AdvancedSettings,
  type Bitrate,
  type Channels,
  type OutputFormat,
  type SampleRate,
} from '../types'

interface Props {
  format: OutputFormat
  settings: AdvancedSettings
  onChange: (settings: AdvancedSettings) => void
  disabled?: boolean
}

const BITRATES: readonly Bitrate[] = ['128', '192', '256', '320']
const SAMPLE_RATES: readonly { value: SampleRate; label: string }[] = [
  { value: 'auto', label: 'Auto (keep source)' },
  { value: '44100', label: '44.1 kHz (CD)' },
  { value: '48000', label: '48 kHz (video standard)' },
]
const CHANNEL_OPTIONS: readonly { value: Channels; label: string }[] = [
  { value: 'auto', label: 'Auto (keep source)' },
  { value: 'stereo', label: 'Stereo' },
  { value: 'mono', label: 'Mono (smaller file)' },
]

const selectClasses =
  'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' +
  'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400'

/**
 * Power-user settings, collapsed by default (native <details> — same pattern
 * as the FAQ sections). The defaults are correct for virtually everyone;
 * casual users should never need to open this.
 */
export function AdvancedOptions({ format, settings, onChange, disabled = false }: Props) {
  const config = getFormatConfig(format)

  return (
    <details className="group rounded-2xl border border-gray-200 bg-white shadow-sm marker:content-none">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-medium text-gray-700 group-open:text-indigo-600">
          Advanced options
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
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

      <div className="grid grid-cols-1 gap-3 border-t border-gray-100 px-4 py-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-gray-500">Bitrate</span>
          <select
            value={settings.bitrate}
            onChange={e => onChange({ ...settings, bitrate: e.target.value as Bitrate })}
            disabled={disabled || config.lossless}
            className={selectClasses}
          >
            {BITRATES.map(rate => (
              <option key={rate} value={rate}>
                {rate} kbps{rate === '192' ? ' (recommended)' : ''}
              </option>
            ))}
          </select>
          {config.lossless && (
            <span className="mt-1 block text-xs text-gray-400">
              Not used — {config.label} is lossless.
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-gray-500">Sample rate</span>
          <select
            value={settings.sampleRate}
            onChange={e => onChange({ ...settings, sampleRate: e.target.value as SampleRate })}
            disabled={disabled}
            className={selectClasses}
          >
            {SAMPLE_RATES.map(rate => (
              <option key={rate.value} value={rate.value}>
                {rate.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-gray-500">Channels</span>
          <select
            value={settings.channels}
            onChange={e => onChange({ ...settings, channels: e.target.value as Channels })}
            disabled={disabled}
            className={selectClasses}
          >
            {CHANNEL_OPTIONS.map(channel => (
              <option key={channel.value} value={channel.value}>
                {channel.label}
              </option>
            ))}
          </select>
        </label>

        <p className="text-xs text-gray-400 sm:col-span-3">
          Codec: <span className="font-mono">{config.codec}</span> &middot; Container:{' '}
          <span className="font-mono">.{config.extension}</span>
        </p>
      </div>
    </details>
  )
}

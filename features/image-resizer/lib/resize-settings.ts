// ─── Resize editor settings ───────────────────────────────────────────────────
// Pure state-transition functions for the resize editor. Components stay thin;
// all dimension/lock/percentage logic lives here and is unit-tested.

import type { OutputFormat } from '@/registry/presets/schema'
import type { ResizePreset } from '@/registry/resize-presets'
import type { AcceptedMimeType, ResizeMode, ResizeOperation } from '../types'
import {
  MAX_DIMENSION_PX,
  MIN_DIMENSION_PX,
  aspectRatioChanges,
  estimateScalePercent,
  resolveOutputDimensions,
} from './resize-geometry'

export interface ResizeSettings {
  /** Target width/height in px. 0 represents an empty input field. */
  width: number
  height: number
  /** Aspect ratio lock — ON by default. */
  locked: boolean
  mode: ResizeMode
  format: OutputFormat
  /** 1–100, lossy encoders only. */
  quality: number
  /** Active quick-preset id, cleared on any manual dimension edit. */
  presetId: string | null
  /** Active percentage button, cleared on any manual dimension edit. */
  percent: number | null
}

export const PERCENT_OPTIONS = [25, 50, 75, 100, 125, 150, 200] as const

export const RESIZE_MODES: readonly {
  id: ResizeMode
  label: string
  description: string
}[] = [
  { id: 'fit', label: 'Fit', description: 'Fits inside your size. Keeps proportions, nothing cropped.' },
  { id: 'fill', label: 'Fill', description: 'Fills your exact size. Keeps proportions, edges may be cropped.' },
  { id: 'stretch', label: 'Stretch', description: 'Forces your exact size. May squash or stretch the image.' },
]

function formatFromMime(mime: AcceptedMimeType): OutputFormat {
  if (mime === 'image/png') return 'png'
  if (mime === 'image/webp') return 'webp'
  return 'jpeg'
}

export function defaultResizeSettings(
  originalWidth: number,
  originalHeight: number,
  originalMime: AcceptedMimeType,
): ResizeSettings {
  return {
    width: originalWidth,
    height: originalHeight,
    locked: true,
    mode: 'fit',
    format: formatFromMime(originalMime),
    quality: 90,
    presetId: null,
    percent: 100,
  }
}

// ─── Transitions ──────────────────────────────────────────────────────────────

function clampEdge(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(MAX_DIMENSION_PX, Math.max(0, Math.round(value)))
}

/** Manual width edit. When locked, height follows the original aspect ratio. */
export function settingsWithWidth(
  s: ResizeSettings,
  originalWidth: number,
  originalHeight: number,
  width: number,
): ResizeSettings {
  const w = clampEdge(width)
  const h = s.locked && w > 0
    ? clampEdge(w * (originalHeight / originalWidth)) || MIN_DIMENSION_PX
    : s.height
  return { ...s, width: w, height: h, presetId: null, percent: null }
}

/** Manual height edit. When locked, width follows the original aspect ratio. */
export function settingsWithHeight(
  s: ResizeSettings,
  originalWidth: number,
  originalHeight: number,
  height: number,
): ResizeSettings {
  const h = clampEdge(height)
  const w = s.locked && h > 0
    ? clampEdge(h * (originalWidth / originalHeight)) || MIN_DIMENSION_PX
    : s.width
  return { ...s, width: w, height: h, presetId: null, percent: null }
}

/** Percentage quick-button: scales both edges from the ORIGINAL dimensions. */
export function settingsWithPercent(
  s: ResizeSettings,
  originalWidth: number,
  originalHeight: number,
  percent: number,
): ResizeSettings {
  return {
    ...s,
    width: Math.max(MIN_DIMENSION_PX, clampEdge(originalWidth * (percent / 100))),
    height: Math.max(MIN_DIMENSION_PX, clampEdge(originalHeight * (percent / 100))),
    presetId: null,
    percent,
  }
}

/**
 * Preset card: configures EVERYTHING the destination needs. A dimension
 * preset sets the size, the resize mode that guarantees the exact output
 * without distortion, and the required output format (government portals).
 * A compression goal only marks itself active — the compress engine works
 * from the original image and decides quality/scaling itself, so the
 * dimension settings are left untouched underneath.
 * The user should not have to touch anything else.
 */
export function settingsWithPreset(
  s: ResizeSettings,
  preset: ResizePreset,
): ResizeSettings {
  if (preset.kind === 'compress') {
    return { ...s, presetId: preset.id }
  }
  return {
    ...s,
    width: preset.width,
    height: preset.height,
    // Presets are destinations: the output must be exactly this size. Fill
    // keeps proportions and crops overflow instead of distorting.
    mode: 'fill',
    format: preset.format ?? s.format,
    presetId: preset.id,
    percent: null,
  }
}

// Manual edits to mode / format / quality leave preset mode: the destination
// no longer fully defines the output, so the config is custom now. Dimension
// and percentage edits already do this in their own transitions above.

export function settingsWithMode(s: ResizeSettings, mode: ResizeMode): ResizeSettings {
  return { ...s, mode, presetId: null }
}

export function settingsWithFormat(s: ResizeSettings, format: OutputFormat): ResizeSettings {
  return { ...s, format, presetId: null }
}

export function settingsWithQuality(s: ResizeSettings, quality: number): ResizeSettings {
  return { ...s, quality, presetId: null }
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateSettings(s: ResizeSettings): string | null {
  if (s.width < MIN_DIMENSION_PX || s.height < MIN_DIMENSION_PX) {
    return 'Enter a width and height of at least 1 pixel.'
  }
  if (s.width > MAX_DIMENSION_PX || s.height > MAX_DIMENSION_PX) {
    return `Maximum supported dimension is ${MAX_DIMENSION_PX.toLocaleString()} pixels.`
  }
  return null
}

export function toResizeOperation(s: ResizeSettings): ResizeOperation {
  return {
    targetWidth: s.width,
    targetHeight: s.height,
    mode: s.mode,
    format: s.format,
    quality: s.quality,
  }
}

/**
 * True when two operations produce an identical output. Used to decide
 * whether a previously processed result still describes the current settings.
 */
export function sameResizeOperation(a: ResizeOperation, b: ResizeOperation): boolean {
  return (
    a.targetWidth === b.targetWidth &&
    a.targetHeight === b.targetHeight &&
    a.mode === b.mode &&
    a.format === b.format &&
    a.quality === b.quality
  )
}

// ─── Warnings ─────────────────────────────────────────────────────────────────

export interface ResizeWarning {
  id: 'upscale' | 'aspect-distort' | 'aspect-crop' | 'aspect-fit' | 'low-quality'
  severity: 'warning' | 'info'
  message: string
}

export function getResizeWarnings(
  originalWidth: number,
  originalHeight: number,
  s: ResizeSettings,
): ResizeWarning[] {
  if (validateSettings(s) !== null) return []

  const warnings: ResizeWarning[] = []
  const scale = estimateScalePercent(originalWidth, originalHeight, s.width, s.height)
  const ratioChanges = aspectRatioChanges(originalWidth, originalHeight, s.width, s.height)

  if (scale > 100) {
    warnings.push({
      id: 'upscale',
      severity: 'warning',
      message: `Enlarging to ${scale}% of the original — the image may look soft or pixelated.`,
    })
  }

  if (ratioChanges) {
    if (s.mode === 'stretch') {
      warnings.push({
        id: 'aspect-distort',
        severity: 'warning',
        message: 'The aspect ratio changes — Stretch mode will distort the image.',
      })
    } else if (s.mode === 'fill') {
      warnings.push({
        id: 'aspect-crop',
        severity: 'info',
        message: 'The aspect ratio changes — Fill mode will crop the edges.',
      })
    } else {
      const out = resolveOutputDimensions(originalWidth, originalHeight, s.width, s.height, 'fit')
      warnings.push({
        id: 'aspect-fit',
        severity: 'info',
        message: `Fit mode keeps proportions — the output will be ${out.width} × ${out.height}px.`,
      })
    }
  }

  if (s.format !== 'png' && s.quality < 60) {
    warnings.push({
      id: 'low-quality',
      severity: 'warning',
      message: `Quality ${s.quality}% is quite low — visible compression artifacts are likely.`,
    })
  }

  return warnings
}

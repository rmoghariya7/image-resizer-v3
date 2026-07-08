// ─── Resize geometry ──────────────────────────────────────────────────────────
// Pure, dependency-free dimension math shared by the Web Worker (canvas
// drawing) and the resize editor UI (live previews, warnings). Keep this
// module free of browser APIs so it stays unit-testable in Node.

import type { ResizeMode } from '../types'

export interface Dimensions {
  width: number
  height: number
}

export interface DrawParams {
  sx: number; sy: number; sw: number; sh: number
  dx: number; dy: number; dw: number; dh: number
}

/** Hard ceiling for a single output edge. Safely below every browser's canvas limit. */
export const MAX_DIMENSION_PX = 8192
export const MIN_DIMENSION_PX = 1

/**
 * Center-crop draw parameters: source is cropped so it fills dstW×dstH
 * completely (cover). Used by the 'fill' resize mode and by exact-dimension
 * document presets (UPSC, Aadhaar, etc.).
 */
export function coverFit(
  srcW: number, srcH: number,
  dstW: number, dstH: number,
): DrawParams {
  const srcRatio = srcW / srcH
  const dstRatio = dstW / dstH
  let sx = 0, sy = 0, sw = srcW, sh = srcH

  if (srcRatio > dstRatio) {
    sw = Math.round(srcH * dstRatio)
    sx = Math.round((srcW - sw) / 2)
  } else {
    sh = Math.round(srcW / dstRatio)
    sy = Math.round((srcH - sh) / 2)
  }

  return { sx, sy, sw, sh, dx: 0, dy: 0, dw: dstW, dh: dstH }
}

/**
 * Largest dimensions that fit inside maxW×maxH while preserving the source
 * aspect ratio (contain). Never returns an edge below 1px.
 */
export function fitWithin(
  srcW: number, srcH: number,
  maxW: number, maxH: number,
): Dimensions {
  const scale = Math.min(maxW / srcW, maxH / srcH)
  return {
    width: Math.max(1, Math.round(srcW * scale)),
    height: Math.max(1, Math.round(srcH * scale)),
  }
}

/**
 * Final output canvas dimensions for a resize operation.
 * - stretch / fill: exactly the requested target (distort / crop respectively)
 * - fit: contained within the target, source aspect ratio preserved
 */
export function resolveOutputDimensions(
  srcW: number, srcH: number,
  targetW: number, targetH: number,
  mode: ResizeMode,
): Dimensions {
  if (mode === 'fit') return fitWithin(srcW, srcH, targetW, targetH)
  return { width: targetW, height: targetH }
}

// ─── Aspect ratio helpers ─────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/**
 * Human-readable aspect ratio label: "16:9", "1:1", "7:9".
 * Falls back to a one-decimal ratio ("1.85:1") when the reduced integer
 * ratio would be unreadably large (e.g. 1013:761).
 */
export function formatAspectRatio(width: number, height: number): string {
  if (width <= 0 || height <= 0) return '—'
  const d = gcd(Math.round(width), Math.round(height))
  const w = Math.round(width) / d
  const h = Math.round(height) / d
  if (w <= 32 && h <= 32) return `${w}:${h}`
  return `${(width / height).toFixed(2)}:1`
}

/** True when the two ratios differ by more than ~1% (beyond rounding noise). */
export function aspectRatioChanges(
  srcW: number, srcH: number,
  dstW: number, dstH: number,
): boolean {
  if (srcW <= 0 || srcH <= 0 || dstW <= 0 || dstH <= 0) return false
  const src = srcW / srcH
  const dst = dstW / dstH
  return Math.abs(src - dst) / src > 0.01
}

/**
 * Linear scale of the target relative to the original, as a percentage.
 * Uses the larger axis change so "150%" always means "one edge grew 1.5×".
 */
export function estimateScalePercent(
  srcW: number, srcH: number,
  dstW: number, dstH: number,
): number {
  if (srcW <= 0 || srcH <= 0) return 100
  return Math.round(Math.max(dstW / srcW, dstH / srcH) * 100)
}

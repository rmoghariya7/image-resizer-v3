/**
 * Resize geometry + editor settings unit tests.
 *
 * All functions under test are pure (no Canvas/ImageBitmap), so they run in
 * Node without mocks. Canvas encoding paths (processResizeOperation) rely on
 * OffscreenCanvas and belong in Playwright browser tests.
 */

import { describe, it, expect } from 'vitest'
import {
  coverFit,
  fitWithin,
  resolveOutputDimensions,
  formatAspectRatio,
  aspectRatioChanges,
  estimateScalePercent,
} from '../lib/resize-geometry'
import {
  defaultResizeSettings,
  settingsWithWidth,
  settingsWithHeight,
  settingsWithPercent,
  settingsWithPreset,
  settingsWithMode,
  settingsWithFormat,
  settingsWithQuality,
  validateSettings,
  toResizeOperation,
  sameResizeOperation,
  getResizeWarnings,
} from '../lib/resize-settings'
import type { ResizePreset } from '@/registry/resize-presets'

// ─── fitWithin ────────────────────────────────────────────────────────────────

describe('fitWithin', () => {
  it('scales a landscape image into a square box by the width', () => {
    expect(fitWithin(4000, 3000, 1000, 1000)).toEqual({ width: 1000, height: 750 })
  })

  it('scales a portrait image into a square box by the height', () => {
    expect(fitWithin(3000, 4000, 1000, 1000)).toEqual({ width: 750, height: 1000 })
  })

  it('returns the box exactly when aspect ratios match', () => {
    expect(fitWithin(1920, 1080, 1280, 720)).toEqual({ width: 1280, height: 720 })
  })

  it('upscales when the box is larger than the source', () => {
    expect(fitWithin(100, 100, 400, 800)).toEqual({ width: 400, height: 400 })
  })

  it('never returns an edge below 1px', () => {
    expect(fitWithin(10000, 10, 5, 5).height).toBeGreaterThanOrEqual(1)
  })
})

// ─── coverFit ─────────────────────────────────────────────────────────────────

describe('coverFit', () => {
  it('crops the sides of a wider source', () => {
    const p = coverFit(4000, 3000, 1000, 1000)
    expect(p.sh).toBe(3000)          // full height used
    expect(p.sw).toBe(3000)          // width cropped to match 1:1
    expect(p.sx).toBe(500)           // centered crop
    expect(p.sy).toBe(0)
    expect(p.dw).toBe(1000)
    expect(p.dh).toBe(1000)
  })

  it('crops the top/bottom of a taller source', () => {
    const p = coverFit(3000, 4000, 1000, 1000)
    expect(p.sw).toBe(3000)
    expect(p.sh).toBe(3000)
    expect(p.sy).toBe(500)
    expect(p.sx).toBe(0)
  })

  it('uses the full source when aspect ratios match', () => {
    const p = coverFit(1920, 1080, 960, 540)
    expect(p).toEqual({ sx: 0, sy: 0, sw: 1920, sh: 1080, dx: 0, dy: 0, dw: 960, dh: 540 })
  })
})

// ─── resolveOutputDimensions ──────────────────────────────────────────────────

describe('resolveOutputDimensions', () => {
  it('stretch returns exactly the target', () => {
    expect(resolveOutputDimensions(4000, 3000, 500, 500, 'stretch')).toEqual({ width: 500, height: 500 })
  })

  it('fill returns exactly the target', () => {
    expect(resolveOutputDimensions(4000, 3000, 500, 500, 'fill')).toEqual({ width: 500, height: 500 })
  })

  it('fit preserves the source aspect ratio within the target', () => {
    expect(resolveOutputDimensions(4000, 3000, 500, 500, 'fit')).toEqual({ width: 500, height: 375 })
  })
})

// ─── Aspect ratio helpers ─────────────────────────────────────────────────────

describe('formatAspectRatio', () => {
  it('reduces common ratios', () => {
    expect(formatAspectRatio(1920, 1080)).toBe('16:9')
    expect(formatAspectRatio(1080, 1080)).toBe('1:1')
    expect(formatAspectRatio(1080, 1350)).toBe('4:5')
  })

  it('reduces the UPSC photo ratio', () => {
    expect(formatAspectRatio(413, 531)).toBe('7:9')
  })

  it('falls back to a decimal ratio for awkward dimensions', () => {
    expect(formatAspectRatio(1013, 547)).toBe('1.85:1')
  })

  it('handles zero dimensions gracefully', () => {
    expect(formatAspectRatio(0, 100)).toBe('—')
  })
})

describe('aspectRatioChanges', () => {
  it('is false for identical ratios', () => {
    expect(aspectRatioChanges(4000, 3000, 1000, 750)).toBe(false)
  })

  it('tolerates sub-1% rounding differences', () => {
    // 1000×750 → 333×250 is 0.2% off exact 4:3
    expect(aspectRatioChanges(1000, 750, 333, 250)).toBe(false)
  })

  it('is true when the ratio genuinely changes', () => {
    expect(aspectRatioChanges(1000, 1000, 1600, 900)).toBe(true)
  })
})

describe('estimateScalePercent', () => {
  it('returns 100 for identical dimensions', () => {
    expect(estimateScalePercent(1000, 800, 1000, 800)).toBe(100)
  })

  it('uses the larger axis change', () => {
    expect(estimateScalePercent(1000, 1000, 500, 2000)).toBe(200)
  })

  it('reports downscales below 100', () => {
    expect(estimateScalePercent(4000, 3000, 1000, 750)).toBe(25)
  })
})

// ─── Editor settings transitions ──────────────────────────────────────────────

const ORIG = { width: 4000, height: 3000 }

function baseSettings() {
  return defaultResizeSettings(ORIG.width, ORIG.height, 'image/jpeg')
}

describe('defaultResizeSettings', () => {
  it('starts at the original dimensions, locked, fit mode, 100%', () => {
    const s = baseSettings()
    expect(s).toMatchObject({
      width: 4000,
      height: 3000,
      locked: true,
      mode: 'fit',
      format: 'jpeg',
      percent: 100,
      presetId: null,
    })
  })

  it('derives the output format from the source mime type', () => {
    expect(defaultResizeSettings(100, 100, 'image/png').format).toBe('png')
    expect(defaultResizeSettings(100, 100, 'image/webp').format).toBe('webp')
  })
})

describe('settingsWithWidth', () => {
  it('updates height proportionally when locked', () => {
    const s = settingsWithWidth(baseSettings(), ORIG.width, ORIG.height, 2000)
    expect(s.width).toBe(2000)
    expect(s.height).toBe(1500)
  })

  it('leaves height unchanged when unlocked', () => {
    const s = settingsWithWidth(
      { ...baseSettings(), locked: false },
      ORIG.width, ORIG.height, 2000,
    )
    expect(s.width).toBe(2000)
    expect(s.height).toBe(3000)
  })

  it('clears the active preset and percent chips', () => {
    const withChips = { ...baseSettings(), presetId: 'upsc', percent: 50 }
    const s = settingsWithWidth(withChips, ORIG.width, ORIG.height, 800)
    expect(s.presetId).toBeNull()
    expect(s.percent).toBeNull()
  })

  it('treats NaN (cleared input) as empty without corrupting height', () => {
    const s = settingsWithWidth(baseSettings(), ORIG.width, ORIG.height, NaN)
    expect(s.width).toBe(0)
    expect(s.height).toBe(3000) // untouched — width is empty
  })
})

describe('settingsWithHeight', () => {
  it('updates width proportionally when locked', () => {
    const s = settingsWithHeight(baseSettings(), ORIG.width, ORIG.height, 1500)
    expect(s.height).toBe(1500)
    expect(s.width).toBe(2000)
  })

  it('leaves width unchanged when unlocked', () => {
    const s = settingsWithHeight(
      { ...baseSettings(), locked: false },
      ORIG.width, ORIG.height, 600,
    )
    expect(s.width).toBe(4000)
    expect(s.height).toBe(600)
  })
})

describe('settingsWithPercent', () => {
  it('scales both edges from the ORIGINAL dimensions', () => {
    const shrunk = settingsWithPercent(baseSettings(), ORIG.width, ORIG.height, 50)
    // Applying a second percentage still derives from the original, not the current value
    const s = settingsWithPercent(shrunk, ORIG.width, ORIG.height, 25)
    expect(s.width).toBe(1000)
    expect(s.height).toBe(750)
    expect(s.percent).toBe(25)
  })

  it('supports enlargement percentages', () => {
    const s = settingsWithPercent(baseSettings(), ORIG.width, ORIG.height, 150)
    expect(s.width).toBe(6000)
    expect(s.height).toBe(4500)
  })

  it('never produces a zero edge for tiny sources', () => {
    const s = settingsWithPercent(baseSettings(), 2, 2, 25)
    expect(s.width).toBeGreaterThanOrEqual(1)
    expect(s.height).toBeGreaterThanOrEqual(1)
  })
})

describe('settingsWithPreset', () => {
  const preset: ResizePreset = {
    kind: 'dimensions',
    id: 'youtube-thumbnail',
    label: 'YouTube Thumbnail',
    width: 1280,
    height: 720,
    category: 'social',
    hint: '16:9',
    description: 'Perfect for YouTube videos',
    icon: 'youtube',
  }

  it('populates the editor with the preset dimensions', () => {
    const s = settingsWithPreset(baseSettings(), preset)
    expect(s.width).toBe(1280)
    expect(s.height).toBe(720)
    expect(s.presetId).toBe('youtube-thumbnail')
    expect(s.percent).toBeNull()
  })

  it('smart-configures fill mode so the output is exactly the preset size', () => {
    expect(settingsWithPreset(baseSettings(), preset).mode).toBe('fill')
  })

  it('applies the preset output format when the destination requires one', () => {
    const government: ResizePreset = { ...preset, id: 'upsc', format: 'jpeg' }
    const s = settingsWithPreset({ ...baseSettings(), format: 'png' }, government)
    expect(s.format).toBe('jpeg')
  })

  it('keeps the current format when the preset does not require one', () => {
    const s = settingsWithPreset({ ...baseSettings(), format: 'webp' }, preset)
    expect(s.format).toBe('webp')
  })

  it('selecting a compression goal marks it active without touching dimension settings', () => {
    const compressPreset: ResizePreset = {
      kind: 'compress',
      id: 'under-50kb',
      label: 'Under 50 KB',
      targetKB: 50,
      presetKey: 'compress-50kb',
      category: 'compression',
      hint: '≤ 50 KB',
      description: 'Email & web forms',
      icon: 'file-down',
    }
    const before = { ...baseSettings(), width: 800, height: 600, mode: 'stretch' as const }
    const s = settingsWithPreset(before, compressPreset)
    expect(s.presetId).toBe('under-50kb')
    // The compress engine ignores these — they must survive for later custom use.
    expect(s.width).toBe(800)
    expect(s.height).toBe(600)
    expect(s.mode).toBe('stretch')
    expect(s.format).toBe('jpeg')
  })
})

describe('manual edits leave preset mode', () => {
  const presetActive = () => ({ ...baseSettings(), presetId: 'upsc' })

  it('changing the resize mode clears the preset', () => {
    const s = settingsWithMode(presetActive(), 'stretch')
    expect(s.mode).toBe('stretch')
    expect(s.presetId).toBeNull()
  })

  it('changing the output format clears the preset', () => {
    const s = settingsWithFormat(presetActive(), 'webp')
    expect(s.format).toBe('webp')
    expect(s.presetId).toBeNull()
  })

  it('changing the quality clears the preset', () => {
    const s = settingsWithQuality(presetActive(), 55)
    expect(s.quality).toBe(55)
    expect(s.presetId).toBeNull()
  })
})

// ─── Validation + operation mapping ───────────────────────────────────────────

describe('validateSettings', () => {
  it('accepts sane dimensions', () => {
    expect(validateSettings(baseSettings())).toBeNull()
  })

  it('rejects empty dimensions', () => {
    expect(validateSettings({ ...baseSettings(), width: 0 })).toMatch(/at least 1/)
  })

  it('rejects dimensions above the canvas-safe ceiling', () => {
    // settingsWithWidth clamps to the ceiling, but direct edits are validated too
    expect(validateSettings({ ...baseSettings(), height: 9000 })).toMatch(/Maximum/)
  })
})

describe('toResizeOperation', () => {
  it('maps editor settings onto the worker operation', () => {
    const s = { ...baseSettings(), width: 800, height: 600, mode: 'fill' as const, quality: 75 }
    expect(toResizeOperation(s)).toEqual({
      targetWidth: 800,
      targetHeight: 600,
      mode: 'fill',
      format: 'jpeg',
      quality: 75,
    })
  })
})

describe('sameResizeOperation', () => {
  const op = () => toResizeOperation({ ...baseSettings(), width: 800, height: 600 })

  it('is true for identical operations', () => {
    expect(sameResizeOperation(op(), op())).toBe(true)
  })

  it('is false when any output-affecting field differs', () => {
    expect(sameResizeOperation(op(), { ...op(), targetWidth: 801 })).toBe(false)
    expect(sameResizeOperation(op(), { ...op(), mode: 'fill' })).toBe(false)
    expect(sameResizeOperation(op(), { ...op(), format: 'png' })).toBe(false)
    expect(sameResizeOperation(op(), { ...op(), quality: 80 })).toBe(false)
  })
})

// ─── Warnings ─────────────────────────────────────────────────────────────────

describe('getResizeWarnings', () => {
  it('returns no warnings for a proportional downscale', () => {
    const s = { ...baseSettings(), width: 2000, height: 1500 }
    expect(getResizeWarnings(ORIG.width, ORIG.height, s)).toEqual([])
  })

  it('warns on enlargement', () => {
    const s = { ...baseSettings(), width: 8000, height: 6000 }
    const ids = getResizeWarnings(ORIG.width, ORIG.height, s).map(w => w.id)
    expect(ids).toContain('upscale')
  })

  it('warns about distortion in stretch mode when the ratio changes', () => {
    const s = { ...baseSettings(), mode: 'stretch' as const, width: 1000, height: 1000 }
    const ids = getResizeWarnings(ORIG.width, ORIG.height, s).map(w => w.id)
    expect(ids).toContain('aspect-distort')
  })

  it('notes cropping in fill mode when the ratio changes', () => {
    const s = { ...baseSettings(), mode: 'fill' as const, width: 1000, height: 1000 }
    const ids = getResizeWarnings(ORIG.width, ORIG.height, s).map(w => w.id)
    expect(ids).toContain('aspect-crop')
  })

  it('explains the adjusted output in fit mode when the ratio changes', () => {
    const s = { ...baseSettings(), width: 1000, height: 1000 }
    const warnings = getResizeWarnings(ORIG.width, ORIG.height, s)
    const fitNote = warnings.find(w => w.id === 'aspect-fit')
    expect(fitNote).toBeDefined()
    expect(fitNote!.message).toContain('1000 × 750')
  })

  it('warns on very low lossy quality but not for PNG', () => {
    const lossy = { ...baseSettings(), width: 2000, height: 1500, quality: 40 }
    expect(getResizeWarnings(ORIG.width, ORIG.height, lossy).map(w => w.id)).toContain('low-quality')

    const png = { ...lossy, format: 'png' as const }
    expect(getResizeWarnings(ORIG.width, ORIG.height, png).map(w => w.id)).not.toContain('low-quality')
  })

  it('suppresses warnings while the input is invalid', () => {
    const s = { ...baseSettings(), width: 0 }
    expect(getResizeWarnings(ORIG.width, ORIG.height, s)).toEqual([])
  })
})

import { describe, it, expect } from 'vitest'
import { buildCustomPreset, clampDimension, scaleToAspect } from '../lib/custom-preset'

describe('clampDimension', () => {
  it('rounds fractional values', () => {
    expect(clampDimension(100.6)).toBe(101)
  })

  it('clamps to a minimum of 1', () => {
    expect(clampDimension(0)).toBe(1)
    expect(clampDimension(-50)).toBe(1)
  })

  it('clamps to a maximum of 8000', () => {
    expect(clampDimension(10000)).toBe(8000)
  })

  it('falls back to 1 for non-finite input', () => {
    expect(clampDimension(NaN)).toBe(1)
    expect(clampDimension(Infinity)).toBe(1)
  })
})

describe('scaleToAspect', () => {
  it('scales height when width changes, preserving aspect ratio', () => {
    // 1000x500 is 2:1 — halving width should halve height too
    const result = scaleToAspect(1000, 500, 'width', 500)
    expect(result.width).toBe(500)
    expect(result.height).toBe(250)
  })

  it('scales width when height changes, preserving aspect ratio', () => {
    const result = scaleToAspect(1000, 500, 'height', 250)
    expect(result.width).toBe(500)
    expect(result.height).toBe(250)
  })

  it('handles square aspect ratios', () => {
    const result = scaleToAspect(400, 400, 'width', 800)
    expect(result.width).toBe(800)
    expect(result.height).toBe(800)
  })
})

describe('buildCustomPreset', () => {
  it('builds a valid ImagePreset shape with key "custom"', () => {
    const preset = buildCustomPreset({ widthPx: 1920, heightPx: 1080, format: 'jpeg', quality: 90 })
    expect(preset.key).toBe('custom')
    expect(preset.kind).toBe('image')
    expect(preset.widthPx).toBe(1920)
    expect(preset.heightPx).toBe(1080)
    expect(preset.format).toBe('jpeg')
    expect(preset.startQuality).toBe(90)
    expect(preset.maxSizeKB).toBeUndefined()
  })

  it('clamps out-of-range quality into 1-100', () => {
    expect(buildCustomPreset({ widthPx: 100, heightPx: 100, format: 'png', quality: 150 }).startQuality).toBe(100)
    expect(buildCustomPreset({ widthPx: 100, heightPx: 100, format: 'png', quality: -5 }).startQuality).toBe(1)
  })

  it('clamps dimensions through clampDimension', () => {
    const preset = buildCustomPreset({ widthPx: 99999, heightPx: 0, format: 'webp', quality: 80 })
    expect(preset.widthPx).toBe(8000)
    expect(preset.heightPx).toBe(1)
  })
})

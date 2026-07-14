/**
 * Pure geometry helper tests for the Image Cropper's canvas pipeline.
 *
 * getCroppedImg itself is a browser-only Canvas/Image pipeline (like
 * OffscreenCanvas in the image-resizer worker) and belongs in Playwright
 * browser tests. The pure math it depends on — rotation bounding-box sizing,
 * clamping, and custom ratio parsing — is fully testable here without a DOM.
 */

import { describe, it, expect } from 'vitest'
import { getRadianAngle, rotateSize, clamp, parseCustomRatio } from '../lib/canvas-utils'

describe('getRadianAngle', () => {
  it('converts degrees to radians', () => {
    expect(getRadianAngle(180)).toBeCloseTo(Math.PI)
    expect(getRadianAngle(90)).toBeCloseTo(Math.PI / 2)
    expect(getRadianAngle(0)).toBe(0)
  })
})

describe('rotateSize', () => {
  it('returns the original size unchanged at 0 degrees', () => {
    const { width, height } = rotateSize(400, 300, 0)
    expect(width).toBeCloseTo(400)
    expect(height).toBeCloseTo(300)
  })

  it('swaps width and height at 90 degrees', () => {
    const { width, height } = rotateSize(400, 300, 90)
    expect(width).toBeCloseTo(300)
    expect(height).toBeCloseTo(400)
  })

  it('swaps width and height at 270 degrees (equivalent to -90)', () => {
    const { width, height } = rotateSize(400, 300, 270)
    expect(width).toBeCloseTo(300)
    expect(height).toBeCloseTo(400)
  })

  it('is unchanged at 180 degrees', () => {
    const { width, height } = rotateSize(400, 300, 180)
    expect(width).toBeCloseTo(400)
    expect(height).toBeCloseTo(300)
  })

  it('produces the largest bounding box at 45 degrees', () => {
    const { width, height } = rotateSize(400, 300, 45)
    // Bounding box of a rotated rectangle is always >= both original dimensions.
    expect(width).toBeGreaterThan(400)
    expect(height).toBeGreaterThan(300)
  })
})

describe('clamp', () => {
  it('returns the value when within range', () => {
    expect(clamp(2, 1, 5)).toBe(2)
  })

  it('clamps to the minimum', () => {
    expect(clamp(-10, 1, 5)).toBe(1)
  })

  it('clamps to the maximum', () => {
    expect(clamp(99, 1, 5)).toBe(5)
  })
})

describe('parseCustomRatio', () => {
  it('parses a simple "W:H" ratio', () => {
    expect(parseCustomRatio('5:7')).toBeCloseTo(5 / 7)
  })

  it('parses a "W/H" ratio', () => {
    expect(parseCustomRatio('16/9')).toBeCloseTo(16 / 9)
  })

  it('accepts decimal values and surrounding whitespace', () => {
    expect(parseCustomRatio(' 4.5 : 3 ')).toBeCloseTo(4.5 / 3)
  })

  it('returns null for garbage input', () => {
    expect(parseCustomRatio('not-a-ratio')).toBeNull()
    expect(parseCustomRatio('')).toBeNull()
    expect(parseCustomRatio('5:0')).toBeNull()
    expect(parseCustomRatio('-5:7')).toBeNull()
  })
})

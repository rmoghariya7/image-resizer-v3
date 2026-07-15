/**
 * Pure-function unit tests for the segmentation pre/post-processing math.
 *
 * Canvas-based functions (preprocessToTensor, resizeMaskToImage, and all of
 * composite.ts) rely on OffscreenCanvas, which is a browser API unavailable
 * under the `node` Vitest environment configured for this repo. Those paths
 * are exercised visually via the tool itself; this file covers normalizeMask,
 * which is pure numeric logic and the piece most likely to silently produce
 * a wrong-but-plausible-looking mask if the math regresses.
 */
import { describe, it, expect } from 'vitest'
import { normalizeMask, MODEL_INPUT_SIZE } from '../lib/preprocess'

describe('MODEL_INPUT_SIZE', () => {
  it('matches the U^2-Net / U^2-Netp reference input resolution', () => {
    expect(MODEL_INPUT_SIZE).toBe(320)
  })
})

describe('normalizeMask', () => {
  it('stretches an arbitrary range to fill [0, 1]', () => {
    const raw = new Float32Array([2, 4, 6, 8, 10])
    const out = normalizeMask(raw)
    expect(out[0]).toBeCloseTo(0, 5)
    expect(out[out.length - 1]).toBeCloseTo(1, 5)
    // Midpoint (6) should land at the midpoint of the stretched range.
    expect(out[2]).toBeCloseTo(0.5, 5)
  })

  it('preserves relative ordering (monotonic transform)', () => {
    const raw = new Float32Array([-3, 0, 1, 5, 100])
    const out = normalizeMask(raw)
    for (let i = 1; i < out.length; i++) {
      expect(out[i]).toBeGreaterThanOrEqual(out[i - 1])
    }
  })

  it('never produces NaN or negative values, even for a flat input', () => {
    // A perfectly uniform mask (e.g. an all-background or all-subject probe)
    // has max === min; the +1e-8 epsilon must prevent a divide-by-zero.
    const raw = new Float32Array(16).fill(0.42)
    const out = normalizeMask(raw)
    for (const v of out) {
      expect(Number.isNaN(v)).toBe(false)
      expect(v).toBeGreaterThanOrEqual(0)
    }
  })

  it('output values stay within [0, 1] for realistic sigmoid-like input', () => {
    const raw = new Float32Array([0.01, 0.2, 0.5, 0.8, 0.99])
    const out = normalizeMask(raw)
    for (const v of out) {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(1)
    }
  })

  it('returns an array of the same length as the input', () => {
    const raw = new Float32Array(320 * 320).fill(0.5)
    const out = normalizeMask(raw)
    expect(out.length).toBe(raw.length)
  })
})

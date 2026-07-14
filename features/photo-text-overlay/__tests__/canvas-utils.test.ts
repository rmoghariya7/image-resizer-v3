/**
 * Pure helper tests for the Photo Footer Generator canvas pipeline.
 *
 * composeFooterImage itself is a browser-only Canvas/Image pipeline (see
 * features/image-cropper/__tests__/canvas-utils.test.ts's header precedent)
 * and belongs in Playwright browser tests. The pure logic it depends on —
 * the reference-pixel scale factor, the smart-alignment layout-mode
 * decision, and the footer-height growth rule — is fully testable here
 * without a DOM, and is exactly what guarantees the live CSS preview and
 * the canvas export can never disagree or let Name/Date overlap.
 */

import { describe, it, expect } from 'vitest'
import {
  computeFooterHeight,
  REFERENCE_WIDTH,
  resolveFooterLayoutMode,
  scaleFactorFor,
} from '../lib/canvas-utils'

describe('scaleFactorFor', () => {
  it('returns 1 at the reference width', () => {
    expect(scaleFactorFor(REFERENCE_WIDTH)).toBe(1)
  })

  it('scales down proportionally for a narrower width', () => {
    expect(scaleFactorFor(500)).toBeCloseTo(0.5)
  })

  it('scales up proportionally for a wider width', () => {
    expect(scaleFactorFor(4000)).toBeCloseTo(4)
  })

  it('keeps a design value proportional to image width regardless of absolute size', () => {
    // A 42px design font size should render at the same *relative* size on a
    // 400px preview thumbnail and a 4000px full-resolution export.
    const designFontSize = 42
    const previewActual = designFontSize * scaleFactorFor(400)
    const exportActual = designFontSize * scaleFactorFor(4000)
    expect(exportActual / previewActual).toBeCloseTo(4000 / 400)
  })
})

describe('resolveFooterLayoutMode', () => {
  it('returns "empty" when neither Name nor Date is enabled', () => {
    expect(resolveFooterLayoutMode(false, 'left', false, 'right')).toBe('empty')
  })

  it('returns "name-only" when only Name is enabled', () => {
    expect(resolveFooterLayoutMode(true, 'center', false, 'right')).toBe('name-only')
  })

  it('returns "date-only" when only Date is enabled', () => {
    expect(resolveFooterLayoutMode(false, 'left', true, 'center')).toBe('date-only')
  })

  it('returns "row" when both are enabled with different alignments (default Name-left/Date-right)', () => {
    expect(resolveFooterLayoutMode(true, 'left', true, 'right')).toBe('row')
  })

  it('returns "row" for any pair of differing alignments', () => {
    expect(resolveFooterLayoutMode(true, 'center', true, 'left')).toBe('row')
    expect(resolveFooterLayoutMode(true, 'right', true, 'center')).toBe('row')
  })

  it('returns "stacked" when both are enabled with the same alignment, never letting them collide', () => {
    expect(resolveFooterLayoutMode(true, 'left', true, 'left')).toBe('stacked')
    expect(resolveFooterLayoutMode(true, 'center', true, 'center')).toBe('stacked')
    expect(resolveFooterLayoutMode(true, 'right', true, 'right')).toBe('stacked')
  })
})

describe('computeFooterHeight', () => {
  it('returns the configured height unchanged for non-stacked modes', () => {
    expect(computeFooterHeight('empty', 72, 28, 28, 6, 12)).toBe(72)
    expect(computeFooterHeight('name-only', 72, 28, 28, 6, 12)).toBe(72)
    expect(computeFooterHeight('date-only', 72, 28, 28, 6, 12)).toBe(72)
    expect(computeFooterHeight('row', 72, 28, 28, 6, 12)).toBe(72)
  })

  it('keeps the configured height in stacked mode when it already fits both lines', () => {
    // 28 + 6 + 28 + 12*2 = 86, so a configured 160 comfortably fits.
    expect(computeFooterHeight('stacked', 160, 28, 28, 6, 12)).toBe(160)
  })

  it('grows beyond the configured height in stacked mode when the two lines would not fit', () => {
    // 28 + 6 + 28 + 12*2 = 86, which is taller than a configured 40.
    const result = computeFooterHeight('stacked', 40, 28, 28, 6, 12)
    expect(result).toBe(86)
    expect(result).toBeGreaterThan(40)
  })

  it('never shrinks the footer below the configured height', () => {
    const result = computeFooterHeight('stacked', 200, 16, 16, 4, 8)
    expect(result).toBe(200)
  })
})

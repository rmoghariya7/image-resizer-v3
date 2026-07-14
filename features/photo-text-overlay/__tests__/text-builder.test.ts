import { describe, it, expect } from 'vitest'
import { getDateDisplayText } from '../lib/text-builder'
import type { DateSettings } from '../types'

const baseDate: DateSettings = {
  enabled: true,
  date: new Date('2026-07-14T00:00:00'),
  dateFormat: 'DD-MM-YYYY',
  alignment: 'right',
  fontSizePx: 28,
}

describe('getDateDisplayText', () => {
  it('formats the date using the selected format', () => {
    expect(getDateDisplayText(baseDate)).toBe('14-07-2026')
  })

  it('respects a different date format', () => {
    expect(getDateDisplayText({ ...baseDate, dateFormat: 'YYYY-MM-DD' })).toBe('2026-07-14')
  })

  it('respects the "MMM DD, YYYY" format', () => {
    expect(getDateDisplayText({ ...baseDate, dateFormat: 'MMM DD, YYYY' })).toBe('Jul 14, 2026')
  })

  it('respects the "DD MMM YYYY" format', () => {
    expect(getDateDisplayText({ ...baseDate, dateFormat: 'DD MMM YYYY' })).toBe('14 Jul 2026')
  })

  it('respects the "DD/MM/YYYY" format', () => {
    expect(getDateDisplayText({ ...baseDate, dateFormat: 'DD/MM/YYYY' })).toBe('14/07/2026')
  })

  it('reflects a different underlying date', () => {
    expect(
      getDateDisplayText({ ...baseDate, date: new Date('2025-01-05T00:00:00') }),
    ).toBe('05-01-2025')
  })
})

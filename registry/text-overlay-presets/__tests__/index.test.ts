import { describe, it, expect } from 'vitest'
import { getAllDateFormats, formatDateWithPattern } from '../index'

describe('formatDateWithPattern', () => {
  const date = new Date('2026-07-14T00:00:00')

  it('formats DD-MM-YYYY', () => {
    expect(formatDateWithPattern('DD-MM-YYYY', date)).toBe('14-07-2026')
  })

  it('formats YYYY-MM-DD', () => {
    expect(formatDateWithPattern('YYYY-MM-DD', date)).toBe('2026-07-14')
  })

  it('formats DD/MM/YYYY', () => {
    expect(formatDateWithPattern('DD/MM/YYYY', date)).toBe('14/07/2026')
  })

  it('formats "MMM DD, YYYY"', () => {
    expect(formatDateWithPattern('MMM DD, YYYY', date)).toBe('Jul 14, 2026')
  })

  it('formats "DD MMM YYYY"', () => {
    expect(formatDateWithPattern('DD MMM YYYY', date)).toBe('14 Jul 2026')
  })
})

describe('getAllDateFormats', () => {
  it('returns 5 formats, each with a rendered example', () => {
    const formats = getAllDateFormats(new Date('2026-07-14T00:00:00'))
    expect(formats).toHaveLength(5)
    expect(formats.every((f) => f.example.length > 0)).toBe(true)
  })
})

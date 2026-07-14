import {
  DATE_FORMATS,
  type DateFormatId,
  type DateFormatDefinition,
} from './schema'

export type { DateFormatId, DateFormatDefinition } from './schema'
export { DATE_FORMATS } from './schema'

// ─── Date format presets ──────────────────────────────────────────────────────

/**
 * Renders `date` using date-format preset `id`. This is the single source of
 * truth for date formatting — both the Date Format picker's example chips
 * (getAllDateFormats below) and the tool's actual footer renderer
 * (features/photo-text-overlay/lib/canvas-utils.ts) call this, so a preset's
 * displayed example always matches what gets printed in the footer.
 */
export function formatDateWithPattern(id: DateFormatId, date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = String(date.getFullYear())
  const MMM = date.toLocaleString('en-US', { month: 'short' })
  switch (id) {
    case 'DD-MM-YYYY': return `${dd}-${mm}-${yyyy}`
    case 'DD/MM/YYYY': return `${dd}/${mm}/${yyyy}`
    case 'YYYY-MM-DD': return `${yyyy}-${mm}-${dd}`
    case 'MMM DD, YYYY': return `${MMM} ${dd}, ${yyyy}`
    case 'DD MMM YYYY': return `${dd} ${MMM} ${yyyy}`
  }
}

export function getAllDateFormats(referenceDate: Date = new Date()): DateFormatDefinition[] {
  return DATE_FORMATS.map(id => ({ id, example: formatDateWithPattern(id, referenceDate) }))
}

export const DEFAULT_DATE_FORMAT: DateFormatId = 'DD-MM-YYYY'

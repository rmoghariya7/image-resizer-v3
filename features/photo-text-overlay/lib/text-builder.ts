import { formatDateWithPattern } from '@/registry/text-overlay-presets'
import type { DateSettings } from '../types'

/** Renders the Date field's display text using its chosen date-format preset. */
export function getDateDisplayText(date: DateSettings): string {
  return formatDateWithPattern(date.dateFormat, date.date)
}

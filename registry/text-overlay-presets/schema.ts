import { z } from 'zod'

// ─── Date format presets ──────────────────────────────────────────────────────
// The only preset data this registry holds. The Photo Footer Generator
// (features/photo-text-overlay) adds a Name and/or a Date inside a white
// footer band below the photo — position, style and template pickers were
// removed from the tool, so this registry no longer needs to hold them.
// Defaults to today's date; the pattern is resolved by
// registry/text-overlay-presets/index.ts's formatDateWithPattern, the single
// source of truth for date formatting.

export const DATE_FORMAT_SCHEMA = z.enum([
  'DD-MM-YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
  'MMM DD, YYYY',
  'DD MMM YYYY',
])

export type DateFormatId = z.infer<typeof DATE_FORMAT_SCHEMA>
export const DATE_FORMATS = DATE_FORMAT_SCHEMA.options satisfies readonly DateFormatId[]

export const dateFormatDefinitionSchema = z.object({
  id: DATE_FORMAT_SCHEMA,
  // Example rendered with today's date, shown on the preset chip.
  example: z.string().min(1),
})

export type DateFormatDefinition = z.infer<typeof dateFormatDefinitionSchema>

import { z } from 'zod'

// ─── Crop preset categories ──────────────────────────────────────────────────
// Mirrors the four preset categories shown in the Image Cropper UI.

export const CROP_CATEGORY_SCHEMA = z.enum([
  'government',
  'social',
  'developer',
  'custom',
])

export type CropCategory = z.infer<typeof CROP_CATEGORY_SCHEMA>
export const CROP_CATEGORIES = CROP_CATEGORY_SCHEMA.options satisfies readonly CropCategory[]

export const cropOutputFormatSchema = z.enum(['jpeg', 'png', 'webp'])
export type CropOutputFormat = z.infer<typeof cropOutputFormatSchema>

// ─── CropPreset schema ────────────────────────────────────────────────────────
//
// `aspect` is the crop-area lock (width / height). `null` means free-form —
// the user can drag the crop box to any shape (Custom category only).
//
// `outputWidth` / `outputHeight`, when present, resize the final crop to those
// exact pixels (goal-first: the user never sees or sets these numbers). When
// absent, the cropped region is exported at its native resolution — used by
// the Custom category's ratio chips and Free crop, where "exact pixels" isn't
// a meaningful goal.

export const cropPresetSchema = z.object({
  id: z.string().min(1),
  category: CROP_CATEGORY_SCHEMA,
  name: z.string().min(1),
  // Short helper line shown under the preset chip, e.g. "600 × 600 px · 2×2 in"
  description: z.string().min(1),
  // Width / height ratio the crop box is locked to. `null` = free-form.
  aspect: z.number().positive().nullable(),
  outputWidth: z.number().int().positive().optional(),
  outputHeight: z.number().int().positive().optional(),
  format: cropOutputFormatSchema,
  // JPEG has no alpha channel — background shown behind transparent PNG areas.
  backgroundFill: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex colour')
    .optional(),
})

export type CropPreset = z.infer<typeof cropPresetSchema>

import { z } from 'zod'

// ─── Preset key enums ────────────────────────────────────────────────────────
// These are the single source of truth for valid preset keys.
// Add a new key here when adding a new preset file.

export const IMAGE_PRESET_KEY_SCHEMA = z.enum([
  'upsc',
  'gpsc',
  'nda',
  'aadhaar',
  'pan-card',
  'passport-india',
  'voter-id',
  'signature-20kb',
  // Phase 3 — Signature expansion
  'signature-10kb',
  'signature-30kb',
  'signature-50kb',
  // Phase 4 — Exam expansion
  'ssc',
  'railway',
  'ibps',
  'bank-exam',
  'ugc-net',
  // Phase 5 — Document expansion
  'driving-licence',
  'visa',
  'job-application',
  'resume-photo',
])

export const COMPRESS_PRESET_KEY_SCHEMA = z.enum([
  'compress-15kb',
  'compress-20kb',
  'compress-25kb',
  'compress-30kb',
  'compress-40kb',
  'compress-50kb',
  'compress-75kb',
  'compress-100kb',
  'compress-150kb',
  'compress-200kb',
  'compress-500kb',
  'compress-1mb',
])

export const PRESET_KEY_SCHEMA = z.union([
  IMAGE_PRESET_KEY_SCHEMA,
  COMPRESS_PRESET_KEY_SCHEMA,
])

export type ImagePresetKey = z.infer<typeof IMAGE_PRESET_KEY_SCHEMA>
export type CompressPresetKey = z.infer<typeof COMPRESS_PRESET_KEY_SCHEMA>
export type PresetKey = z.infer<typeof PRESET_KEY_SCHEMA>

// Runtime arrays for categorisation (not used for type narrowing)
export const IMAGE_PRESET_KEYS = IMAGE_PRESET_KEY_SCHEMA.options satisfies readonly ImagePresetKey[]
export const COMPRESS_PRESET_KEYS = COMPRESS_PRESET_KEY_SCHEMA.options satisfies readonly CompressPresetKey[]

// ─── Shared sub-schemas ──────────────────────────────────────────────────────

export const outputFormatSchema = z.enum(['jpeg', 'png', 'webp'])
export type OutputFormat = z.infer<typeof outputFormatSchema>

// ─── ImagePreset schema ──────────────────────────────────────────────────────

export const imagePresetSchema = z.object({
  key: IMAGE_PRESET_KEY_SCHEMA,
  kind: z.literal('image'),

  // Output dimensions
  widthPx: z.number().int().positive(),
  heightPx: z.number().int().positive(),
  dpi: z.number().int().positive(),

  // Encoding
  format: outputFormatSchema,
  startQuality: z.number().int().min(1).max(100),
  maxSizeKB: z.number().positive().optional(),

  // Processing behaviour
  aspectRatioLock: z.boolean(),
  backgroundFill: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex colour')
    .optional(),

  // Human-readable labels used in the UI (never used for processing logic)
  displayDimensions: z.string(),
  displayFormat: z.string(),
  displayMaxSize: z.string().optional(),
})

export type ImagePreset = z.infer<typeof imagePresetSchema>

// ─── CompressPreset schema ───────────────────────────────────────────────────

export const compressPresetSchema = z.object({
  key: COMPRESS_PRESET_KEY_SCHEMA,
  kind: z.literal('compress'),

  targetKB: z.number().positive(),
  minQuality: z.number().int().min(1).max(100),
  maxQuality: z.number().int().min(1).max(100),

  // When false, JPEG conversion is allowed if PNG cannot reach targetKB
  preserveFormat: z.boolean(),

  displayMaxSize: z.string(),
})

export const compressPresetRefinedSchema = compressPresetSchema.refine(
  p => p.minQuality <= p.maxQuality,
  { message: 'minQuality must be ≤ maxQuality', path: ['minQuality'] },
)

export type CompressPreset = z.infer<typeof compressPresetSchema>

// ─── Discriminated union ─────────────────────────────────────────────────────

export const presetSchema = z.discriminatedUnion('kind', [
  imagePresetSchema,
  compressPresetSchema,
])

export type Preset = z.infer<typeof presetSchema>

// ─── Type guards ─────────────────────────────────────────────────────────────

export function isImagePreset(preset: Preset): preset is ImagePreset {
  return preset.kind === 'image'
}

export function isCompressPreset(preset: Preset): preset is CompressPreset {
  return preset.kind === 'compress'
}

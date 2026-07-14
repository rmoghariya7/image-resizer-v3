import { CROP_CATEGORIES, type CropCategory, type CropPreset } from './schema'
import { governmentCropPresets } from './categories/government'
import { socialCropPresets } from './categories/social'
import { developerCropPresets } from './categories/developer'
import { customCropPresets, CUSTOM_RATIO_SENTINEL_ID } from './categories/custom'

export type { CropCategory, CropPreset, CropOutputFormat } from './schema'
export { CROP_CATEGORIES, CUSTOM_RATIO_SENTINEL_ID }

// ─── Category metadata (labels shown on the tab bar) ─────────────────────────

export const CROP_CATEGORY_LABELS: Record<CropCategory, string> = {
  government: 'Government',
  social: 'Social Media',
  developer: 'Developer',
  custom: 'Custom',
}

// ─── Registry map ─────────────────────────────────────────────────────────────

const ALL_CROP_PRESETS: readonly CropPreset[] = Object.freeze([
  ...governmentCropPresets,
  ...socialCropPresets,
  ...developerCropPresets,
  ...customCropPresets,
])

const CROP_PRESET_MAP = new Map<string, CropPreset>(
  ALL_CROP_PRESETS.map(p => [p.id, p]),
)

// ─── Registry functions ───────────────────────────────────────────────────────

export function getCropPreset(id: string): CropPreset | undefined {
  return CROP_PRESET_MAP.get(id)
}

export function getAllCropPresets(): CropPreset[] {
  return [...ALL_CROP_PRESETS]
}

export function getCropPresetsByCategory(category: CropCategory): CropPreset[] {
  return ALL_CROP_PRESETS.filter(p => p.category === category)
}

/** Default preset shown on first load — Government category, Passport preset. */
export const DEFAULT_CROP_PRESET_ID = 'gov-passport'

import {
  type Preset,
  type ImagePreset,
  type CompressPreset,
  type PresetKey,
  isImagePreset,
  isCompressPreset,
} from '@/registry/presets/schema'
import { imagePresets } from './image'
import { compressPresets } from './compress'

// ─── Registry map ─────────────────────────────────────────────────────────────

const ALL_PRESETS: readonly Preset[] = Object.freeze([
  ...imagePresets,
  ...compressPresets,
])

const PRESET_MAP = new Map<PresetKey, Preset>(
  ALL_PRESETS.map(p => [p.key as PresetKey, p]),
)

// ─── Registry functions ───────────────────────────────────────────────────────

export function getPreset(key: PresetKey): Preset {
  const preset = PRESET_MAP.get(key)
  if (!preset) {
    throw new Error(`[PresetRegistry] Preset not found: "${key}"`)
  }
  return preset
}

export function getImagePreset(key: PresetKey): ImagePreset {
  const preset = getPreset(key)
  if (!isImagePreset(preset)) {
    throw new Error(`[PresetRegistry] "${key}" is not an image preset`)
  }
  return preset
}

export function getCompressPreset(key: PresetKey): CompressPreset {
  const preset = getPreset(key)
  if (!isCompressPreset(preset)) {
    throw new Error(`[PresetRegistry] "${key}" is not a compress preset`)
  }
  return preset
}

export function getAllPresets(): Preset[] {
  return [...ALL_PRESETS]
}

// Re-export type guards for convenience
export { isImagePreset, isCompressPreset }

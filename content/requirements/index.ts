import type { RequirementsContent } from '@/content/types'
import type { PresetKey } from '@/types/registry'
import { upscRequirements } from './presets/upsc'
import { gpscRequirements } from './presets/gpsc'
import { ndaRequirements } from './presets/nda'
import { aadhaarRequirements } from './presets/aadhaar'
import { panCardRequirements } from './presets/pan-card'
import { passportIndiaRequirements } from './presets/passport-india'
import { voterIdRequirements } from './presets/voter-id'
import { signature20kbRequirements } from './presets/signature-20kb'
import { compress20kbRequirements } from './presets/compress-20kb'
import { compress50kbRequirements } from './presets/compress-50kb'
import { compress100kbRequirements } from './presets/compress-100kb'

// ─── Registry map ─────────────────────────────────────────────────────────────

const REQUIREMENTS_MAP = new Map<PresetKey, RequirementsContent>([
  ['upsc', upscRequirements],
  ['gpsc', gpscRequirements],
  ['nda', ndaRequirements],
  ['aadhaar', aadhaarRequirements],
  ['pan-card', panCardRequirements],
  ['passport-india', passportIndiaRequirements],
  ['voter-id', voterIdRequirements],
  ['signature-20kb', signature20kbRequirements],
  ['compress-20kb', compress20kbRequirements],
  ['compress-50kb', compress50kbRequirements],
  ['compress-100kb', compress100kbRequirements],
])

// ─── Lookup ───────────────────────────────────────────────────────────────────

/**
 * Returns the RequirementsContent for a given preset key, or undefined.
 * O(1) lookup — safe to call during SSR/static generation.
 */
export function getRequirements(presetKey: PresetKey): RequirementsContent | undefined {
  return REQUIREMENTS_MAP.get(presetKey)
}

/**
 * Returns all RequirementsContent entries.
 * Useful for build-time validation or sitemap generation.
 */
export function getAllRequirements(): readonly RequirementsContent[] {
  return [...REQUIREMENTS_MAP.values()]
}

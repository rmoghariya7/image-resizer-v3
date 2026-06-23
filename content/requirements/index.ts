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
import { signature10kbRequirements } from './presets/signature-10kb'
import { signature30kbRequirements } from './presets/signature-30kb'
import { signature50kbRequirements } from './presets/signature-50kb'
import { sscRequirements } from './presets/ssc'
import { railwayRequirements } from './presets/railway'
import { ibpsRequirements } from './presets/ibps'
import { bankExamRequirements } from './presets/bank-exam'
import { ugcNetRequirements } from './presets/ugc-net'
import { drivingLicenceRequirements } from './presets/driving-licence'
import { visaRequirements } from './presets/visa'
import { jobApplicationRequirements } from './presets/job-application'
import { resumePhotoRequirements } from './presets/resume-photo'
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
  ['signature-10kb', signature10kbRequirements],
  ['signature-30kb', signature30kbRequirements],
  ['signature-50kb', signature50kbRequirements],
  ['ssc', sscRequirements],
  ['railway', railwayRequirements],
  ['ibps', ibpsRequirements],
  ['bank-exam', bankExamRequirements],
  ['ugc-net', ugcNetRequirements],
  ['driving-licence', drivingLicenceRequirements],
  ['visa', visaRequirements],
  ['job-application', jobApplicationRequirements],
  ['resume-photo', resumePhotoRequirements],
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

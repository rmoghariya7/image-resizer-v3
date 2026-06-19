import type { ImagePreset } from '@/registry/presets/schema'
import { upscPreset } from './upsc'
import { gpscPreset } from './gpsc'
import { ndaPreset } from './nda'
import { aadhaarPreset } from './aadhaar'
import { panCardPreset } from './pan-card'
import { passportIndiaPreset } from './passport'
import { voterIdPreset } from './voter-id'
import { signature20kbPreset } from './signature-20kb'

export const imagePresets: readonly ImagePreset[] = [
  upscPreset,
  gpscPreset,
  ndaPreset,
  aadhaarPreset,
  panCardPreset,
  passportIndiaPreset,
  voterIdPreset,
  signature20kbPreset,
]

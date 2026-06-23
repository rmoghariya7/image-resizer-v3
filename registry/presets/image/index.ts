import type { ImagePreset } from '@/registry/presets/schema'
import { upscPreset } from './upsc'
import { gpscPreset } from './gpsc'
import { ndaPreset } from './nda'
import { aadhaarPreset } from './aadhaar'
import { panCardPreset } from './pan-card'
import { passportIndiaPreset } from './passport'
import { voterIdPreset } from './voter-id'
import { signature20kbPreset } from './signature-20kb'
import { signature10kbPreset } from './signature-10kb'
import { signature30kbPreset } from './signature-30kb'
import { signature50kbPreset } from './signature-50kb'
import { sscPreset } from './ssc'
import { railwayPreset } from './railway'
import { ibpsPreset } from './ibps'
import { bankExamPreset } from './bank-exam'
import { ugcNetPreset } from './ugc-net'
import { drivingLicencePreset } from './driving-licence'
import { visaPreset } from './visa'
import { jobApplicationPreset } from './job-application'
import { resumePhotoPreset } from './resume-photo'

export const imagePresets: readonly ImagePreset[] = [
  upscPreset,
  gpscPreset,
  ndaPreset,
  aadhaarPreset,
  panCardPreset,
  passportIndiaPreset,
  voterIdPreset,
  signature20kbPreset,
  signature10kbPreset,
  signature30kbPreset,
  signature50kbPreset,
  sscPreset,
  railwayPreset,
  ibpsPreset,
  bankExamPreset,
  ugcNetPreset,
  drivingLicencePreset,
  visaPreset,
  jobApplicationPreset,
  resumePhotoPreset,
]

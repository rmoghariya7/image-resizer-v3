import type { RequirementsContent } from '@/content/types'

export const drivingLicenceRequirements: RequirementsContent = {
  presetKey: 'driving-licence',
  officialTitle: 'Sarathi Driving Licence Application Photo Requirements',
  introduction:
    'The Sarathi portal for Indian driving licence applications requires a passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, under 200 KB.',
  background: 'Plain white background — no coloured or patterned backgrounds',
  notes: [
    { text: 'Photo must be taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible, forward-facing, with a neutral expression', critical: true },
    { text: 'No sunglasses or tinted lenses' },
    { text: 'The same photo is used for Learner Licence (LL) and Driving Licence (DL) applications' },
    { text: 'Do not wear a helmet or cap in the photo' },
  ],
  officialSource: 'Ministry of Road Transport and Highways — Sarathi Portal Guidelines',
  updatedAt: '2026-06-23',
}

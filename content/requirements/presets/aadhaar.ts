import type { RequirementsContent } from '@/content/types'

export const aadhaarRequirements: RequirementsContent = {
  presetKey: 'aadhaar',
  officialTitle: 'UIDAI Aadhaar Photo Update Requirements',
  introduction:
    'The myAadhaar portal and Aadhaar enrolment centres accept photos at 200 × 200 pixels, JPEG, under 50 KB. Square cropping is mandatory.',
  background: 'Plain white or light-coloured background',
  notes: [
    { text: 'Photo must be recent — taken within the last year', critical: true },
    { text: 'Face must be centered; square crop is mandatory for this portal' },
    { text: 'No filters, face masks, or heavy makeup' },
    { text: 'Eyes open and clearly visible; no sunglasses' },
  ],
  officialSource: 'UIDAI (Unique Identification Authority of India)',
  updatedAt: '2026-06-01',
}

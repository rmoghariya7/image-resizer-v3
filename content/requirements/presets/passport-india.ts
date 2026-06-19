import type { RequirementsContent } from '@/content/types'

export const passportIndiaRequirements: RequirementsContent = {
  presetKey: 'passport-india',
  officialTitle: 'Ministry of External Affairs Passport Photo Requirements',
  introduction:
    'Indian passports require a 2 × 2 inch (51 × 51 mm) square photo on a plain white background. The digital version must be 600 × 600 px, JPEG, under 500 KB.',
  background: 'Plain white background — no patterns, shadows, or gradients',
  attire: 'Formal or semi-formal; no white clothing (merges with background)',
  notes: [
    { text: 'Photo must be recent — taken within the last 6 months', critical: true },
    { text: 'Neutral expression, mouth closed, eyes open' },
    { text: 'Face must occupy 70–80% of the frame' },
    { text: 'No shadows on face or background', critical: true },
    { text: 'Spectacles not permitted in passport photos as of 2023' },
    { text: 'Matte or semi-matte finish preferred; no glossy photos' },
  ],
  officialSource: 'Ministry of External Affairs — Passport Seva Portal',
  updatedAt: '2026-06-01',
}

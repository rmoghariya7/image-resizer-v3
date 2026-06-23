import type { RequirementsContent } from '@/content/types'

export const jobApplicationRequirements: RequirementsContent = {
  presetKey: 'job-application',
  officialTitle: 'Job Application Photo Requirements',
  introduction:
    'Most Indian job portals and government employment sites accept a passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, under 200 KB.',
  background: 'Plain white or light-grey background — formal and professional',
  notes: [
    { text: 'Wear formal business attire — collared shirt or professional dress', critical: true },
    { text: 'Face must be clearly visible and forward-facing with a pleasant expression' },
    { text: 'Good, even lighting — avoid harsh shadows' },
    { text: 'Photo should be taken within the last 6–12 months' },
    { text: 'For government portals (NCS, employment exchange), a plain white background is mandatory' },
  ],
  officialSource: 'National Career Service (NCS) Portal Guidelines',
  updatedAt: '2026-06-23',
}

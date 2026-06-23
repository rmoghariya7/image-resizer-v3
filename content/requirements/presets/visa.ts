import type { RequirementsContent } from '@/content/types'

export const visaRequirements: RequirementsContent = {
  presetKey: 'visa',
  officialTitle: 'Visa Application Photo Requirements',
  introduction:
    'Standard visa photo specification for online applications: 600 × 600 px at 300 DPI, JPEG format, plain white background, under 500 KB. Covers Indian e-Visa and most international visa portals.',
  background: 'Plain white background — mandatory for all visa photos',
  notes: [
    { text: 'Face must be centred and occupy 70–80% of the frame', critical: true },
    { text: 'Eyes must be open, clearly visible, looking directly at the camera', critical: true },
    { text: 'No sunglasses, tinted lenses, or any eyewear unless medically required' },
    { text: 'Neutral facial expression — no smiling with open mouth' },
    { text: 'For US DS-160: file must be under 300 KB; this tool targets under 500 KB for all portals' },
    { text: 'Head coverings are only allowed for religious reasons and must not obscure the face' },
  ],
  officialSource: 'USCIS / UKVI / Schengen Area Standard Visa Photo Requirements',
  updatedAt: '2026-06-23',
}

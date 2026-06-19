import type { RequirementsContent } from '@/content/types'

export const ndaRequirements: RequirementsContent = {
  presetKey: 'nda',
  officialTitle: 'NDA / NA Examination Photo Requirements',
  introduction:
    'UPSC conducts the NDA and NA examinations. The photo specification matches the Civil Services spec: 413 × 531 px (3.5 × 4.5 cm at 300 DPI), under 300 KB.',
  background: 'Plain white or off-white only',
  attire: 'Formal dress; no uniform',
  notes: [
    { text: 'Photo must be recent — taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible, frontal view, eyes open' },
    { text: 'No spectacles, caps, or head coverings (except religious)' },
    { text: 'The portal validates both pixel dimensions and file size' },
  ],
  officialSource: 'UPSC NDA & NA Examination Official Notification',
  updatedAt: '2026-06-01',
}

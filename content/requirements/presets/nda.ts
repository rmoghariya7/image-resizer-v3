import type { RequirementsContent } from '@/content/types'

export const ndaRequirements: RequirementsContent = {
  presetKey: 'nda',
  officialTitle: 'NDA / NA Examination Photo Requirements',
  introduction:
    'UPSC conducts the NDA and NA examinations. The photo must be 413 x 531 px (3.5 x 4.5 cm at 300 DPI), JPEG format, under 300 KB. Both pixel dimensions and file size are validated at upload.',
  background: 'Plain white background only. Off-white is acceptable but avoid any coloured or textured backgrounds.',
  attire: 'Formal civilian dress. NDA candidates should not wear uniform in the application photo.',
  notes: [
    { text: 'Use a photo taken in the last 6 months. The portal may cross-check photo date metadata.', critical: true },
    { text: 'Your full face must be visible. Eyes open, looking directly at the camera. No tilted or profile shots.' },
    { text: 'Do not wear glasses. Caps and head coverings are not allowed unless required for religious practice.' },
    { text: 'The NDA portal rejects uploads where either the resolution or file size does not match the specification. Use the preset tool to avoid both.' },
  ],
  officialSource: 'UPSC NDA & NA Examination Official Notification',
  updatedAt: '2026-06-24',
}

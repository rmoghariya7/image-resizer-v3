import type { RequirementsContent } from '@/content/types'

export const upscRequirements: RequirementsContent = {
  presetKey: 'upsc',
  officialTitle: 'UPSC Examination Photo Requirements',
  introduction:
    'The UPSC online application system performs automated checks on photo dimensions and file size. Photos that do not meet the exact spec are rejected before the form can be submitted.',
  background: 'Plain white or off-white only',
  attire: 'Formal dress; no uniform',
  notes: [
    { text: 'Photo must be recent — taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible, frontal view, eyes open' },
    { text: 'No spectacles unless medically necessary (with supporting certificate)' },
    { text: 'No caps, hats, or head coverings (except for religious reasons)' },
    { text: 'The same photo and signature are used throughout the application cycle' },
  ],
  officialSource: 'UPSC Civil Services Examination Official Notification 2026',
  updatedAt: '2026-06-01',
}

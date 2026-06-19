import type { RequirementsContent } from '@/content/types'

export const gpscRequirements: RequirementsContent = {
  presetKey: 'gpsc',
  officialTitle: 'GPSC Examination Photo Requirements',
  introduction:
    'GPSC uses the same physical dimensions as UPSC (3.5 × 4.5 cm) but with a stricter 200 KB file-size limit. Both requirements are enforced at upload time.',
  background: 'Plain white or off-white only',
  attire: 'Formal dress; no uniform',
  notes: [
    { text: 'Photo must be recent — taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible, frontal view, eyes open' },
    { text: 'Signature must be uploaded separately; same file-size limits apply' },
    { text: 'No dark backgrounds, patterns, or outdoor photos' },
  ],
  officialSource: 'GPSC Official Advertisement / Notification',
  updatedAt: '2026-06-01',
}

import type { RequirementsContent } from '@/content/types'

export const compress100kbRequirements: RequirementsContent = {
  presetKey: 'compress-100kb',
  officialTitle: 'Compress Image to 100 KB',
  introduction:
    'A 100 KB limit applies to Passport Seva, some scholarship portals, and high-resolution identity document uploads. The original file format is preserved and quality is kept as high as possible.',
  notes: [
    { text: 'The original file format is preserved — JPEG stays JPEG, PNG stays PNG' },
    { text: 'At 100 KB, most photos retain excellent visual quality' },
    { text: 'For Passport Seva uploads, use the Passport Photo preset first, then compress if needed' },
    { text: 'Quality degradation at 100 KB is usually imperceptible for typical portrait photos' },
  ],
  updatedAt: '2026-06-01',
}

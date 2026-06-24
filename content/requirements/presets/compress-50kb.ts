import type { RequirementsContent } from '@/content/types'

export const compress50kbRequirements: RequirementsContent = {
  presetKey: 'compress-50kb',
  officialTitle: 'Compress Image to 50 KB',
  introduction:
    'A 50 KB limit is the most common file-size cap across Indian government portals, used by Aadhaar, PAN card, Voter ID, and dozens of state portals. The original file format is preserved where possible.',
  notes: [
    { text: 'The file format is not changed. If you upload a JPEG, you get a JPEG back. Same for PNG.' },
    { text: 'The compression level is adjusted automatically to get as close to 50 KB as possible without going over.' },
    { text: 'If your PNG cannot reach 50 KB while staying as PNG, try converting it to JPEG first for better results.' },
    { text: 'Start with a well-lit, clear photo. The better the source image, the better the compressed output looks at 50 KB.' },
  ],
  updatedAt: '2026-06-24',
}

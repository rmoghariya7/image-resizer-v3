import type { RequirementsContent } from '@/content/types'

export const compress50kbRequirements: RequirementsContent = {
  presetKey: 'compress-50kb',
  officialTitle: 'Compress Image to 50 KB',
  introduction:
    'A 50 KB limit is the most common file-size cap across Indian government portals — used by UPSC, Aadhaar, PAN card, Voter ID, and dozens of state portals. The original file format (JPEG, PNG, WebP) is preserved.',
  notes: [
    { text: 'The original file format is preserved — JPEG stays JPEG, PNG stays PNG' },
    { text: 'Quality is binary-search optimised: highest quality that fits within 50 KB' },
    { text: 'WebP output is supported but some portals may not accept it; convert to JPEG if rejected' },
    { text: 'For best results, start with a clear, well-lit photo at the highest available quality' },
  ],
  updatedAt: '2026-06-01',
}

import type { RequirementsContent } from '@/content/types'

export const signature10kbRequirements: RequirementsContent = {
  presetKey: 'signature-10kb',
  officialTitle: 'Digital Signature Requirements (10 KB)',
  introduction:
    'Portals with strict storage limits require a scanned signature at 140 × 60 px, JPEG, under 10 KB. A clean white background and high contrast ink are essential at this file size.',
  background: 'White background — sign on plain white paper only',
  notes: [
    { text: 'Use a dark blue or black ink pen for maximum contrast — critical at very small file sizes', critical: true },
    { text: 'Leave at least 10 mm of white space around all edges of the signature' },
    { text: 'Scan at 200 DPI or photograph in bright, even lighting' },
    { text: 'No ruled lines, smudges, or marks around the signature' },
    { text: 'Keep the signature within the central 80% of the frame' },
  ],
  officialSource: 'Standard Government Portal Digital Signature Specification',
  updatedAt: '2026-06-23',
}

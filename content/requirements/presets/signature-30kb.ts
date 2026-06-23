import type { RequirementsContent } from '@/content/types'

export const signature30kbRequirements: RequirementsContent = {
  presetKey: 'signature-30kb',
  officialTitle: 'Digital Signature Requirements (30 KB)',
  introduction:
    'Bank exam and NTA portals accept a scanned signature at 140 × 60 px, JPEG, under 30 KB. A clean white background and high contrast are required.',
  background: 'White background — sign on plain white paper only',
  notes: [
    { text: 'Use a blue or black ink pen for maximum contrast', critical: true },
    { text: 'Leave at least 10 mm of white space around all edges of the signature' },
    { text: 'Scan at 200 DPI or photograph in bright, even lighting' },
    { text: 'No ruled lines, smudges, or marks around the signature' },
    { text: 'The signature must match your handwritten signature on the application form' },
  ],
  officialSource: 'IBPS / NTA Standard Digital Signature Specification',
  updatedAt: '2026-06-23',
}

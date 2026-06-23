import type { RequirementsContent } from '@/content/types'

export const signature50kbRequirements: RequirementsContent = {
  presetKey: 'signature-50kb',
  officialTitle: 'Digital Signature Requirements (50 KB)',
  introduction:
    'Document update portals (Aadhaar online, PAN services) accept a scanned signature at 140 × 60 px, JPEG, under 50 KB. White background with dark ink is mandatory.',
  background: 'White background — sign on plain white paper only',
  notes: [
    { text: 'Use a blue or black ink pen for clear visibility', critical: true },
    { text: 'Leave at least 10 mm of white space around all edges of the signature' },
    { text: 'Scan at 200–300 DPI or photograph in bright, even lighting' },
    { text: 'No ruled lines, smudges, or marks around the signature' },
    { text: 'Transparent PNG backgrounds are automatically converted to white' },
  ],
  officialSource: 'Standard Government Document Portal Signature Specification',
  updatedAt: '2026-06-23',
}

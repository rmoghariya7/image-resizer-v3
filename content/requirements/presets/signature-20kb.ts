import type { RequirementsContent } from '@/content/types'

export const signature20kbRequirements: RequirementsContent = {
  presetKey: 'signature-20kb',
  officialTitle: 'Digital Signature Requirements',
  introduction:
    'Most Indian government portals accept a scanned or photographed signature at 140 × 60 px, JPEG, under 20 KB. A clean white background is mandatory.',
  background: 'White background — sign on plain white paper only',
  notes: [
    { text: 'Use a blue or black ink pen for maximum contrast', critical: true },
    { text: 'Leave at least 10 mm of white space around all edges of the signature' },
    { text: 'Scan at 200 DPI or photograph in bright, even lighting' },
    { text: 'No ruled lines, smudges, or marks around the signature' },
    { text: 'The signature must match your handwritten signature on the application form' },
  ],
  officialSource: 'Standard Government Portal Digital Signature Specification',
  updatedAt: '2026-06-01',
}

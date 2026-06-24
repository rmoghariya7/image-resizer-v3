import type { RequirementsContent } from '@/content/types'

export const signature20kbRequirements: RequirementsContent = {
  presetKey: 'signature-20kb',
  officialTitle: 'Digital Signature Requirements (20 KB)',
  introduction:
    'UPSC, GPSC, NDA, SSC, and most Indian competitive exam portals require a scanned signature at 140 x 60 px, JPEG, under 20 KB. The signature must be on a plain white background with dark ink.',
  background: 'Plain white paper only. No ruled lines, grids, or coloured paper.',
  notes: [
    { text: 'Use a blue or black ink pen. The contrast between dark ink and white paper is what keeps the signature legible after compression.', critical: true },
    { text: 'Crop tightly around your signature, leaving about 10 mm of white border on each side.' },
    { text: 'A 200 DPI scan works well. If photographing, use natural light and a flat, steady surface.' },
    { text: 'Check that there are no ruled lines, dots, or stray marks from the paper visible in the background.' },
    { text: 'The signature you upload must match the one you write on paper at the exam centre. Use your standard, consistent signature.' },
  ],
  officialSource: 'UPSC / GPSC Digital Signature Upload Specification',
  updatedAt: '2026-06-24',
}

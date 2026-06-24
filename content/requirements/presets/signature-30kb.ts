import type { RequirementsContent } from '@/content/types'

export const signature30kbRequirements: RequirementsContent = {
  presetKey: 'signature-30kb',
  officialTitle: 'Digital Signature Requirements (30 KB)',
  introduction:
    'IBPS, SBI, RBI, and NTA exam portals require a scanned signature at 140 x 60 px, JPEG format, under 30 KB. This is the standard bank and education exam signature specification.',
  background: 'Plain white paper only. No grid paper, letterhead, or coloured backgrounds.',
  notes: [
    { text: 'Sign with a dark blue or black pen. The bank portal will display this image on the admit card and hall ticket, so clarity matters.', critical: true },
    { text: 'Scan the full page first, then crop to just the signature leaving a small white border on all sides.' },
    { text: 'Photograph in even, bright lighting if a scanner is not available. No shadows or glare on the signature.' },
    { text: 'Remove any dotted or ruled lines from the page before scanning, or use plain paper from the start.' },
    { text: 'Your signature on the portal must match what you sign on the application form and at the examination centre.' },
  ],
  officialSource: 'IBPS / NTA Standard Digital Signature Specification',
  updatedAt: '2026-06-24',
}

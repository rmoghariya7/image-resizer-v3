import type { RequirementsContent } from '@/content/types'

export const signature10kbRequirements: RequirementsContent = {
  presetKey: 'signature-10kb',
  officialTitle: 'Digital Signature Requirements (10 KB)',
  introduction:
    'Certain state government portals and older central government systems cap the signature upload at 10 KB. At this size, image quality depends almost entirely on the original scan quality.',
  background: 'Plain white paper only. Any background texture or colour will worsen quality at 10 KB.',
  notes: [
    { text: 'Use a dark black or dark blue pen. At 10 KB, contrast matters most. Light or faded ink will not survive the compression.', critical: true },
    { text: 'Keep at least 10 mm of white space on all four sides when cropping the signature image.' },
    { text: 'Scan at 300 DPI if possible, or photograph in natural daylight for the sharpest result.' },
    { text: 'The signature area must be completely clean. Any ruled lines, stray marks, or smudges will show up at this file size.' },
    { text: 'Keep your signature within the central 80% of the image frame. Edges get cropped during resizing.' },
  ],
  officialSource: 'Standard Government Portal Digital Signature Specification',
  updatedAt: '2026-06-24',
}

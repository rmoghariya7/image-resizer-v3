import type { RequirementsContent } from '@/content/types'

export const signature50kbRequirements: RequirementsContent = {
  presetKey: 'signature-50kb',
  officialTitle: 'Digital Signature Requirements (50 KB)',
  introduction:
    'Aadhaar online services and PAN card portals accept a scanned signature at 140 x 60 px, JPEG format, under 50 KB. The 50 KB limit is generous compared to exam portals, so quality is generally good at this size.',
  background: 'Plain white paper only. Avoid gel pens that smear or ballpoint pens with very thin ink.',
  notes: [
    { text: 'Sign with a black or dark blue ink pen on plain white paper. Avoid gel pens that smear when scanned.', critical: true },
    { text: 'Give your signature enough space on the page. A 10 mm white border on all sides avoids edge clipping after resizing.' },
    { text: 'Scan at 200 DPI. A camera photo also works if the lighting is even and the image is sharp.' },
    { text: 'Plain white paper only. Grid paper, lined paper, or watermarked stationery affects the output quality.' },
    { text: 'Transparent PNG backgrounds are filled with white automatically, so transparency is not an issue when uploading.' },
  ],
  officialSource: 'UIDAI / NSDL Document Portal Signature Specification',
  updatedAt: '2026-06-24',
}

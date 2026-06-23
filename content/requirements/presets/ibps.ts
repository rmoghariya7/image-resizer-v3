import type { RequirementsContent } from '@/content/types'

export const ibpsRequirements: RequirementsContent = {
  presetKey: 'ibps',
  officialTitle: 'IBPS Application Photo Requirements',
  introduction:
    'IBPS (Institute of Banking Personnel Selection) requires a passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, under 200 KB. Applies to IBPS PO, Clerk, SO, and RRB.',
  background: 'Plain white background — no studio props, coloured walls, or patterned backgrounds',
  notes: [
    { text: 'Photo must be taken within the last 6 months', critical: true },
    { text: 'Face must occupy 70–80% of the frame, forward-facing with a neutral expression', critical: true },
    { text: 'No sunglasses or tinted lenses' },
    { text: 'Good uniform lighting — no harsh shadows' },
    { text: 'Formal or semi-formal attire is recommended' },
  ],
  officialSource: 'IBPS Online Application Portal — Official Guidelines',
  updatedAt: '2026-06-23',
}

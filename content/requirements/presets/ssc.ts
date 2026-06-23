import type { RequirementsContent } from '@/content/types'

export const sscRequirements: RequirementsContent = {
  presetKey: 'ssc',
  officialTitle: 'SSC Application Photo Requirements',
  introduction:
    'The Staff Selection Commission (SSC) requires a recent passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, between 20 KB and 100 KB.',
  background: 'Plain white or off-white background — no patterns or colours',
  notes: [
    { text: 'Photo must be taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible, forward-facing, with a neutral expression', critical: true },
    { text: 'No sunglasses, coloured lenses, or head coverings (unless worn for religious reasons)' },
    { text: 'Good lighting — no harsh shadows on the face or background' },
    { text: 'Same photo is used for all SSC exams: CGL, CHSL, MTS, CPO, and GD' },
  ],
  officialSource: 'Staff Selection Commission (SSC) Online Application Notice',
  updatedAt: '2026-06-23',
}

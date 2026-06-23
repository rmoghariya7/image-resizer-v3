import type { RequirementsContent } from '@/content/types'

export const resumePhotoRequirements: RequirementsContent = {
  presetKey: 'resume-photo',
  officialTitle: 'Resume Photo Requirements',
  introduction:
    'Indian resume and CV passport-size photo standard: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, under 200 KB. A professional appearance is essential.',
  background: 'Plain white or light-grey background — professional and neutral',
  notes: [
    { text: 'Wear formal business attire — collared shirt for men, professional dress for women', critical: true },
    { text: 'Face must be clearly visible and forward-facing with a confident expression' },
    { text: 'Good, even lighting — avoid overhead shadows or backlit settings' },
    { text: 'Photo should be taken within the last 12 months' },
    { text: 'Compress the photo under 200 KB to keep the overall resume PDF size manageable' },
  ],
  officialSource: 'Standard Indian Resume / CV Convention',
  updatedAt: '2026-06-23',
}

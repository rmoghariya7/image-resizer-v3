import type { RequirementsContent } from '@/content/types'

export const bankExamRequirements: RequirementsContent = {
  presetKey: 'bank-exam',
  officialTitle: 'Bank Exam Application Photo Requirements',
  introduction:
    'SBI PO, SBI Clerk, and most public sector bank exams require a passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, under 50 KB.',
  background: 'Plain white background — no outdoor settings or coloured backgrounds',
  notes: [
    { text: 'Photo must be taken within the last 3 months for SBI', critical: true },
    { text: 'Face must be clearly visible, forward-facing, with a neutral expression', critical: true },
    { text: 'No sunglasses, tinted lenses, or caps' },
    { text: 'The 50 KB limit is set by SBI — using this ensures compatibility across all bank portals' },
    { text: 'Formal attire is recommended for a professional appearance' },
  ],
  officialSource: 'SBI / IBPS Official Recruitment Notification',
  updatedAt: '2026-06-23',
}

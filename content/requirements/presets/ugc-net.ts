import type { RequirementsContent } from '@/content/types'

export const ugcNetRequirements: RequirementsContent = {
  presetKey: 'ugc-net',
  officialTitle: 'UGC NET / NTA Application Photo Requirements',
  introduction:
    'NTA UGC NET requires a passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, between 10 KB and 100 KB. The same specification applies to CSIR NET and JRF.',
  background: 'Plain white background — no shadows or patterns',
  notes: [
    { text: 'Photo must be taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible and forward-facing', critical: true },
    { text: 'No sunglasses, dark glasses, or tinted lenses' },
    { text: 'The same specification applies to all NTA exams: CUET, CMAT, and CSIR NET' },
    { text: 'Upload the same photo file at every NTA application for consistency' },
  ],
  officialSource: 'NTA UGC NET Official Notification',
  updatedAt: '2026-06-23',
}

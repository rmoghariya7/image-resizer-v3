import type { RequirementsContent } from '@/content/types'

export const railwayRequirements: RequirementsContent = {
  presetKey: 'railway',
  officialTitle: 'Indian Railways (RRB/RRC) Application Photo Requirements',
  introduction:
    'Indian Railways recruitment exams (RRB NTPC, RRB Group D, RRC, RPF) require a passport-size photo: 3.5 × 4.5 cm (413 × 531 px at 300 DPI), JPEG format, under 100 KB.',
  background: 'Plain white background is mandatory — no outdoor or studio backgrounds',
  notes: [
    { text: 'Photo must be taken within the last 6 months', critical: true },
    { text: 'Face must be clearly visible, forward-facing, without sunglasses or tinted lenses', critical: true },
    { text: 'Uniform attire or formal clothing is preferred' },
    { text: 'No scarves or headbands unless worn for religious or medical reasons' },
    { text: 'The same photo specification applies to RPF Constable and Sub-Inspector applications' },
  ],
  officialSource: 'Railway Recruitment Board (RRB) Official Notification',
  updatedAt: '2026-06-23',
}

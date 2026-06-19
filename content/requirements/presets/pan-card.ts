import type { RequirementsContent } from '@/content/types'

export const panCardRequirements: RequirementsContent = {
  presetKey: 'pan-card',
  officialTitle: 'PAN Card Photo Requirements (NSDL / UTIITSL)',
  introduction:
    'Both NSDL and UTIITSL portals require a 200 × 230 px JPEG photo under 50 KB for online PAN card applications. The portrait orientation (taller than wide) is mandatory.',
  background: 'Plain white background',
  attire: 'Formal; no printed or bright-coloured clothing',
  notes: [
    { text: 'Photo must be recent — taken within the last 6 months', critical: true },
    { text: 'Full face visible; no dark glasses or face covering' },
    { text: 'The same photo is printed on the physical PAN card' },
    { text: 'No photo-editing, filters, or beauty modes' },
  ],
  officialSource: 'NSDL e-Gov / UTIITSL PAN Application Portal',
  updatedAt: '2026-06-01',
}

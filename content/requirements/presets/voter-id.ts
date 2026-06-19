import type { RequirementsContent } from '@/content/types'

export const voterIdRequirements: RequirementsContent = {
  presetKey: 'voter-id',
  officialTitle: 'Election Commission of India — Voter ID Photo Requirements',
  introduction:
    "The NVSP (National Voters' Service Portal) uses the same 3.5 × 4.5 cm portrait spec as most exam portals, but with a much stricter 50 KB file size limit.",
  background: 'Plain white or light-coloured background',
  notes: [
    { text: 'Photo must be recent — taken within the last 2 years', critical: true },
    { text: 'Face clearly visible, frontal view' },
    { text: 'No dark glasses or face coverings' },
    { text: 'The uploaded photo appears on the physical EPIC card' },
  ],
  officialSource: 'Election Commission of India — NVSP Portal',
  updatedAt: '2026-06-01',
}

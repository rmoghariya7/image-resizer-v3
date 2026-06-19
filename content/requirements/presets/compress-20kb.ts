import type { RequirementsContent } from '@/content/types'

export const compress20kbRequirements: RequirementsContent = {
  presetKey: 'compress-20kb',
  officialTitle: 'Compress Image to 20 KB',
  introduction:
    'A 20 KB limit is used by Aadhaar, some state government portals, and exam signature uploads. This tool uses binary-search quality optimisation to get as close to 20 KB as possible without going over.',
  notes: [
    { text: 'If the image cannot reach 20 KB as PNG, it is automatically converted to JPEG' },
    { text: 'Quality is maximised within the size constraint — no unnecessary degradation' },
    { text: 'Very large source images (above 5 MB) may show visible compression artefacts' },
    { text: 'For best results, crop to just the subject before compressing' },
  ],
  updatedAt: '2026-06-01',
}

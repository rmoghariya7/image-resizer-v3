import type { RequirementsContent } from '@/content/types'

export const compress100kbRequirements: RequirementsContent = {
  presetKey: 'compress-100kb',
  officialTitle: 'Compress Image to 100 KB',
  introduction:
    'A 100 KB limit applies to Passport Seva, some scholarship portals, and high-resolution identity document uploads. The original file format is preserved and quality is kept as high as possible.',
  notes: [
    { text: 'JPEG stays JPEG. PNG stays PNG. The format is not changed during compression.' },
    { text: 'At 100 KB, most passport-size and document photos look almost identical to the uncompressed original. Quality loss is minimal.' },
    { text: 'For Passport Seva uploads, resize your photo to the correct passport dimensions first using the Passport Photo preset, then compress only if the file is still too large.' },
    { text: 'If the output is still above 100 KB as PNG, you will need to resize the image dimensions first before compressing.' },
  ],
  updatedAt: '2026-06-24',
}

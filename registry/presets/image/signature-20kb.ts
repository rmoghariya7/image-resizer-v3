import type { ImagePreset } from '@/registry/presets/schema'

// Standard digital signature specification used across most Indian
// government exam and ID document portals: 140×60 px, JPEG, max 20 KB.
export const signature20kbPreset = {
  key: 'signature-20kb',
  kind: 'image',
  widthPx: 140,
  heightPx: 60,
  dpi: 96,
  format: 'jpeg',
  startQuality: 70,
  maxSizeKB: 20,
  aspectRatioLock: true,
  displayDimensions: '140 × 60 px',
  displayFormat: 'JPEG',
  displayMaxSize: '20 KB',
} satisfies ImagePreset

import type { ImagePreset } from '@/registry/presets/schema'

export const signature30kbPreset = {
  key: 'signature-30kb',
  kind: 'image',
  widthPx: 140,
  heightPx: 60,
  dpi: 96,
  format: 'jpeg',
  startQuality: 75,
  maxSizeKB: 30,
  aspectRatioLock: true,
  displayDimensions: '140 × 60 px',
  displayFormat: 'JPEG',
  displayMaxSize: '30 KB',
} satisfies ImagePreset

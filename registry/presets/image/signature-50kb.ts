import type { ImagePreset } from '@/registry/presets/schema'

export const signature50kbPreset = {
  key: 'signature-50kb',
  kind: 'image',
  widthPx: 140,
  heightPx: 60,
  dpi: 96,
  format: 'jpeg',
  startQuality: 80,
  maxSizeKB: 50,
  aspectRatioLock: true,
  displayDimensions: '140 × 60 px',
  displayFormat: 'JPEG',
  displayMaxSize: '50 KB',
} satisfies ImagePreset

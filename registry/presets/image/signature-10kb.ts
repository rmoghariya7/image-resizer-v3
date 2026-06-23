import type { ImagePreset } from '@/registry/presets/schema'

export const signature10kbPreset = {
  key: 'signature-10kb',
  kind: 'image',
  widthPx: 140,
  heightPx: 60,
  dpi: 96,
  format: 'jpeg',
  startQuality: 60,
  maxSizeKB: 10,
  aspectRatioLock: true,
  displayDimensions: '140 × 60 px',
  displayFormat: 'JPEG',
  displayMaxSize: '10 KB',
} satisfies ImagePreset

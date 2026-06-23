import type { ImagePreset } from '@/registry/presets/schema'

export const visaPreset = {
  key: 'visa',
  kind: 'image',
  widthPx: 600,
  heightPx: 600,
  dpi: 300,
  format: 'jpeg',
  startQuality: 90,
  maxSizeKB: 500,
  aspectRatioLock: true,
  backgroundFill: '#ffffff',
  displayDimensions: '600 × 600 px',
  displayFormat: 'JPEG',
  displayMaxSize: '500 KB',
} satisfies ImagePreset

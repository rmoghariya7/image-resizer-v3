import type { ImagePreset } from '@/registry/presets/schema'

export const gpscPreset = {
  key: 'gpsc',
  kind: 'image',
  widthPx: 413,
  heightPx: 531,
  dpi: 300,
  format: 'jpeg',
  startQuality: 85,
  maxSizeKB: 200,
  aspectRatioLock: true,
  displayDimensions: '3.5 × 4.5 cm',
  displayFormat: 'JPEG',
  displayMaxSize: '200 KB',
} satisfies ImagePreset

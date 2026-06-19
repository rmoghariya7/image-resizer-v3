import type { ImagePreset } from '@/registry/presets/schema'

export const upscPreset = {
  key: 'upsc',
  kind: 'image',
  widthPx: 413,
  heightPx: 531,
  dpi: 300,
  format: 'jpeg',
  startQuality: 90,
  maxSizeKB: 300,
  aspectRatioLock: true,
  displayDimensions: '3.5 × 4.5 cm',
  displayFormat: 'JPEG',
  displayMaxSize: '300 KB',
} satisfies ImagePreset

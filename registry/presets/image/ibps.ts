import type { ImagePreset } from '@/registry/presets/schema'

export const ibpsPreset = {
  key: 'ibps',
  kind: 'image',
  widthPx: 413,
  heightPx: 531,
  dpi: 300,
  format: 'jpeg',
  startQuality: 85,
  maxSizeKB: 200,
  aspectRatioLock: true,
  displayDimensions: '413 × 531 px',
  displayFormat: 'JPEG',
  displayMaxSize: '200 KB',
} satisfies ImagePreset

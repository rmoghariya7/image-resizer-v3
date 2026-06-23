import type { ImagePreset } from '@/registry/presets/schema'

export const ugcNetPreset = {
  key: 'ugc-net',
  kind: 'image',
  widthPx: 413,
  heightPx: 531,
  dpi: 300,
  format: 'jpeg',
  startQuality: 85,
  maxSizeKB: 100,
  aspectRatioLock: true,
  displayDimensions: '413 × 531 px',
  displayFormat: 'JPEG',
  displayMaxSize: '100 KB',
} satisfies ImagePreset

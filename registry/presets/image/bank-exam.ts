import type { ImagePreset } from '@/registry/presets/schema'

export const bankExamPreset = {
  key: 'bank-exam',
  kind: 'image',
  widthPx: 413,
  heightPx: 531,
  dpi: 300,
  format: 'jpeg',
  startQuality: 80,
  maxSizeKB: 50,
  aspectRatioLock: true,
  displayDimensions: '413 × 531 px',
  displayFormat: 'JPEG',
  displayMaxSize: '50 KB',
} satisfies ImagePreset

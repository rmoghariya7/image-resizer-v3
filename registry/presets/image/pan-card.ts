import type { ImagePreset } from '@/registry/presets/schema'

// NSDL/UTIITSL specification: 200×230 px, JPEG, max 50 KB
export const panCardPreset = {
  key: 'pan-card',
  kind: 'image',
  widthPx: 200,
  heightPx: 230,
  dpi: 96,
  format: 'jpeg',
  startQuality: 80,
  maxSizeKB: 50,
  aspectRatioLock: true,
  displayDimensions: '200 × 230 px',
  displayFormat: 'JPEG',
  displayMaxSize: '50 KB',
} satisfies ImagePreset

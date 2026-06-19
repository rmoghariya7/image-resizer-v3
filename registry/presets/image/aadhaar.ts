import type { ImagePreset } from '@/registry/presets/schema'

// UIDAI specification: 200×200 px, JPEG, max 50 KB
export const aadhaarPreset = {
  key: 'aadhaar',
  kind: 'image',
  widthPx: 200,
  heightPx: 200,
  dpi: 96,
  format: 'jpeg',
  startQuality: 80,
  maxSizeKB: 50,
  aspectRatioLock: true,
  displayDimensions: '200 × 200 px',
  displayFormat: 'JPEG',
  displayMaxSize: '50 KB',
} satisfies ImagePreset

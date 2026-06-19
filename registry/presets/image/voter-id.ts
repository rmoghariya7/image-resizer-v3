import type { ImagePreset } from '@/registry/presets/schema'

// Election Commission of India — EPIC enrolment photo spec
export const voterIdPreset = {
  key: 'voter-id',
  kind: 'image',
  widthPx: 413,
  heightPx: 531,
  dpi: 300,
  format: 'jpeg',
  startQuality: 80,
  maxSizeKB: 50,
  aspectRatioLock: true,
  displayDimensions: '3.5 × 4.5 cm',
  displayFormat: 'JPEG',
  displayMaxSize: '50 KB',
} satisfies ImagePreset

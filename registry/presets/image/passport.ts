import type { ImagePreset } from '@/registry/presets/schema'

// Indian passport specification: 2×2 inches (51×51 mm), white background,
// 600×600 px at 300 DPI, JPEG, max 500 KB.
export const passportIndiaPreset = {
  key: 'passport-india',
  kind: 'image',
  widthPx: 600,
  heightPx: 600,
  dpi: 300,
  format: 'jpeg',
  startQuality: 90,
  maxSizeKB: 500,
  aspectRatioLock: true,
  backgroundFill: '#FFFFFF',
  displayDimensions: '2 × 2 in (51 × 51 mm)',
  displayFormat: 'JPEG',
  displayMaxSize: '500 KB',
} satisfies ImagePreset

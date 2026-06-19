import type { CompressPreset } from '@/registry/presets/schema'

export const compress75kbPreset = {
  key: 'compress-75kb',
  kind: 'compress',
  targetKB: 75,
  minQuality: 42,
  maxQuality: 92,
  preserveFormat: true,
  displayMaxSize: '75 KB',
} satisfies CompressPreset

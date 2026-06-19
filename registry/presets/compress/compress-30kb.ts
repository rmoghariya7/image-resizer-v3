import type { CompressPreset } from '@/registry/presets/schema'

export const compress30kbPreset = {
  key: 'compress-30kb',
  kind: 'compress',
  targetKB: 30,
  minQuality: 28,
  maxQuality: 90,
  preserveFormat: false,
  displayMaxSize: '30 KB',
} satisfies CompressPreset

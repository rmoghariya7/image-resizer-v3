import type { CompressPreset } from '@/registry/presets/schema'

export const compress150kbPreset = {
  key: 'compress-150kb',
  kind: 'compress',
  targetKB: 150,
  minQuality: 50,
  maxQuality: 93,
  preserveFormat: true,
  displayMaxSize: '150 KB',
} satisfies CompressPreset

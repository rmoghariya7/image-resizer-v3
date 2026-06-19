import type { CompressPreset } from '@/registry/presets/schema'

export const compress200kbPreset = {
  key: 'compress-200kb',
  kind: 'compress',
  targetKB: 200,
  minQuality: 55,
  maxQuality: 93,
  preserveFormat: true,
  displayMaxSize: '200 KB',
} satisfies CompressPreset

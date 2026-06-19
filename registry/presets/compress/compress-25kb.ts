import type { CompressPreset } from '@/registry/presets/schema'

export const compress25kbPreset = {
  key: 'compress-25kb',
  kind: 'compress',
  targetKB: 25,
  minQuality: 25,
  maxQuality: 90,
  preserveFormat: false,
  displayMaxSize: '25 KB',
} satisfies CompressPreset

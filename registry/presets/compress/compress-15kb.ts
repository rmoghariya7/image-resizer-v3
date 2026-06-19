import type { CompressPreset } from '@/registry/presets/schema'

export const compress15kbPreset = {
  key: 'compress-15kb',
  kind: 'compress',
  targetKB: 15,
  minQuality: 20,
  maxQuality: 88,
  preserveFormat: false,
  displayMaxSize: '15 KB',
} satisfies CompressPreset

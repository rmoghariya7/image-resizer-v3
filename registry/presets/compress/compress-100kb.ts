import type { CompressPreset } from '@/registry/presets/schema'

export const compress100kbPreset = {
  key: 'compress-100kb',
  kind: 'compress',
  targetKB: 100,
  minQuality: 45,
  maxQuality: 92,
  preserveFormat: true,
  displayMaxSize: '100 KB',
} satisfies CompressPreset

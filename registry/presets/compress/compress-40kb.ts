import type { CompressPreset } from '@/registry/presets/schema'

export const compress40kbPreset = {
  key: 'compress-40kb',
  kind: 'compress',
  targetKB: 40,
  minQuality: 32,
  maxQuality: 92,
  preserveFormat: false,
  displayMaxSize: '40 KB',
} satisfies CompressPreset

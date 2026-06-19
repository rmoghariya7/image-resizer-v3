import type { CompressPreset } from '@/registry/presets/schema'

export const compress500kbPreset = {
  key: 'compress-500kb',
  kind: 'compress',
  targetKB: 500,
  minQuality: 60,
  maxQuality: 95,
  preserveFormat: true,
  displayMaxSize: '500 KB',
} satisfies CompressPreset

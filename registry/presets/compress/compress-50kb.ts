import type { CompressPreset } from '@/registry/presets/schema'

export const compress50kbPreset = {
  key: 'compress-50kb',
  kind: 'compress',
  targetKB: 50,
  minQuality: 40,
  maxQuality: 92,
  preserveFormat: true,
  displayMaxSize: '50 KB',
} satisfies CompressPreset

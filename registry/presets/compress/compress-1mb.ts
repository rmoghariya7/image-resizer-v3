import type { CompressPreset } from '@/registry/presets/schema'

export const compress1mbPreset = {
  key: 'compress-1mb',
  kind: 'compress',
  targetKB: 1024,
  minQuality: 70,
  maxQuality: 95,
  preserveFormat: true,
  displayMaxSize: '1 MB',
} satisfies CompressPreset

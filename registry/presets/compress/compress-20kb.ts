import type { CompressPreset } from '@/registry/presets/schema'

export const compress20kbPreset = {
  key: 'compress-20kb',
  kind: 'compress',
  targetKB: 20,
  minQuality: 35,
  maxQuality: 92,
  // Allow JPEG conversion when PNG cannot reach 20 KB at minQuality
  preserveFormat: false,
  displayMaxSize: '20 KB',
} satisfies CompressPreset

import type { CompressPreset } from '@/registry/presets/schema'

export const compress10kbPreset = {
  key: 'compress-10kb',
  kind: 'compress',
  targetKB: 10,
  // The tightest target in the registry — allow very low quality before the
  // engine falls back to dimension scaling.
  minQuality: 15,
  maxQuality: 85,
  // Allow JPEG conversion when PNG cannot reach 10 KB at minQuality
  preserveFormat: false,
  displayMaxSize: '10 KB',
} satisfies CompressPreset

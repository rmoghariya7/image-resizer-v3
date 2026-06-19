import type { CompressPreset } from '@/registry/presets/schema'
import { compress15kbPreset } from './compress-15kb'
import { compress20kbPreset } from './compress-20kb'
import { compress25kbPreset } from './compress-25kb'
import { compress30kbPreset } from './compress-30kb'
import { compress40kbPreset } from './compress-40kb'
import { compress50kbPreset } from './compress-50kb'
import { compress75kbPreset } from './compress-75kb'
import { compress100kbPreset } from './compress-100kb'
import { compress150kbPreset } from './compress-150kb'
import { compress200kbPreset } from './compress-200kb'
import { compress500kbPreset } from './compress-500kb'
import { compress1mbPreset } from './compress-1mb'

export const compressPresets: readonly CompressPreset[] = [
  compress15kbPreset,
  compress20kbPreset,
  compress25kbPreset,
  compress30kbPreset,
  compress40kbPreset,
  compress50kbPreset,
  compress75kbPreset,
  compress100kbPreset,
  compress150kbPreset,
  compress200kbPreset,
  compress500kbPreset,
  compress1mbPreset,
]

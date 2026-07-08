import type { ToolDefinition } from '@/registry/tools/schema'
import { RESIZE_PRESETS } from '@/registry/resize-presets'

export const imageResizerTool = {
  key: 'image-resizer',
  name: 'Image Resizer',
  description:
    'Resizes and compresses images to exact pixel dimensions and file-size targets. ' +
    'All processing runs in a Web Worker — nothing leaves the device.',
  featurePath: 'features/image-resizer',
  componentName: 'ImageResizerTool',
  processor: 'canvas-worker',
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeMB: 20,
  maxBatchSize: 1,
  capabilities: ['resize', 'compress', 'convert'],
  route: '/image-resizer',
  keywords: [
    'resize',
    'image resize',
    'resize image',
    'photo resize',
    'resize photo',
    'dimensions',
    'width',
    'height',
    'pixels',
    'resize by percentage',
    'aspect ratio',
    'stretch',
    'fit',
    'fill',
    // Preset labels — Instagram, YouTube Thumbnail, Favicon, Passport, etc.
    // Derived from the resize-presets registry so search stays in sync.
    ...RESIZE_PRESETS.map(p => p.label.toLowerCase()),
  ],
} satisfies ToolDefinition

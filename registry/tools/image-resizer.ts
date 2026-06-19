import type { ToolDefinition } from '@/registry/tools/schema'

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
} satisfies ToolDefinition

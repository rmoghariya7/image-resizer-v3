import type { ToolDefinition } from '@/registry/tools/schema'

export const imageConverterTool = {
  key: 'image-converter',
  name: 'Image Converter',
  description:
    'Converts images between JPEG, PNG and WebP without changing dimensions. ' +
    'All processing runs in a Web Worker — nothing leaves the device.',
  route: '/convert-image',
  featurePath: 'features/image-resizer',
  componentName: 'CustomResizeTool',
  processor: 'canvas-worker',
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeMB: 20,
  maxBatchSize: 1,
  capabilities: ['convert'],
  platformCategory: 'image',
  status: 'active',
  addedDate: '2026-07-14',
} satisfies ToolDefinition

import type { ToolDefinition } from '@/registry/tools/schema'

export const imageCropperTool = {
  key: 'image-cropper',
  name: 'Image Cropper',
  description:
    'Crops images to the exact framing needed for government forms, social media, and developer assets. ' +
    'Drag, zoom and rotate on an interactive canvas — nothing ever leaves your device.',
  route: '/crop-image',
  featurePath: 'features/image-cropper',
  componentName: 'ImageCropperTool',
  processor: 'canvas',
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeMB: 20,
  maxBatchSize: 1,
  capabilities: ['crop', 'convert'],
  platformCategory: 'image',
  status: 'active',
  addedDate: '2026-07-13',
} satisfies ToolDefinition

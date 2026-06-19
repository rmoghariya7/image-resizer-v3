import type { ToolDefinition } from '@/registry/tools/schema'

export const passportPhotoTool = {
  key: 'passport-photo',
  name: 'Passport Photo Maker',
  description:
    'Crops, resizes, and applies background fill for biometric passport photos. ' +
    'Detects face position and centres the crop automatically. Runs entirely in the browser.',
  featurePath: 'features/passport-photo',
  componentName: 'PassportPhotoTool',
  processor: 'canvas-worker',
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeMB: 20,
  maxBatchSize: 1,
  capabilities: ['resize', 'crop', 'compress', 'background-fill'],
} satisfies ToolDefinition

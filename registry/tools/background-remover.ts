import type { ToolDefinition } from '@/registry/tools/schema'

export const backgroundRemoverTool = {
  key: 'background-remover',
  name: 'AI Background Remover',
  description:
    'Removes the background from any photo using an AI segmentation model that runs entirely ' +
    'in the browser. Nothing is uploaded — the model downloads once, then every image is ' +
    'processed locally in a Web Worker.',
  route: '/background-remover',
  featurePath: 'features/background-remover',
  componentName: 'BackgroundRemoverTool',
  processor: 'onnx-worker',
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeMB: 20,
  maxBatchSize: 1,
  capabilities: ['remove-background'],
  platformCategory: 'ai',
  status: 'active',
  addedDate: '2026-07-15',
} satisfies ToolDefinition

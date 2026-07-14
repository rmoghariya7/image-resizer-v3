import type { ToolDefinition } from '@/registry/tools/schema'

export const pdfCompressorTool = {
  key: 'pdf-compressor',
  name: 'PDF Compressor',
  description:
    'Compresses PDF files to a target size using a WASM-based processing engine. ' +
    'All processing runs in a Web Worker — nothing leaves the device.',
  featurePath: 'features/pdf-compressor',
  componentName: 'PdfCompressorTool',
  processor: 'wasm',
  acceptedFormats: ['application/pdf'],
  maxFileSizeMB: 50,
  maxBatchSize: 1,
  capabilities: ['compress'],
  platformCategory: 'document',
  // No features/pdf-compressor implementation exists yet — keep out of any
  // homepage section that showcases working capability until it ships.
  status: 'coming-soon',
  addedDate: '2026-06-19',
} satisfies ToolDefinition

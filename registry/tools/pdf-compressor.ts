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
} satisfies ToolDefinition

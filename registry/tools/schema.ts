import { z } from 'zod'

// ─── Tool keys ───────────────────────────────────────────────────────────────
// Add a new entry here when adding a new feature module / tool.

export const TOOL_KEY_SCHEMA = z.enum([
  'image-resizer',
  'pdf-compressor',
  'passport-photo',
])

export type ToolKey = z.infer<typeof TOOL_KEY_SCHEMA>
export const TOOL_KEYS = TOOL_KEY_SCHEMA.options satisfies readonly ToolKey[]

// ─── Supporting enums ────────────────────────────────────────────────────────

export const processorTypeSchema = z.enum([
  'canvas-worker', // OffscreenCanvas inside a Web Worker — default for image ops
  'wasm',          // WASM module inside a Web Worker — for PDF
  'canvas',        // Main-thread Canvas fallback (no Worker support)
])

export type ProcessorType = z.infer<typeof processorTypeSchema>

export const toolCapabilitySchema = z.enum([
  'resize',
  'compress',
  'convert',
  'crop',
  'background-fill',
])

export type ToolCapability = z.infer<typeof toolCapabilitySchema>

export const mimeTypeSchema = z.enum([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
])

export type MimeType = z.infer<typeof mimeTypeSchema>

// ─── ToolDefinition schema ───────────────────────────────────────────────────

export const toolDefinitionSchema = z.object({
  key: TOOL_KEY_SCHEMA,
  name: z.string().min(3),
  description: z.string().min(20),

  // Resolves to features/<featurePath>/components/<componentName>
  // Used by the static TOOL_MAP in the goal page to dynamic-import the UI
  featurePath: z.string(),
  componentName: z.string(),

  processor: processorTypeSchema,
  acceptedFormats: z.array(mimeTypeSchema).min(1),

  // maxFileSizeMB enforced client-side in the DropZone before any processing
  maxFileSizeMB: z.number().positive(),

  // 1 for free tier; will be increased for premium batch processing (Phase 2)
  maxBatchSize: z.number().int().positive(),

  capabilities: z.array(toolCapabilitySchema).min(1),
})

export type ToolDefinition = z.infer<typeof toolDefinitionSchema>

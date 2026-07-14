import { z } from 'zod'

// ─── Tool keys ───────────────────────────────────────────────────────────────
// Add a new entry here when adding a new feature module / tool.

export const TOOL_KEY_SCHEMA = z.enum([
  'image-resizer',
  'pdf-compressor',
  'passport-photo',
  'video-to-audio',
  'image-cropper',
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
  'extract-audio',
])

export type ToolCapability = z.infer<typeof toolCapabilitySchema>

// ─── Platform category ───────────────────────────────────────────────────────
// Top-level media-family taxonomy used by the homepage's Tool Categories
// section. This is intentionally separate from GoalCategory (registry/goals/schema.ts),
// which classifies goals by *document type* (exam, id-documents, signature...).
// platformCategory classifies by *media type* so the homepage can group
// "everything that operates on images" vs "everything that operates on video"
// regardless of which document goals sit on top of a given tool.

export const platformCategorySchema = z.enum([
  'image',
  'video',
  'document',
  'ai',
])

export type PlatformCategory = z.infer<typeof platformCategorySchema>
export const PLATFORM_CATEGORIES = platformCategorySchema.options satisfies readonly PlatformCategory[]

export const mimeTypeSchema = z.enum([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/webm',
  'video/x-m4v',
])

export type MimeType = z.infer<typeof mimeTypeSchema>

// ─── Tool status ──────────────────────────────────────────────────────────────
// 'active': has a working features/<featurePath> implementation and is safe to
// surface on the homepage (Quick Actions, Featured Tools, Recently Added).
// 'coming-soon': registered ahead of implementation (e.g. roadmap tools that
// already have a name/description/capabilities decided) but has no feature
// module yet — ToolSection falls back to a "coming soon" placeholder for these.
// Homepage sections that showcase real capability MUST filter to 'active'.

export const toolStatusSchema = z.enum(['active', 'coming-soon'])
export type ToolStatus = z.infer<typeof toolStatusSchema>

// ─── ToolDefinition schema ───────────────────────────────────────────────────

export const toolDefinitionSchema = z.object({
  key: TOOL_KEY_SCHEMA,
  name: z.string().min(3),
  description: z.string().min(20),

  // Public route for standalone tool pages (e.g. '/video-to-audio').
  // Tools without a route are only reachable through goal pages.
  route: z.string().startsWith('/').optional(),

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

  // Media-family grouping for the homepage Tool Categories section.
  platformCategory: platformCategorySchema,

  // Whether this tool is actually usable today — see toolStatusSchema above.
  status: toolStatusSchema,

  // YYYY-MM-DD — powers the homepage "Recently Added" section (sorted desc).
  addedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
})

export type ToolDefinition = z.infer<typeof toolDefinitionSchema>

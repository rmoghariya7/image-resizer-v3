import { z } from 'zod'
import { PRESET_KEY_SCHEMA } from '@/registry/presets/schema'
import { TOOL_KEY_SCHEMA } from '@/registry/tools/schema'

// ─── Goal category ───────────────────────────────────────────────────────────
// Defined here (not in categories/schema) to avoid a circular dependency.
// categories/schema.ts imports GoalCategory from this file.

export const GOAL_CATEGORY_SCHEMA = z.enum([
  'exam',
  'id-documents',
  'compress',
  'signature',
])

export type GoalCategory = z.infer<typeof GOAL_CATEGORY_SCHEMA>
export const GOAL_CATEGORIES = GOAL_CATEGORY_SCHEMA.options satisfies readonly GoalCategory[]

// ─── Supporting schemas ───────────────────────────────────────────────────────

export const goalPrioritySchema = z.enum(['high', 'medium', 'low'])
export type GoalPriority = z.infer<typeof goalPrioritySchema>

export const goalStatusSchema = z.enum(['active', 'draft', 'deprecated'])
export type GoalStatus = z.infer<typeof goalStatusSchema>

export const faqSchema = z.object({
  question: z.string().min(10),
  // Answers may include {{goal:slug}} tokens; resolved at render time by the
  // linking resolver into anchor tags (see lib/linking/resolver.ts)
  answer: z.string().min(20),
})

export type FAQ = z.infer<typeof faqSchema>

export const howItWorksStepSchema = z.object({
  title: z.string().min(3).max(60),
  body: z.string().min(20).max(300),
})

export type HowItWorksStep = z.infer<typeof howItWorksStepSchema>

// ─── GoalDefinition schema ────────────────────────────────────────────────────

export const goalDefinitionSchema = z.object({
  // ── Identity
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens only'),
  title: z.string().min(5).max(80),
  shortTitle: z.string().min(3).max(40),

  // ── SEO metadata
  // description is used verbatim as the HTML meta description.
  description: z.string().min(50).max(160),
  longDescription: z.string().min(100),
  keywords: z.array(z.string()).min(3).max(20),

  // ── Taxonomy
  category: GOAL_CATEGORY_SCHEMA,
  subcategory: z.string().optional(),
  tags: z.array(z.string()).min(1),

  // ── Tool & preset linkage
  tool: TOOL_KEY_SCHEMA,
  preset: PRESET_KEY_SCHEMA,

  // ── Content
  faqs: z.array(faqSchema).min(3),
  howItWorks: z.array(howItWorksStepSchema).min(3).max(5),
  useCases: z.array(z.string()).optional(),

  // ── Internal linking
  // relatedGoals: shown in the Related Goals grid (same category / same tool)
  relatedGoals: z.array(z.string()),
  // complementaryGoals: shown in the post-download prompt (cross-category)
  complementaryGoals: z.array(z.string()),

  // ── Content cross-links (populated when matching pages exist)
  requirementsPage: z.string().optional(),
  primaryGuide: z.string().optional(),

  // ── Sitemap & status
  status: goalStatusSchema,
  priority: goalPrioritySchema,
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
})

export type GoalDefinition = z.infer<typeof goalDefinitionSchema>

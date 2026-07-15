import { z } from 'zod'
import { searchIntentSchema } from '@/registry/shared/search-intent'

// ─── Learn Category ───────────────────────────────────────────────────────────

export const LEARN_CATEGORY_SCHEMA = z.enum([
  'compression',
  'image-basics',
  'government-portals',
  'best-practices',
  'technical',
])

export type LearnCategory = z.infer<typeof LEARN_CATEGORY_SCHEMA>
export const LEARN_CATEGORIES = LEARN_CATEGORY_SCHEMA.options satisfies readonly LearnCategory[]

export const LEARN_CATEGORY_LABELS: Record<LearnCategory, string> = {
  'compression':         'Compression',
  'image-basics':        'Image Basics',
  'government-portals':  'Government Portals',
  'best-practices':      'Best Practices',
  'technical':           'Technical',
}

// ─── Content blocks ───────────────────────────────────────────────────────────
// Stored as structured data so the renderer can apply consistent Tailwind styles
// without parsing markdown at runtime.

export const contentParagraphSchema = z.object({
  type: z.literal('paragraph'),
  text: z.string().min(1),
})

export const contentListSchema = z.object({
  type: z.literal('list'),
  items: z.array(z.string().min(1)).min(1),
})

export const contentSubsectionSchema = z.object({
  type: z.literal('subsection'),
  id: z.string().regex(/^[a-z0-9-]+$/),
  heading: z.string().min(3),
  content: z.array(z.union([contentParagraphSchema, contentListSchema])),
})

export const contentBlockSchema = z.union([
  contentParagraphSchema,
  contentListSchema,
  contentSubsectionSchema,
])

export type ContentParagraph = z.infer<typeof contentParagraphSchema>
export type ContentList      = z.infer<typeof contentListSchema>
export type ContentSubsection = z.infer<typeof contentSubsectionSchema>
export type ContentBlock      = z.infer<typeof contentBlockSchema>

// ─── Article section (H2) ────────────────────────────────────────────────────

export const articleSectionSchema = z.object({
  id:      z.string().regex(/^[a-z0-9-]+$/),
  heading: z.string().min(3),
  content: z.array(contentBlockSchema).min(1),
})

export type ArticleSection = z.infer<typeof articleSectionSchema>

// ─── FAQ entry ────────────────────────────────────────────────────────────────

export const learnFaqSchema = z.object({
  question: z.string().min(10),
  answer:   z.string().min(20),
})

export type LearnFAQ = z.infer<typeof learnFaqSchema>

// ─── LearnArticle ─────────────────────────────────────────────────────────────

export const learnArticleSchema = z.object({
  // ── Identity
  slug:       z.string().regex(/^[a-z0-9-]+$/),
  title:      z.string().min(5).max(80),
  shortTitle: z.string().min(3).max(50),

  // ── SEO
  seoTitle:          z.string().min(20).max(65),
  description:       z.string().min(50).max(160),
  ogDescription:     z.string().min(50).max(200),
  twitterDescription: z.string().min(20).max(150),
  keywords:          z.array(z.string()).min(3).max(20),

  // ── Taxonomy
  category: LEARN_CATEGORY_SCHEMA,
  tags:     z.array(z.string()).min(1),

  // ── Content
  introduction: z.array(z.string().min(20)).min(2).max(5),
  sections:     z.array(articleSectionSchema).min(3),
  faqs:         z.array(learnFaqSchema).min(4).max(8),
  conclusion:   z.string().min(40),

  // ── Internal linking
  relatedArticles: z.array(z.string()),   // learn slugs
  relatedTools:    z.array(z.string()),   // goal slugs, including compress-image-to-* slugs

  // ── Reading metadata
  readingTime: z.number().int().min(1).max(30),  // minutes

  // ── Lifecycle
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status:      z.enum(['published', 'draft']),
  priority:    z.enum(['high', 'medium', 'low']),

  // Search intent (optional) -- powers metadata hints, content guidance, and internal linking.
  // See docs/search-intent.md.
  search: searchIntentSchema.optional(),
})

export type LearnArticle = z.infer<typeof learnArticleSchema>

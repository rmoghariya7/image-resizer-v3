import { z } from 'zod'
import { GOAL_CATEGORY_SCHEMA, faqSchema } from '@/registry/goals/schema'

// ─── SubcategoryDefinition ────────────────────────────────────────────────────

export const subcategoryDefinitionSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  description: z.string().min(20),
  parentCategory: GOAL_CATEGORY_SCHEMA,
  // Ordered list of goal slugs belonging to this subcategory.
  // Goals here must also be registered in the goal registry.
  goalSlugs: z.array(z.string()),
})

export type SubcategoryDefinition = z.infer<typeof subcategoryDefinitionSchema>

// ─── CategoryDefinition ───────────────────────────────────────────────────────

export const categoryDefinitionSchema = z.object({
  // slug matches GoalCategory — categories are the top-level taxonomy
  slug: GOAL_CATEGORY_SCHEMA,
  name: z.string().min(3),
  description: z.string().min(30),
  // metaDescription is used as the HTML meta description for category pages
  metaDescription: z.string().min(50).max(160),
  keywords: z.array(z.string()).min(3),
  // Extended SEO (optional — falls back to name/metaDescription when absent)
  ogTitle: z.string().min(10).max(70).optional(),
  ogDescription: z.string().min(50).max(200).optional(),
  faqs: z.array(faqSchema).min(3),
  subcategories: z.array(subcategoryDefinitionSchema),
  // References /content/categories/<contentSlug>.mdx if long-form prose exists
  contentSlug: z.string().optional(),
  // Sitemap priority 0-1
  priority: z.number().min(0).max(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export type CategoryDefinition = z.infer<typeof categoryDefinitionSchema>

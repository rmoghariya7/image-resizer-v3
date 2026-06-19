import type { CategoryDefinition, SubcategoryDefinition } from './schema'
import type { GoalCategory } from '@/registry/goals/schema'
import { categoryDefinitions } from './definitions'

// ─── Map indexes for O(1) lookups ─────────────────────────────────────────────

const CATEGORY_MAP = new Map<GoalCategory, CategoryDefinition>(
  categoryDefinitions.map((c) => [c.slug, c]),
)

const SUBCATEGORY_MAP = new Map<string, SubcategoryDefinition>(
  categoryDefinitions.flatMap((c) =>
    c.subcategories.map((sub) => [sub.slug, sub]),
  ),
)

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Returns the category definition for a given category slug, or undefined. */
export function getCategory(slug: GoalCategory): CategoryDefinition | undefined {
  return CATEGORY_MAP.get(slug)
}

/** Returns all category definitions. */
export function getAllCategories(): readonly CategoryDefinition[] {
  return categoryDefinitions
}

/** Returns the subcategory definition for a given subcategory slug, or undefined. */
export function getSubcategory(slug: string): SubcategoryDefinition | undefined {
  return SUBCATEGORY_MAP.get(slug)
}

/**
 * Returns the ordered list of goal slugs for a given subcategory.
 * Returns an empty array if the subcategory does not exist.
 */
export function getGoalsForSubcategory(subcategorySlug: string): string[] {
  return SUBCATEGORY_MAP.get(subcategorySlug)?.goalSlugs ?? []
}

// ─── Static-params helpers ────────────────────────────────────────────────────

/**
 * Returns params for Next.js `generateStaticParams()` on the category route segment.
 *
 * @example
 * // app/(goals)/categories/[category]/page.tsx
 * export const generateStaticParams = getCategoryStaticParams
 */
export function getCategoryStaticParams(): Array<{ category: GoalCategory }> {
  return categoryDefinitions.map((c) => ({ category: c.slug }))
}

/**
 * Returns params for Next.js `generateStaticParams()` on the subcategory route segment.
 *
 * @example
 * // app/(goals)/categories/[category]/[subcategory]/page.tsx
 * export const generateStaticParams = getSubcategoryStaticParams
 */
export function getSubcategoryStaticParams(): Array<{
  category: GoalCategory
  subcategory: string
}> {
  return categoryDefinitions.flatMap((c) =>
    c.subcategories.map((sub) => ({
      category: c.slug,
      subcategory: sub.slug,
    })),
  )
}

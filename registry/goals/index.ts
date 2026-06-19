import type { GoalDefinition, GoalCategory } from './schema'
import { examGoals } from './exam'
import { idDocumentGoals } from './id-documents'
import { compressGoals } from './compress'
import { signatureGoals } from './signature'

// ─── All goals ────────────────────────────────────────────────────────────────

const ALL_GOALS: readonly GoalDefinition[] = Object.freeze([
  ...examGoals,
  ...idDocumentGoals,
  ...compressGoals,
  ...signatureGoals,
])

// ─── Map index for O(1) slug lookups ─────────────────────────────────────────

const GOAL_MAP = new Map<string, GoalDefinition>(
  ALL_GOALS.map((goal) => [goal.slug, goal]),
)

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Returns the goal definition for a given slug, or undefined if not found. */
export function getGoal(slug: string): GoalDefinition | undefined {
  return GOAL_MAP.get(slug)
}

/** Returns all active goal definitions. */
export function getAllGoals(): readonly GoalDefinition[] {
  return ALL_GOALS.filter((g) => g.status === 'active')
}

/** Returns all goal definitions for a given category (active only). */
export function getGoalsByCategory(category: GoalCategory): GoalDefinition[] {
  return ALL_GOALS.filter((g) => g.category === category && g.status === 'active')
}

/**
 * Returns related goal definitions for a given slug.
 * Filters out any slugs that do not exist in the registry.
 */
export function getRelatedGoals(slug: string): GoalDefinition[] {
  const goal = GOAL_MAP.get(slug)
  if (!goal) return []
  return goal.relatedGoals
    .map((s) => GOAL_MAP.get(s))
    .filter((g): g is GoalDefinition => g !== undefined && g.status === 'active')
}

/**
 * Returns complementary goal definitions for a given slug.
 * Used in the post-download prompt to suggest cross-category next steps.
 */
export function getComplementaryGoals(slug: string): GoalDefinition[] {
  const goal = GOAL_MAP.get(slug)
  if (!goal) return []
  return goal.complementaryGoals
    .map((s) => GOAL_MAP.get(s))
    .filter((g): g is GoalDefinition => g !== undefined && g.status === 'active')
}

// ─── Sitemap & static-params helpers ─────────────────────────────────────────

/** Returns an array of all active goal slugs. */
export function getGoalSlugs(): string[] {
  return ALL_GOALS.filter((g) => g.status === 'active').map((g) => g.slug)
}

/** Total number of registered goals (including drafts). */
export function getTotalGoalCount(): number {
  return ALL_GOALS.length
}

/**
 * Returns a slice of goals for paginated sitemap generation.
 * @param offset - Zero-based start index
 * @param size   - Number of goals to return
 */
export function getGoalChunk(offset: number, size: number): readonly GoalDefinition[] {
  return ALL_GOALS.slice(offset, offset + size)
}

/**
 * Returns sitemap entries for all active goals.
 * Suitable for passing to next-sitemap or a custom sitemap route.
 */
export function getSitemapEntries(): Array<{
  slug: string
  priority: GoalDefinition['priority']
  updatedAt: string
}> {
  return ALL_GOALS.filter((g) => g.status === 'active').map((g) => ({
    slug: g.slug,
    priority: g.priority,
    updatedAt: g.updatedAt,
  }))
}

/**
 * Returns params for Next.js `generateStaticParams()` on the goals route segment.
 *
 * @example
 * // app/(goals)/goals/[slug]/page.tsx
 * export const generateStaticParams = getGoalStaticParams
 */
export function getGoalStaticParams(): Array<{ slug: string }> {
  return ALL_GOALS.filter((g) => g.status === 'active').map((g) => ({ slug: g.slug }))
}

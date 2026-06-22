import {
  getAllGoals,
  getGoal,
  getRelatedGoals,
  getComplementaryGoals,
} from '@/registry/goals'
import { compressGoalSlug } from '@/registry/goals/compress'
import {
  SIZE_TARGETS,
  getSizeTargetByPresetKey,
  QUICK_ACTION_SIZES,
} from '@/registry/size-presets'
import type { GoalDefinition } from '@/registry/goals/schema'
import type { CompressPresetKey } from '@/registry/presets/schema'

// ─── Single source of truth for goal URLs ────────────────────────────────────
// All link components must call this helper. If the route structure ever changes
// (e.g. /goals/[slug] → /tools/[slug]), only this function needs updating.

export function buildGoalHref(goal: GoalDefinition): string {
  return `/goals/${goal.slug}`
}

// ─── Private helpers ──────────────────────────────────────────────────────────

/**
 * Returns the most-searched compress goals, mirroring the QUICK_ACTION_SIZES
 * constant but resolved through the Goal Registry.
 */
function getQuickCompressGoals(): GoalDefinition[] {
  return QUICK_ACTION_SIZES
    .map(t => getGoal(compressGoalSlug(t)))
    .filter((g): g is GoalDefinition => g !== undefined)
}

/**
 * Given a compress goal slug, returns adjacent compress goals by file-size order.
 * Uses SIZE_TARGETS as the canonical size ordering, then maps back to GoalDefinitions.
 */
function getAdjacentCompressGoals(
  slug: string,
  count: number,
): { smaller: GoalDefinition[]; larger: GoalDefinition[] } {
  const goal = getGoal(slug)
  if (!goal || goal.category !== 'compress') {
    return { smaller: [], larger: [] }
  }

  const sizeTarget = getSizeTargetByPresetKey(goal.preset as CompressPresetKey)
  if (!sizeTarget) return { smaller: [], larger: [] }

  const idx = SIZE_TARGETS.indexOf(sizeTarget)

  const smaller = SIZE_TARGETS.slice(Math.max(0, idx - count), idx)
    .map(t => getGoal(compressGoalSlug(t)))
    .filter((g): g is GoalDefinition => g !== undefined)
    .reverse()

  const larger = SIZE_TARGETS.slice(idx + 1, idx + 1 + count)
    .map(t => getGoal(compressGoalSlug(t)))
    .filter((g): g is GoalDefinition => g !== undefined)

  return { smaller, larger }
}

// ─── Goal page recommendations ────────────────────────────────────────────────

export type GoalPageRecommendations = {
  /** Compress-goal links shown directly below the tool widget. */
  relatedSizes: GoalDefinition[]
  /** Cross-category goal links shown directly below the FAQ. */
  usersAlsoVisit: GoalDefinition[]
  /** Broad discovery links at the very bottom of the page. */
  exploreMore: GoalDefinition[]
}

export function getGoalPageRecommendations(slug: string): GoalPageRecommendations {
  const goal = getGoal(slug)

  if (!goal) {
    return { relatedSizes: [], usersAlsoVisit: [], exploreMore: [] }
  }

  // 1. Related compress goals — shown below the tool.
  //    Compress goals: adjacent sizes. Non-compress: popular compress goals.
  let relatedSizes: GoalDefinition[]
  if (goal.category === 'compress') {
    const { smaller, larger } = getAdjacentCompressGoals(slug, 3)
    // Show up to 3 smaller + 3 larger, de-duped against current slug.
    relatedSizes = [...smaller, ...larger].filter(g => g.slug !== slug).slice(0, 6)
  } else {
    relatedSizes = getQuickCompressGoals()
  }

  // 2. Users Also Visit — complementary goals from registry, back-filled with
  //    high-priority goals from other categories when the registry has fewer than 3.
  const complementary = getComplementaryGoals(slug)
  const alreadyLinked = new Set([slug, ...complementary.map(g => g.slug)])

  let usersAlsoVisit: GoalDefinition[]
  if (complementary.length >= 3) {
    usersAlsoVisit = complementary.slice(0, 6)
  } else {
    const fill = getAllGoals()
      .filter(
        g =>
          g.category !== goal.category &&
          g.priority === 'high' &&
          !alreadyLinked.has(g.slug),
      )
      .slice(0, 6 - complementary.length)
    usersAlsoVisit = [...complementary, ...fill]
  }

  // 3. Explore More — everything not already surfaced on this page.
  const relatedGoalSlugs = new Set(getRelatedGoals(slug).map(g => g.slug))
  const visitSlugs = new Set(usersAlsoVisit.map(g => g.slug))
  const shownSlugs = new Set([slug, ...relatedGoalSlugs, ...visitSlugs])

  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const

  const exploreMore = getAllGoals()
    .filter(g => !shownSlugs.has(g.slug))
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
    .slice(0, 12)

  return { relatedSizes, usersAlsoVisit, exploreMore }
}

// ─── Result screen recommendations ───────────────────────────────────────────

export type ResultScreenRecommendations = {
  /** Compress goals with a smaller target size than the current result. */
  smaller: GoalDefinition[]
  /** Compress goals with a larger target size than the current result. */
  larger: GoalDefinition[]
  /** Related goals from other categories (e.g. signature after UPSC resize). */
  complementary: GoalDefinition[]
}

export function getResultRecommendations(goalSlug: string): ResultScreenRecommendations {
  const goal = getGoal(goalSlug)

  if (!goal) {
    const quick = getQuickCompressGoals()
    return { smaller: quick.slice(0, 3), larger: quick.slice(3), complementary: [] }
  }

  if (goal.category === 'compress') {
    const { smaller, larger } = getAdjacentCompressGoals(goalSlug, 3)
    const complementary = getComplementaryGoals(goalSlug).slice(0, 3)
    return { smaller, larger, complementary }
  }

  // Non-compress goals (exam, signature, id-documents):
  // Show compress goals so users know they can also compress the downloaded file.
  const quick = getQuickCompressGoals()
  const complementary = getComplementaryGoals(goalSlug).slice(0, 4)
  return { smaller: quick.slice(0, 3), larger: quick.slice(3), complementary }
}

// ─── Homepage helpers ─────────────────────────────────────────────────────────

/** High-priority non-compress goals for the homepage "Popular Tools" section. */
export function getPopularToolGoals(count = 6): GoalDefinition[] {
  return getAllGoals()
    .filter(g => g.priority === 'high' && g.category !== 'compress')
    .slice(0, count)
}

// ─── Compress page helpers ────────────────────────────────────────────────────

/** High-priority exam / id-document goals for the footer of compress pages. */
export function getCompressPageGoalLinks(count = 4): GoalDefinition[] {
  return getAllGoals()
    .filter(
      g =>
        (g.category === 'exam' || g.category === 'id-documents') &&
        g.priority === 'high',
    )
    .slice(0, count)
}

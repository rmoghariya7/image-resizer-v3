/**
 * registry/shared/index.ts
 *
 * Cross-registry helpers for the Search Intent layer.
 *
 * These functions aggregate searchable items across all registries
 * (goals, categories, size-presets, learn articles, guides) and let
 * the rest of the codebase query by topic cluster, search intent type,
 * or primary query — without coupling to any single registry.
 *
 * Typical consumers:
 * - Internal linking: getRelatedByCluster() for sidebar/footer recommendations
 * - Recommendations: getItemsByTopicCluster() for "more like this" sections
 * - Analytics: getItemsByIntent() for funnel-stage reporting
 * - Future: autocomplete index, semantic search, AI recommendation engine
 */

import { getAllGoals } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { SIZE_TARGETS } from '@/registry/size-presets'
import { getAllLearnArticles } from '@/registry/learn'
import { getAllGuides } from '@/content/guides'
import type { TopicCluster, SearchIntentType } from './search-intent'

// ─── Unified searchable item ──────────────────────────────────────────────────

/** A page-level item normalised for cross-registry operations. */
export type SearchableItem = {
  /** Source registry */
  type: 'goal' | 'category' | 'compress' | 'learn' | 'guide'
  /** Unique identifier within its type */
  slug: string
  /** Canonical page URL */
  href: string
  /** Display title */
  title: string
  /** Short display title if available */
  shortTitle?: string
  /** Meta description */
  description: string
  // ── Search intent fields (from registry definition, if populated)
  primaryQuery?: string
  relatedQueries?: string[]
  intent?: SearchIntentType
  topicCluster?: TopicCluster
}

// ─── Aggregation ──────────────────────────────────────────────────────────────

/**
 * Returns all searchable items across every registry.
 * Normalises each definition into a flat SearchableItem.
 *
 * O(n) across total page count — call once and cache in consuming components.
 */
export function getAllSearchableItems(): SearchableItem[] {
  const items: SearchableItem[] = []

  // Goals
  for (const goal of getAllGoals()) {
    items.push({
      type:         'goal',
      slug:         goal.slug,
      href:         `/${goal.slug}`,
      title:        goal.title,
      shortTitle:   goal.shortTitle,
      description:  goal.description,
      primaryQuery: goal.search?.primaryQuery,
      relatedQueries: goal.search?.relatedQueries,
      intent:       goal.search?.intent,
      topicCluster: goal.search?.topicCluster,
    })
  }

  // Categories
  for (const cat of getAllCategories()) {
    items.push({
      type:         'category',
      slug:         cat.slug,
      href:         `/categories/${cat.slug}`,
      title:        cat.name,
      description:  cat.metaDescription,
      primaryQuery: cat.search?.primaryQuery,
      relatedQueries: cat.search?.relatedQueries,
      intent:       cat.search?.intent,
      topicCluster: cat.search?.topicCluster,
    })
  }

  // Compress-under pages (from size-presets)
  for (const target of SIZE_TARGETS) {
    items.push({
      type:         'compress',
      slug:         target.slug,
      href:         `/${target.slug}`,
      title:        target.title,
      shortTitle:   target.shortTitle,
      description:  target.description,
      primaryQuery: target.search?.primaryQuery,
      relatedQueries: target.search?.relatedQueries,
      intent:       target.search?.intent,
      topicCluster: target.search?.topicCluster,
    })
  }

  // Learn articles
  for (const article of getAllLearnArticles()) {
    items.push({
      type:         'learn',
      slug:         article.slug,
      href:         `/learn/${article.slug}`,
      title:        article.title,
      shortTitle:   article.shortTitle,
      description:  article.description,
      primaryQuery: article.search?.primaryQuery,
      relatedQueries: article.search?.relatedQueries,
      intent:       article.search?.intent,
      topicCluster: article.search?.topicCluster,
    })
  }

  // Guides
  for (const guide of getAllGuides()) {
    items.push({
      type:         'guide',
      slug:         guide.slug,
      href:         `/guides/${guide.slug}`,
      title:        guide.title,
      description:  guide.introduction,
      primaryQuery: guide.search?.primaryQuery,
      relatedQueries: guide.search?.relatedQueries,
      intent:       guide.search?.intent,
      topicCluster: guide.search?.topicCluster,
    })
  }

  return items
}

// ─── Filtering helpers ────────────────────────────────────────────────────────

/**
 * Returns all items belonging to a given topic cluster.
 * Only items with a populated search.topicCluster are included.
 */
export function getItemsByTopicCluster(cluster: TopicCluster): SearchableItem[] {
  return getAllSearchableItems().filter((item) => item.topicCluster === cluster)
}

/**
 * Returns all items with a given search intent type.
 * Only items with a populated search.intent are included.
 */
export function getItemsByIntent(intent: SearchIntentType): SearchableItem[] {
  return getAllSearchableItems().filter((item) => item.intent === intent)
}

/**
 * Returns items in the same topic cluster as the given page, excluding itself.
 * Useful for sidebar/footer "More like this" recommendations.
 *
 * @param slug  The slug of the current page (any type).
 * @param limit Maximum number of items to return (default 6).
 */
export function getRelatedByCluster(slug: string, limit = 6): SearchableItem[] {
  const all = getAllSearchableItems()
  const current = all.find((item) => item.slug === slug)
  if (!current?.topicCluster) return []

  return all
    .filter((item) => item.slug !== slug && item.topicCluster === current.topicCluster)
    .slice(0, limit)
}

/**
 * Returns items whose primaryQuery or relatedQueries overlap with the given query.
 * Simple substring match — good for basic autocomplete candidates.
 *
 * @param query  Raw user query string.
 * @param limit  Maximum items to return (default 5).
 */
export function getItemsByQuery(query: string, limit = 5): SearchableItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return getAllSearchableItems()
    .filter((item) => {
      if (item.primaryQuery?.includes(q)) return true
      if (item.relatedQueries?.some((r) => r.includes(q))) return true
      return false
    })
    .slice(0, limit)
}

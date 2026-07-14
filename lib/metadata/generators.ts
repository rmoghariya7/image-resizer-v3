import type { Metadata } from 'next'
import type { GoalDefinition } from '@/registry/goals/schema'
import type { CategoryDefinition } from '@/registry/categories/schema'
import type { SizeTarget } from '@/registry/size-presets'
import type { SearchIntent } from '@/registry/shared/search-intent'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'
const SITE_NAME = 'Presetly'

// --- Search intent helpers ---

/**
 * Structured search hints derived from a SearchIntent object.
 * Consumed by generators to enrich metadata and analytics tags.
 */
export type SearchHints = {
  primaryQuery:   string | undefined
  relatedQueries: string[]
  intent:         SearchIntent['intent'] | undefined
  topicCluster:   SearchIntent['topicCluster'] | undefined
}

export function getSearchHints(search: SearchIntent | undefined): SearchHints {
  return {
    primaryQuery:   search?.primaryQuery,
    relatedQueries: search?.relatedQueries ?? [],
    intent:         search?.intent,
    topicCluster:   search?.topicCluster,
  }
}

// --- Open Graph image helpers ---

// Root-level OG image (app/opengraph-image.tsx) serves as the fallback for all
// pages that do not have a route-specific opengraph-image.tsx file.
const ROOT_OG_IMAGE = {
  url:    `${BASE_URL}/opengraph-image`,
  width:  1200,
  height: 630,
  type:   'image/png' as const,
}

/**
 * Constructs the OG image descriptor for a page that owns an opengraph-image.tsx.
 * canonical must be the full absolute canonical URL.
 */
function routeOgImage(canonical: string) {
  return {
    url:    `${canonical}/opengraph-image`,
    width:  1200,
    height: 630,
    type:   'image/png' as const,
  }
}

// --- Goal pages (/[slug]) ---

export function generateGoalMetadata(
  goal: GoalDefinition,
  canonical: string,
): Metadata {
  const hints = getSearchHints(goal.search)
  const pageTitle = goal.seoTitle ?? `${goal.title} | Free Online Tool | ${SITE_NAME}`
  const ogDesc = goal.ogDescription ?? goal.description
  const twitterDesc =
    goal.twitterDescription ?? (goal.ogDescription ?? goal.description).slice(0, 150)
  // Goal pages have app/(goals)/[slug]/opengraph-image.tsx.
  const ogImage = routeOgImage(canonical)

  return {
    title: pageTitle,
    description: goal.description,
    alternates: { canonical },
    openGraph: {
      title:       goal.seoTitle ?? goal.title,
      description: ogDesc,
      url:         canonical,
      type:        'website',
      siteName:    SITE_NAME,
      images:      [ogImage],
    },
    twitter: {
      card:        'summary_large_image',
      title:       goal.shortTitle
        ? `${goal.shortTitle} | ${SITE_NAME}`
        : (goal.seoTitle ?? goal.title),
      description: twitterDesc,
      images:      [ogImage.url],
    },
    robots: {
      // indexable === false marks a genuine content duplicate of another
      // canonical page (see GoalDefinition.indexable) — kept live and
      // linkable, just excluded from search indexing.
      index:  goal.status === 'active' && goal.indexable !== false,
      follow: true,
    },
    other: hints.primaryQuery
      ? { 'search:primaryQuery': hints.primaryQuery, 'search:cluster': hints.topicCluster ?? '' }
      : undefined,
  }
}

// --- Category pages (/categories/[category]) ---

export function generateCategoryMetadata(
  cat: CategoryDefinition,
  canonical: string,
): Metadata {
  const hints = getSearchHints(cat.search)
  const pageTitle = `${cat.name} | Free Online Tools | ${SITE_NAME}`
  const ogTitle   = cat.ogTitle ?? `${cat.name} | ${SITE_NAME}`
  const ogDesc    = cat.ogDescription ?? cat.metaDescription
  // Category pages have no route-specific opengraph-image.tsx; fall back to root.

  return {
    title:       pageTitle,
    description: cat.metaDescription,
    alternates:  { canonical },
    openGraph: {
      title:       ogTitle,
      description: ogDesc,
      url:         canonical,
      type:        'website',
      siteName:    SITE_NAME,
      images:      [ROOT_OG_IMAGE],
    },
    twitter: {
      card:        'summary_large_image',
      title:       ogTitle,
      description: ogDesc.slice(0, 150),
      images:      [ROOT_OG_IMAGE.url],
    },
    other: hints.primaryQuery
      ? { 'search:primaryQuery': hints.primaryQuery, 'search:cluster': hints.topicCluster ?? '' }
      : undefined,
  }
}

// --- Compress size pages (/compress-image-under-[size]) ---

export function generateCompressMetadata(
  target: SizeTarget,
  canonical: string,
): Metadata {
  const hints      = getSearchHints(target.search)
  const ogDesc     = target.ogDescription ?? target.description
  const twitterDesc = target.twitterDescription ?? target.description.slice(0, 150)
  // Compress pages have app/(compress)/compress-image-under/[size]/opengraph-image.tsx.
  // The rewrite /compress-image-under-:size/opengraph-image -> /compress-image-under/:size/opengraph-image
  // ensures that the canonical OG image URL resolves correctly.
  const ogImage    = routeOgImage(canonical)

  return {
    title:       target.metaTitle,
    description: target.description,
    alternates:  { canonical },
    openGraph: {
      title:       target.ogTitle ?? target.title,
      description: ogDesc,
      url:         canonical,
      type:        'website',
      siteName:    SITE_NAME,
      images:      [ogImage],
    },
    twitter: {
      card:        'summary_large_image',
      title:       target.twitterTitle ?? target.shortTitle,
      description: twitterDesc,
      images:      [ogImage.url],
    },
    other: hints.primaryQuery
      ? { 'search:primaryQuery': hints.primaryQuery, 'search:cluster': hints.topicCluster ?? '' }
      : undefined,
  }
}

// --- Learn article pages (/learn/[slug]) ---

export function generateLearnMetadata(
  article: {
    seoTitle:           string
    description:        string
    ogDescription:      string
    twitterDescription: string
    keywords:           string[]
    status:             string
    search?:            SearchIntent
  },
  canonical: string,
): Metadata {
  const hints = getSearchHints(article.search)
  // Learn pages have no route-specific opengraph-image.tsx; fall back to root.

  return {
    title:       article.seoTitle,
    description: article.description,
    alternates:  { canonical },
    openGraph: {
      title:       article.seoTitle,
      description: article.ogDescription,
      url:         canonical,
      type:        'article',
      siteName:    SITE_NAME,
      images:      [ROOT_OG_IMAGE],
    },
    twitter: {
      card:        'summary_large_image',
      title:       article.seoTitle,
      description: article.twitterDescription,
      images:      [ROOT_OG_IMAGE.url],
    },
    robots: {
      index:  article.status === 'published',
      follow: true,
    },
    other: hints.primaryQuery
      ? { 'search:primaryQuery': hints.primaryQuery, 'search:cluster': hints.topicCluster ?? '' }
      : undefined,
  }
}

// --- Helpers ---

export { BASE_URL }

import type { Metadata } from 'next'
import type { GoalDefinition } from '@/registry/goals/schema'
import type { CategoryDefinition } from '@/registry/categories/schema'
import type { SearchIntent } from '@/registry/shared/search-intent'
import { getCategory } from '@/registry/categories'
import { BASE_URL, SITE_NAME } from './brand'

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
 * Constructs the OG image descriptor for a goal/tool page, rendered by the
 * single shared `/og` route rather than a per-page opengraph-image.tsx file
 * (see app/og/route.tsx for why — Next.js hashes the internal route id
 * whenever multiple same-named opengraph-image.tsx files collide, which
 * broke every page-specific OG image in production but this endpoint).
 */
function dynamicOgImage(params: {
  badge: string
  title: string
  description: string
  badges?: readonly string[]
}) {
  const qs = new URLSearchParams({
    badge:       params.badge,
    title:       params.title,
    description: params.description,
  })
  if (params.badges?.length) qs.set('badges', params.badges.join('|'))

  return {
    url:    `${BASE_URL}/og?${qs.toString()}`,
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
  const ogImage = dynamicOgImage({
    badge:       getCategory(goal.category)?.name ?? 'Tool',
    title:       goal.title,
    description: goal.description,
  })

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

// --- Core tool pages (/compress-image, /resize-image, etc.) ---

export function generateToolMetadata(opts: {
  pageTitle:    string
  seoTitle:     string
  description:  string
  canonical:    string
  primaryQuery?: string
  /** Small OG-image pill, e.g. "Image Compressor". Defaults to pageTitle. */
  ogBadge?:      string
  ogBadges?:     readonly string[]
}): Metadata {
  const { pageTitle, seoTitle, description, canonical, primaryQuery } = opts
  const ogImage = dynamicOgImage({
    badge:       opts.ogBadge ?? pageTitle,
    title:       pageTitle,
    description,
    badges:      opts.ogBadges,
  })

  return {
    title:       seoTitle,
    description,
    alternates:  { canonical },
    openGraph: {
      title:       seoTitle,
      description,
      url:         canonical,
      type:        'website',
      siteName:    SITE_NAME,
      images:      [ogImage],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${pageTitle} | ${SITE_NAME}`,
      description: description.slice(0, 150),
      images:      [ogImage.url],
    },
    robots: { index: true, follow: true },
    other: primaryQuery ? { 'search:primaryQuery': primaryQuery } : undefined,
  }
}

// --- Guide pages (/guides/[slug]) ---
// No route-specific opengraph-image.tsx; falls back to the root OG image.

export function generateGuideMetadata(
  guide: { title: string; introduction: string; slug: string },
  canonical: string,
): Metadata {
  const description = guide.introduction.slice(0, 155).replace(/\.$/, '') + '.'

  return {
    title:       `${guide.title} | ${SITE_NAME}`,
    description,
    alternates:  { canonical },
    openGraph: {
      title:       guide.title,
      description: guide.introduction.slice(0, 200),
      url:         canonical,
      type:        'article',
      siteName:    SITE_NAME,
      images:      [ROOT_OG_IMAGE],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${guide.title} | ${SITE_NAME}`,
      description: guide.introduction.slice(0, 120),
      images:      [ROOT_OG_IMAGE.url],
    },
    robots: { index: true, follow: true },
  }
}

// --- Legal / static pages (/about, /contact, /privacy-policy, /terms) ---
// No route-specific opengraph-image.tsx; falls back to the root OG image.

export function generateLegalMetadata(opts: {
  title:               string // e.g. "Privacy Policy" — rendered as "{title} — Presetly"
  description:         string
  ogDescription?:      string
  twitterDescription?: string
  canonical:           string
}): Metadata {
  const { title, description, canonical } = opts
  const ogDescription = opts.ogDescription ?? description
  const twitterDescription = opts.twitterDescription ?? ogDescription

  return {
    title:       `${title} — ${SITE_NAME}`,
    description,
    alternates:  { canonical },
    openGraph: {
      title:       `${title} — ${SITE_NAME}`,
      description: ogDescription,
      url:         canonical,
      type:        'website',
      siteName:    SITE_NAME,
      images:      [ROOT_OG_IMAGE],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} — ${SITE_NAME}`,
      description: twitterDescription,
      images:      [ROOT_OG_IMAGE.url],
    },
  }
}

// --- Helpers ---

export { BASE_URL }

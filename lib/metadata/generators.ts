import type { Metadata } from 'next'
import type { GoalDefinition } from '@/registry/goals/schema'
import type { CategoryDefinition } from '@/registry/categories/schema'
import type { SizeTarget } from '@/registry/size-presets'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'
const SITE_NAME = 'Presetly'

// ─── Goal pages (/goals/[slug]) ───────────────────────────────────────────────

export function generateGoalMetadata(
  goal: GoalDefinition,
  canonical: string,
): Metadata {
  // Page <title>: use custom seoTitle when present, else build from goal.title
  const pageTitle = goal.seoTitle ?? `${goal.title} | Free Online Tool | ${SITE_NAME}`

  // OG description: social-sharing copy (different from meta description)
  const ogDesc = goal.ogDescription ?? goal.description

  // Twitter description: concise (falls back to ogDesc, then description)
  const twitterDesc =
    goal.twitterDescription ?? (goal.ogDescription ?? goal.description).slice(0, 150)

  return {
    title: pageTitle,
    description: goal.description,
    keywords: goal.keywords,
    alternates: { canonical },
    openGraph: {
      title: goal.seoTitle ?? goal.title,
      description: ogDesc,
      url: canonical,
      type: 'website',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: goal.shortTitle
        ? `${goal.shortTitle} | ${SITE_NAME}`
        : (goal.seoTitle ?? goal.title),
      description: twitterDesc,
    },
    robots: {
      index: goal.status === 'active',
      follow: true,
    },
  }
}

// ─── Category pages (/categories/[category]) ─────────────────────────────────

export function generateCategoryMetadata(
  cat: CategoryDefinition,
  canonical: string,
): Metadata {
  const pageTitle = `${cat.name} | Free Online Tools | ${SITE_NAME}`
  const ogTitle = cat.ogTitle ?? `${cat.name} | ${SITE_NAME}`
  const ogDesc = cat.ogDescription ?? cat.metaDescription

  return {
    title: pageTitle,
    description: cat.metaDescription,
    keywords: [...cat.keywords],
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      type: 'website',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: ogTitle,
      description: ogDesc.slice(0, 150),
    },
  }
}

// ─── Compress size pages (/compress-image-under-[size]) ──────────────────────

export function generateCompressMetadata(
  target: SizeTarget,
  canonical: string,
): Metadata {
  const ogDesc = target.ogDescription ?? target.description
  const twitterDesc = target.twitterDescription ?? target.description.slice(0, 150)

  return {
    title: target.metaTitle,
    description: target.description,
    keywords: [...target.keywords],
    alternates: { canonical },
    openGraph: {
      title: target.ogTitle ?? target.title,
      description: ogDesc,
      url: canonical,
      type: 'website',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: target.twitterTitle ?? target.shortTitle,
      description: twitterDesc,
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export { BASE_URL }

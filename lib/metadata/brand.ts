/**
 * Single source of truth for Presetly's brand identity and site-wide
 * structured data. Every metadata generator, opengraph-image route, and
 * JSON-LD schema in the app should import from here rather than declaring
 * its own copy of the brand name, tagline, or Organization/WebSite schema.
 */

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'
export const SITE_NAME = 'Presetly'
export const SITE_DOMAIN = BASE_URL.replace(/^https?:\/\//, '')
export const LOCALE = 'en_US'

// Canonical positioning copy. Every page-level generator falls back to these
// when it has nothing more specific to say — keep this the broadest, most
// accurate description of what Presetly does today.
export const SITE_TAGLINE = 'Goal-first image, video & document tools'
export const SITE_DESCRIPTION =
  'Compress, resize, crop, and convert images, remove backgrounds, extract audio from video, and prepare exam, ID, and passport photos — all in your browser. No uploads, no sign-up, completely free.'
export const SITE_DESCRIPTION_SHORT =
  'Free browser-based tools for photos, video, and documents — nothing is ever uploaded.'

// Shown as trust-badge pills on generated Open Graph images and used as the
// canonical wording wherever the app needs to state these claims verbatim.
export const TRUST_BADGES = ['Free', 'No uploads', 'No sign-up', 'Browser-based'] as const

export const THEME_COLOR = '#4f46e5'
export const BACKGROUND_COLOR = '#f8fafc'

// --- Structured data builders -------------------------------------------

/** Sitewide Organization schema — render once, in the root layout. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESCRIPTION_SHORT,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  }
}

/** Sitewide WebSite schema — render once, in the root layout. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
  }
}

/**
 * Reusable Organization reference for `provider`/`author`/`publisher` fields
 * on page-level schemas (SoftwareApplication, Article, etc.) — keeps those
 * nested references from re-declaring the org's name/url independently.
 */
export function organizationRef() {
  return {
    '@type': 'Organization' as const,
    name: SITE_NAME,
    url: BASE_URL,
  }
}

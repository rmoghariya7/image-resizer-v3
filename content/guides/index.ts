import type { GuideContent } from '@/content/types'

// ─── Registry map ─────────────────────────────────────────────────────────────
// Guides are long-form SEO content pages referenced by goal.primaryGuide.
// Add guide files here as they are written.

const GUIDES_MAP = new Map<string, GuideContent>([
  // Populated as guide content is authored.
  // Example:
  // ['upsc-cse-photo-requirements-2026', upscCseGuide],
])

// ─── Lookup ───────────────────────────────────────────────────────────────────

/**
 * Returns the GuideContent for a given guide slug, or undefined.
 * O(1) lookup — safe to call during SSR/static generation.
 */
export function getGuide(slug: string): GuideContent | undefined {
  return GUIDES_MAP.get(slug)
}

/**
 * Returns all registered guide slugs.
 * Used for sitemap generation.
 */
export function getGuideSlugs(): string[] {
  return [...GUIDES_MAP.keys()]
}

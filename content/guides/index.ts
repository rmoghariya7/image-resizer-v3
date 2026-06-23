import type { GuideContent } from '@/content/types'
import { photoSizeRequirementsGuide } from './photo-size-requirements'
import { signatureSizeRequirementsGuide } from './signature-size-requirements'
import { passportPhotoGuidelinesGuide } from './passport-photo-guidelines'
import { howToCompress50kbGuide } from './how-to-compress-50kb'

// ─── Registry map ─────────────────────────────────────────────────────────────
// Guides are long-form SEO content pages.

const GUIDES_MAP = new Map<string, GuideContent>([
  ['photo-size-requirements', photoSizeRequirementsGuide],
  ['signature-size-requirements', signatureSizeRequirementsGuide],
  ['passport-photo-guidelines', passportPhotoGuidelinesGuide],
  ['how-to-compress-50kb', howToCompress50kbGuide],
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

/**
 * Returns all registered guides.
 */
export function getAllGuides(): GuideContent[] {
  return [...GUIDES_MAP.values()]
}

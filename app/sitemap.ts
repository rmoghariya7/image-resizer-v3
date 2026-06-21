import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/registry/goals'
import { SIZE_TARGETS } from '@/registry/size-presets'
import type { GoalDefinition } from '@/types/registry'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

// Number of goal URLs per sitemap chunk. At 1 000 we are well within Google's
// recommended per-sitemap limits (50 000 URLs / 50 MB) while still giving room
// to grow to tens of thousands of goals without code changes.
const GOALS_PER_CHUNK = 1_000

const GOAL_PRIORITY: Record<GoalDefinition['priority'], number> = {
  high: 0.8,
  medium: 0.6,
  low: 0.4,
}

// ─── Segment layout ───────────────────────────────────────────────────────────
//
//  id = 0          → homepage + compress pages  (static segment, always id 0)
//  id = 1 … N      → goal pages, up to GOALS_PER_CHUNK per segment
//
// Adding future route families (categories, blog) means inserting them into the
// id=0 block (if small) or creating dedicated top-level segments alongside the
// goals segments. No changes to generateSitemaps() are needed until a new family
// itself exceeds GOALS_PER_CHUNK URLs.

export async function generateSitemaps() {
  const goals = getSitemapEntries()
  const goalSegments = Math.max(1, Math.ceil(goals.length / GOALS_PER_CHUNK))
  // id 0 is the static segment; ids 1 … goalSegments hold goal chunks
  return Array.from({ length: goalSegments + 1 }, (_, id) => ({ id }))
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // ── Segment 0: static pages + compress pages ─────────────────────────────
  if (id === 0) {
    const homepage: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ]

    const compressPages: MetadataRoute.Sitemap = SIZE_TARGETS.map((target) => ({
      url: `${BASE_URL}/compress-image-under-${target.sizeParam}`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // When category pages are implemented at /categories/[category], add them here:
    //
    // const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    //   url: `${BASE_URL}/categories/${cat.slug}`,
    //   lastModified: new Date(cat.updatedAt),
    //   changeFrequency: 'monthly' as const,
    //   priority: cat.priority,
    // }))
    //
    // return [...homepage, ...compressPages, ...categoryPages]

    return [...homepage, ...compressPages]
  }

  // ── Segments 1+: goal pages ───────────────────────────────────────────────
  const offset = (id - 1) * GOALS_PER_CHUNK
  const chunk = getSitemapEntries().slice(offset, offset + GOALS_PER_CHUNK)

  return chunk.map((entry) => ({
    url: `${BASE_URL}/goals/${entry.slug}`,
    lastModified: new Date(entry.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: GOAL_PRIORITY[entry.priority],
  }))
}

import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { getAllGuides } from '@/content/guides'
import { getLearnSitemapEntries } from '@/registry/learn'
import { getCoreToolPages } from '@/lib/recommendations/engine'
import { BASE_URL } from '@/lib/metadata/generators'

const LEGAL_PAGES = ['/about', '/contact', '/privacy-policy', '/terms']

export default function sitemap(): MetadataRoute.Sitemap {
  // Home page
  const home: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Core tool pages (e.g. /resize-image, /compress-image, /video-to-audio) —
  // registry-driven, see getCoreToolPages().
  const coreToolPages: MetadataRoute.Sitemap = getCoreToolPages().map(tool => ({
    url: `${BASE_URL}${tool.route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = LEGAL_PAGES.map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  // Goal pages — getSitemapEntries() already excludes non-indexable goals.
  // Compress goals (/compress-image-to-[size]) are canonical and included here;
  // the old /compress-image-under-[size] URLs 301-redirect and are not listed.
  const PRIORITY_MAP: Record<string, number> = { high: 0.8, medium: 0.7, low: 0.6 }
  const goalPages: MetadataRoute.Sitemap = getSitemapEntries()
    .map(goal => ({
      url: `${BASE_URL}/${goal.slug}`,
      lastModified: new Date(goal.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: PRIORITY_MAP[goal.priority] ?? 0.7,
    }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map(cat => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Guides index page
  const guidesIndex: MetadataRoute.Sitemap = [{
    url: `${BASE_URL}/guides`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }]

  // Guide pages — use per-guide updatedAt for accurate freshness signals
  const guidePages: MetadataRoute.Sitemap = getAllGuides().map(guide => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Learn index page
  const learnIndex: MetadataRoute.Sitemap = [{
    url: `${BASE_URL}/learn`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }]

  // Learn article pages
  const LEARN_PRIORITY_MAP: Record<string, number> = { high: 0.8, medium: 0.7, low: 0.6 }
  const learnPages: MetadataRoute.Sitemap = getLearnSitemapEntries().map(entry => ({
    url: `${BASE_URL}/learn/${entry.slug}`,
    lastModified: new Date(entry.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: LEARN_PRIORITY_MAP[entry.priority] ?? 0.7,
  }))

  return [
    ...home,
    ...coreToolPages,
    ...learnIndex,
    ...categoryPages,
    ...goalPages,
    ...guidesIndex,
    ...guidePages,
    ...learnPages,
    ...legalPages,
  ]
}

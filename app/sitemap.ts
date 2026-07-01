import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { getAllSizeParams } from '@/registry/size-presets'
import { getAllGuides } from '@/content/guides'
import { getLearnSitemapEntries } from '@/registry/learn'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

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

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = LEGAL_PAGES.map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  // Goal pages — excludes compress goals which are noindex (canonical → /compress-image-under-*)
  // Compress goal slugs always start with 'compress-image-to-'
  const PRIORITY_MAP: Record<string, number> = { high: 0.8, medium: 0.7, low: 0.6 }
  const goalPages: MetadataRoute.Sitemap = getSitemapEntries()
    .filter(goal => !goal.slug.startsWith('compress-image-to-'))
    .map(goal => ({
      url: `${BASE_URL}/${goal.slug}`,
      lastModified: new Date(goal.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: PRIORITY_MAP[goal.priority] ?? 0.7,
    }))

  // Compress-under pages — separate from goal pages, live at /compress-image-under-[size]
  const compressionPages: MetadataRoute.Sitemap = getAllSizeParams().map(size => ({
    url: `${BASE_URL}/compress-image-under-${size}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map(cat => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

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
    ...learnIndex,
    ...categoryPages,
    ...compressionPages,
    ...goalPages,
    ...guidePages,
    ...learnPages,
    ...legalPages,
  ]
}

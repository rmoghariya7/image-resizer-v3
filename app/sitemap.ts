import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { getAllSizeParams } from '@/registry/size-presets'

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
  ]

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = LEGAL_PAGES.map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  // Goal pages — includes compress goals at /goals/compress-image-to-*
  const goalPages: MetadataRoute.Sitemap = getSitemapEntries().map(goal => ({
    url: `${BASE_URL}/goals/${goal.slug}`,
    lastModified: new Date(goal.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
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

  return [...home, ...categoryPages, ...compressionPages, ...goalPages, ...legalPages]
}

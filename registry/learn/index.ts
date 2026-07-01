import type { LearnArticle, LearnCategory } from './schema'
import { imageCompressionExplainedArticle } from './articles/image-compression-explained'
import { howToCompressImagesToExactFileSizesArticle } from './articles/how-to-compress-images-to-exact-file-sizes'
import { completePassportPhotoGuideArticle } from './articles/complete-passport-photo-guide'
import { completeSignatureUploadGuideArticle } from './articles/complete-signature-upload-guide'
import { jpegVsPngArticle } from './articles/jpeg-vs-png'
import { imageDimensionsVsFileSizeArticle } from './articles/image-dimensions-vs-file-size'
import { commonImageUploadProblemsArticle } from './articles/common-image-upload-problems'
import { photoRequirementsForOnlineApplicationsArticle } from './articles/photo-requirements-for-online-applications'
import { howBrowserBasedImageProcessingWorksArticle } from './articles/how-browser-based-image-processing-works'
import { imageOptimizationBestPracticesArticle } from './articles/image-optimization-best-practices'

// ─── All articles ─────────────────────────────────────────────────────────────

const ALL_ARTICLES: readonly LearnArticle[] = Object.freeze([
  imageCompressionExplainedArticle,
  howToCompressImagesToExactFileSizesArticle,
  completePassportPhotoGuideArticle,
  completeSignatureUploadGuideArticle,
  jpegVsPngArticle,
  imageDimensionsVsFileSizeArticle,
  commonImageUploadProblemsArticle,
  photoRequirementsForOnlineApplicationsArticle,
  howBrowserBasedImageProcessingWorksArticle,
  imageOptimizationBestPracticesArticle,
])

// ─── Map index ────────────────────────────────────────────────────────────────

const ARTICLE_MAP = new Map<string, LearnArticle>(
  ALL_ARTICLES.map((a) => [a.slug, a]),
)

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Returns a single article by slug, or undefined if not found. */
export function getLearnArticle(slug: string): LearnArticle | undefined {
  return ARTICLE_MAP.get(slug)
}

/** Returns all published articles. */
export function getAllLearnArticles(): readonly LearnArticle[] {
  return ALL_ARTICLES.filter((a) => a.status === 'published')
}

/** Returns all published articles for a given category. */
export function getLearnArticlesByCategory(
  category: LearnCategory,
): LearnArticle[] {
  return ALL_ARTICLES.filter(
    (a) => a.category === category && a.status === 'published',
  )
}

/** Returns related articles for a given slug (published only, slug must exist). */
export function getRelatedLearnArticles(slug: string): LearnArticle[] {
  const article = ARTICLE_MAP.get(slug)
  if (!article) return []
  return article.relatedArticles
    .map((s) => ARTICLE_MAP.get(s))
    .filter((a): a is LearnArticle => a !== undefined && a.status === 'published')
}

/** Returns all published article slugs. Used for generateStaticParams and sitemap. */
export function getLearnSlugs(): string[] {
  return ALL_ARTICLES.filter((a) => a.status === 'published').map((a) => a.slug)
}

/** Returns static params for Next.js generateStaticParams(). */
export function getLearnStaticParams(): Array<{ slug: string }> {
  return getLearnSlugs().map((slug) => ({ slug }))
}

/** Returns featured articles (high priority, published). */
export function getFeaturedLearnArticles(limit = 4): LearnArticle[] {
  return ALL_ARTICLES.filter(
    (a) => a.status === 'published' && a.priority === 'high',
  ).slice(0, limit)
}

/**
 * Returns sitemap entries for all published articles.
 * Suitable for next-sitemap or a custom sitemap route.
 */
export function getLearnSitemapEntries(): Array<{
  slug: string
  updatedAt: string
  priority: LearnArticle['priority']
}> {
  return ALL_ARTICLES.filter((a) => a.status === 'published').map((a) => ({
    slug:      a.slug,
    updatedAt: a.updatedAt,
    priority:  a.priority,
  }))
}

/** Total number of registered articles (including drafts). */
export function getTotalLearnArticleCount(): number {
  return ALL_ARTICLES.length
}

export type { LearnArticle, LearnCategory }

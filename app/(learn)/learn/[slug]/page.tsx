import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import {
  getLearnArticle,
  getLearnStaticParams,
  getRelatedLearnArticles,
} from '@/registry/learn'
import { LEARN_CATEGORY_LABELS } from '@/registry/learn/schema'
import { generateLearnMetadata, BASE_URL } from '@/lib/metadata/generators'
import { LearnStructuredData } from './_components/LearnStructuredData'
import { LearnArticleBody, TableOfContents } from './_components/LearnArticleBody'
import { RelatedLearnSection } from './_components/RelatedLearnSection'
import { RelatedToolsLearnSection } from './_components/RelatedToolsLearnSection'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getLearnStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getLearnArticle(slug)
  if (!article) return {}
  const canonical = `${BASE_URL}/learn/${article.slug}`
  return generateLearnMetadata(article, canonical)
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getLearnArticle(slug)

  if (!article || article.status !== 'published') {
    notFound()
  }

  const canonical       = `${BASE_URL}/learn/${article.slug}`
  const relatedArticles = getRelatedLearnArticles(article.slug)
  const categoryLabel   = LEARN_CATEGORY_LABELS[article.category]
  const updatedDate     = new Date(article.updatedAt).toLocaleDateString('en-IN', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })

  return (
    <>
      <LearnStructuredData article={article} canonical={canonical} />

      {/* ── Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-muted/20 py-3"
      >
        <ol
          className="mx-auto flex max-w-6xl items-center gap-1 px-4 text-xs text-muted-foreground sm:px-6 lg:px-8"
          role="list"
        >
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href="/learn" className="hover:text-foreground transition-colors">
              Learn
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li
            className="truncate text-foreground"
            aria-current="page"
          >
            {article.shortTitle}
          </li>
        </ol>
      </nav>

      {/* ── Article header */}
      <div className="border-b border-border bg-muted/10 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {categoryLabel}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {article.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {article.readingTime} min read
              </span>
              <span>Updated {updatedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout: TOC + Article body */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">

          {/* Sticky TOC — desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents article={article} />
            </div>
          </aside>

          {/* Article content */}
          <article className="min-w-0" aria-label={article.title}>
            <LearnArticleBody article={article} />

            {/* Related tools CTA */}
            {article.relatedTools.length > 0 && (
              <RelatedToolsLearnSection toolSlugs={article.relatedTools} />
            )}

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <RelatedLearnSection articles={relatedArticles} />
            )}
          </article>

        </div>
      </div>
    </>
  )
}

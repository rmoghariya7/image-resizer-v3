import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock } from 'lucide-react'
import {
  getAllLearnArticles,
  getLearnArticlesByCategory,
} from '@/registry/learn'
import { LEARN_CATEGORY_LABELS, LEARN_CATEGORIES } from '@/registry/learn/schema'
import type { LearnCategory } from '@/registry/learn/schema'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'
const canonical = `${BASE_URL}/learn`

export const metadata: Metadata = {
  title:       'Learn | Image preparation guides and tutorials | Presetly',
  description: 'Guides and tutorials on image compression, photo requirements for Indian government portals, JPEG vs PNG, and everything about preparing images for online applications.',
  alternates:  { canonical },
  openGraph: {
    title:       'Learn — image guides and tutorials | Presetly',
    description: 'In-depth guides on image compression, passport photo requirements, signature uploads, and photo preparation for Indian exam and ID portals.',
    url:         canonical,
    type:        'website',
    siteName:    'Presetly',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Learn | Image guides | Presetly',
    description: 'Guides on image compression, government portal photo requirements, JPEG vs PNG, and more.',
  },
  robots: { index: true, follow: true },
}

const breadcrumbSchema = {
  '@context':       'https://schema.org',
  '@type':          'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',  item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Learn', item: canonical },
  ],
}

const CATEGORY_COLORS: Record<LearnCategory, { badge: string; dot: string }> = {
  'compression':        { badge: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-400' },
  'image-basics':       { badge: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-400' },
  'government-portals': { badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-400' },
  'best-practices':     { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400' },
  'technical':          { badge: 'bg-rose-100 text-rose-700',    dot: 'bg-rose-400' },
}

function ArticleCard({ article }: { article: ReturnType<typeof getAllLearnArticles>[0] }) {
  const colors = CATEGORY_COLORS[article.category]
  return (
    <Link
      href={`/learn/${article.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}
      >
        {LEARN_CATEGORY_LABELS[article.category]}
      </span>

      <h2 className="mt-3 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-indigo-600">
        {article.title}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {article.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {article.readingTime} min read
        </span>
        <span
          aria-hidden="true"
          className="text-xs font-medium text-indigo-500 transition-transform group-hover:translate-x-0.5"
        >
          Read →
        </span>
      </div>
    </Link>
  )
}

export default function LearnIndexPage() {
  const allArticles = getAllLearnArticles()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Page header */}
      <section className="border-b border-border bg-muted/20 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
              <BookOpen className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Learn
            </p>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Image preparation guides
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Everything you need to know about preparing photos for Indian government portals,
            understanding image compression, and getting uploads accepted first time.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {allArticles.length} guides
          </p>
        </div>
      </section>

      {/* ── Articles by category */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {LEARN_CATEGORIES.map((category) => {
          const articles = getLearnArticlesByCategory(category as LearnCategory)
          if (articles.length === 0) return null
          const colors = CATEGORY_COLORS[category as LearnCategory]
          return (
            <section
              key={category}
              aria-labelledby={`category-${category}`}
              className="mb-14 last:mb-0"
            >
              <div className="mb-6 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${colors.dot}`} aria-hidden="true" />
                <h2
                  id={`category-${category}`}
                  className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {LEARN_CATEGORY_LABELS[category as LearnCategory]}
                </h2>
              </div>
              <ul
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {articles.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}

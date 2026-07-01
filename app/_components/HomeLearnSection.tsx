import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { getFeaturedLearnArticles } from '@/registry/learn'
import { LEARN_CATEGORY_LABELS } from '@/registry/learn/schema'
import type { LearnCategory } from '@/registry/learn/schema'

const CATEGORY_BADGE: Record<LearnCategory, string> = {
  'compression':        'bg-amber-100 text-amber-700',
  'image-basics':       'bg-blue-100 text-blue-700',
  'government-portals': 'bg-violet-100 text-violet-700',
  'best-practices':     'bg-emerald-100 text-emerald-700',
  'technical':          'bg-rose-100 text-rose-700',
}

export function HomeLearnSection() {
  const articles = getFeaturedLearnArticles(4)

  if (articles.length === 0) return null

  return (
    <section
      aria-labelledby="home-learn-heading"
      className="border-t border-border bg-muted/10 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100"
              aria-hidden="true"
            >
              <BookOpen className="h-4 w-4 text-indigo-600" />
            </span>
            <h2
              id="home-learn-heading"
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Learn
            </h2>
          </div>
          <Link
            href="/learn"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            All guides
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Article cards */}
        <ul
          className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/learn/${article.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-all hover:border-indigo-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span
                  className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_BADGE[article.category]}`}
                >
                  {LEARN_CATEGORY_LABELS[article.category]}
                </span>
                <span className="mt-2.5 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-indigo-600">
                  {article.title}
                </span>
                <span className="mt-auto flex items-center gap-1 pt-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {article.readingTime} min read
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

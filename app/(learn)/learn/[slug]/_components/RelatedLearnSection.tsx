import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { LearnArticle } from '@/registry/learn/schema'
import { LEARN_CATEGORY_LABELS } from '@/registry/learn/schema'

interface Props {
  articles: LearnArticle[]
}

export function RelatedLearnSection({ articles }: Props) {
  if (articles.length === 0) return null

  return (
    <aside aria-labelledby="related-learn-heading" className="mt-12 pt-12 border-t border-border">
      <h2
        id="related-learn-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related guides
      </h2>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/learn/${article.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-indigo-300 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <span className="text-xs font-medium text-indigo-500">
                {LEARN_CATEGORY_LABELS[article.category]}
              </span>
              <span className="mt-1.5 text-sm font-semibold leading-snug text-foreground group-hover:text-indigo-600 transition-colors">
                {article.title}
              </span>
              <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {article.readingTime} min
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

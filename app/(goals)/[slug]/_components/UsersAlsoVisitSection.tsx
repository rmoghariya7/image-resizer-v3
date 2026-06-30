import Link from 'next/link'
import { buildGoalHref } from '@/lib/recommendations/engine'
import { getCategory } from '@/registry/categories'
import type { GoalDefinition } from '@/types/registry'

interface Props {
  goals: GoalDefinition[]
}

const CATEGORY_LABELS: Record<string, string> = {
  exam: 'Exam',
  'id-documents': 'ID Document',
  compress: 'Compression',
  signature: 'Signature',
}

export function UsersAlsoVisitSection({ goals }: Props) {
  if (goals.length === 0) return null

  return (
    <section
      aria-labelledby="also-visit-heading"
      className="bg-background px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Popular with this tool
          </p>
          <h2
            id="also-visit-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground"
          >
            Users also visit
          </h2>
        </div>

        <ul
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {goals.map(goal => {
            const catLabel =
              CATEGORY_LABELS[goal.category] ??
              getCategory(goal.category)?.name ??
              goal.category

            return (
              <li key={goal.slug}>
                <Link
                  href={buildGoalHref(goal)}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {catLabel}
                  </span>
                  <span className="mt-1.5 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {goal.shortTitle}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {goal.description}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-4 text-xs font-medium text-primary transition-transform group-hover:translate-x-0.5"
                  >
                    Use tool →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

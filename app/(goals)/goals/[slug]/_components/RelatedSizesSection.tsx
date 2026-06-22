import Link from 'next/link'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalDefinition } from '@/types/registry'

interface Props {
  goals: GoalDefinition[]
  heading?: string
}

export function RelatedSizesSection({
  goals,
  heading = 'Related compression sizes',
}: Props) {
  if (goals.length === 0) return null

  return (
    <section
      aria-labelledby="related-sizes-heading"
      className="border-t border-border/40 bg-muted/20 px-4 py-8 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <p
          id="related-sizes-heading"
          className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {heading}
        </p>

        <ul className="flex flex-wrap gap-2" role="list">
          {goals.map(goal => (
            <li key={goal.slug}>
              <Link
                href={buildGoalHref(goal)}
                className="inline-flex rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {goal.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

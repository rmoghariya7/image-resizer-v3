import Link from 'next/link'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalDefinition } from '@/types/registry'

interface Props {
  goals: GoalDefinition[]
}

const CATEGORY_NAMES: Record<string, string> = {
  exam: 'Exam Photos',
  'id-documents': 'ID Documents',
  compress: 'Compression',
  signature: 'Signature',
}

const CATEGORY_ORDER = ['exam', 'id-documents', 'signature', 'compress']

function groupByCategory(goals: GoalDefinition[]): [string, GoalDefinition[]][] {
  const map = new Map<string, GoalDefinition[]>()
  for (const goal of goals) {
    map.set(goal.category, [...(map.get(goal.category) ?? []), goal])
  }
  return CATEGORY_ORDER
    .filter(cat => map.has(cat))
    .map(cat => [cat, map.get(cat)!] as [string, GoalDefinition[]])
}

export function ExploreMoreToolsSection({ goals }: Props) {
  if (goals.length === 0) return null

  const columns = groupByCategory(goals)

  return (
    <section
      aria-labelledby="explore-heading"
      className="border-t border-border bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Explore Presetly
          </p>
          <h2
            id="explore-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground"
          >
            More tools
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map(([cat, catGoals]) => (
            <div key={cat}>
              <p className="mb-3 text-xs font-semibold text-foreground">
                {CATEGORY_NAMES[cat] ?? cat}
              </p>
              <ul className="space-y-2" role="list">
                {catGoals.map(goal => (
                  <li key={goal.slug}>
                    <Link
                      href={buildGoalHref(goal)}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {goal.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

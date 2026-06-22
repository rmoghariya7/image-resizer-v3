import Link from 'next/link'
import { getAllGoals, getGoal } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { SIZE_TARGETS } from '@/registry/size-presets'
import { compressGoalSlug } from '@/registry/goals/compress'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalCategory, GoalDefinition } from '@/types/registry'
import type { SizeTarget } from '@/registry/size-presets'

const CATEGORY_ORDER: GoalCategory[] = ['exam', 'id-documents', 'signature']

const FEATURED_SIZE_PARAMS = ['15kb', '20kb', '25kb', '50kb', '75kb', '100kb', '150kb', '200kb']

export function InternalLinksSection() {
  const goals = getAllGoals()
  const categories = getAllCategories()

  const goalsByCategory: Partial<Record<GoalCategory, GoalDefinition[]>> = {}
  for (const cat of CATEGORY_ORDER) {
    goalsByCategory[cat] = goals.filter(g => g.category === cat)
  }

  const featuredSizes = FEATURED_SIZE_PARAMS
    .map(param => {
      const target = SIZE_TARGETS.find(t => t.sizeParam === param)
      if (!target) return null
      const goal = getGoal(compressGoalSlug(target))
      if (!goal) return null
      return { target, goal }
    })
    .filter((x): x is { target: SizeTarget; goal: GoalDefinition } => x !== null)

  return (
    <section
      aria-label="All tools by category"
      className="border-t border-border bg-muted/20 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          All tools
        </h2>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Compress by size column */}
          <div>
            <p className="mb-3 text-xs font-semibold text-foreground">
              Compress by size
            </p>
            <ul className="space-y-2" role="list">
              {featuredSizes.map(({ target, goal }) => (
                <li key={target.id}>
                  <Link
                    href={buildGoalHref(goal)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {target.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Goal categories */}
          {CATEGORY_ORDER.map(catSlug => {
            const catDef = categories.find(c => c.slug === catSlug)
            const catGoals = goalsByCategory[catSlug] ?? []

            return (
              <div key={catSlug}>
                <p className="mb-3 text-xs font-semibold text-foreground">
                  {catDef?.name ?? catSlug}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

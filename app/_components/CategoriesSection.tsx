import Link from 'next/link'
import { ArrowRight, GraduationCap, CreditCard, Minimize2, PenLine } from 'lucide-react'
import { getGoalsByCategory } from '@/registry/goals'
import { getAllCategories, getCategory } from '@/registry/categories'
import type { GoalCategory } from '@/types/registry'
import type { ElementType } from 'react'

const CATEGORY_META: Record<
  GoalCategory,
  { Icon: ElementType; color: string; iconBg: string }
> = {
  exam: {
    Icon: GraduationCap,
    color: 'text-violet-700',
    iconBg: 'bg-violet-100',
  },
  'id-documents': {
    Icon: CreditCard,
    color: 'text-blue-700',
    iconBg: 'bg-blue-100',
  },
  compress: {
    Icon: Minimize2,
    color: 'text-amber-700',
    iconBg: 'bg-amber-100',
  },
  signature: {
    Icon: PenLine,
    color: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
  },
}

export function CategoriesSection() {
  const categories = getAllCategories()

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Browse by type
          </p>
          <h2
            id="categories-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            All document categories
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every tool is pre-configured for the exact format required.
          </p>
        </div>

        {/* Category grid */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {categories.map(cat => {
            const meta = CATEGORY_META[cat.slug]
            const goalCount = getGoalsByCategory(cat.slug).length
            const categoryDef = getCategory(cat.slug)

            return (
              <li key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md"
                  aria-label={`${cat.name} — ${goalCount} tools`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${meta.iconBg}`}
                    aria-hidden="true"
                  >
                    <meta.Icon className={`size-5 ${meta.color}`} />
                  </div>

                  {/* Name */}
                  <span className="mt-4 block text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>

                  {/* Description */}
                  <span className="mt-1.5 block flex-1 text-sm leading-snug text-muted-foreground line-clamp-2">
                    {categoryDef?.description ?? cat.description}
                  </span>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {goalCount} {goalCount === 1 ? 'tool' : 'tools'}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

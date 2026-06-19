import Link from 'next/link'
import { getCategory } from '@/registry/categories'
import type { GoalDefinition } from '@/types/registry'

interface Props {
  goals: GoalDefinition[]
}

export function RelatedGoalsSection({ goals }: Props) {
  if (goals.length === 0) return null

  return (
    <section aria-labelledby="related-heading" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2
          id="related-heading"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          Related tools
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {goals.map((goal) => {
            const categoryName = getCategory(goal.category)?.name ?? goal.category

            return (
              <li key={goal.slug}>
                <Link
                  href={`/goals/${goal.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">
                    {categoryName}
                  </span>
                  <span className="mt-1.5 text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {goal.shortTitle}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {goal.description}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-4 text-xs font-medium text-indigo-500 transition-transform group-hover:translate-x-0.5"
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

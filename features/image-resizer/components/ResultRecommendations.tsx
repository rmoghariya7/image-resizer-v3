'use client'

import Link from 'next/link'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { ResultScreenRecommendations } from '@/lib/recommendations/engine'

interface Props {
  recommendations: ResultScreenRecommendations
}

export function ResultRecommendations({ recommendations }: Props) {
  const { smaller, larger, complementary } = recommendations

  const hasSizes = smaller.length > 0 || larger.length > 0
  const hasComplementary = complementary.length > 0

  if (!hasSizes && !hasComplementary) return null

  return (
    <section
      aria-label="Next steps"
      className="border-t border-gray-100 bg-gray-50 px-4 pb-6 pt-5 sm:px-6"
    >
      <div className="mx-auto max-w-2xl space-y-5">

        {/* Compress size recommendations */}
        {hasSizes && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Need a different size?
            </p>
            <div className="flex flex-wrap gap-2">
              {smaller.map(goal => (
                <Link
                  key={goal.slug}
                  href={buildGoalHref(goal)}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 text-gray-400"
                    aria-hidden="true"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  {goal.shortTitle}
                </Link>
              ))}
              {larger.map(goal => (
                <Link
                  key={goal.slug}
                  href={buildGoalHref(goal)}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 text-gray-400"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {goal.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Complementary goal links */}
        {hasComplementary && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              You might also need
            </p>
            <div className="flex flex-wrap gap-2">
              {complementary.map(goal => (
                <Link
                  key={goal.slug}
                  href={buildGoalHref(goal)}
                  className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {goal.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

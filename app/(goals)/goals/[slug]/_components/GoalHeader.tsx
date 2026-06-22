import type { GoalDefinition } from '@/types/registry'
import { BackButton } from './BackButton'

interface Props {
  goal: GoalDefinition
}

export function GoalHeader({ goal }: Props) {
  return (
    <div className="border-b border-gray-100 bg-white px-4 py-6 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <BackButton />

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {goal.title}
        </h1>

        {/* Mobile: clamp to 2 lines to keep tool above the fold */}
        <p className="mt-3 text-base leading-relaxed text-gray-600 line-clamp-2 sm:mt-4 sm:text-lg sm:line-clamp-none">
          {goal.description}
        </p>

        {/* Tags hidden on mobile — visible on sm+ only */}
        <div className="mt-6 hidden flex-wrap items-center gap-2 sm:flex">
          {goal.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

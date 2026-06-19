import Link from 'next/link'
import type { GoalDefinition } from '@/types/registry'

const CATEGORY_LABELS: Record<GoalDefinition['category'], string> = {
  exam: 'Exam Photos',
  'id-documents': 'ID Documents',
  compress: 'Compress Image',
  signature: 'Signature Tools',
}

interface Props {
  goal: GoalDefinition
}

export function GoalHeader({ goal }: Props) {
  const categoryLabel = CATEGORY_LABELS[goal.category]

  return (
    <div className="border-b border-gray-100 bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/categories/${goal.category}`}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          <span aria-hidden="true">←</span>
          {categoryLabel}
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {goal.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          {goal.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
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

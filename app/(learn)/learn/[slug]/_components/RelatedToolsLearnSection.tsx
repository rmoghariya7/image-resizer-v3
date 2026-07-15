import Link from 'next/link'
import { getGoal } from '@/registry/goals'
import { SIZE_TARGETS } from '@/registry/size-presets'

interface Props {
  toolSlugs: string[]
}

function resolveToolTitle(slug: string): string | null {
  // Try size-preset first
  const sizeTarget = SIZE_TARGETS.find((t) => t.slug === slug)
  if (sizeTarget) return sizeTarget.title

  // Try goal registry
  const goal = getGoal(slug)
  if (goal) return goal.shortTitle ?? goal.title

  return null
}

function resolveToolDescription(slug: string): string | null {
  const sizeTarget = SIZE_TARGETS.find((t) => t.slug === slug)
  if (sizeTarget) return sizeTarget.useCase

  const goal = getGoal(slug)
  if (goal) return goal.description

  return null
}

export function RelatedToolsLearnSection({ toolSlugs }: Props) {
  const tools = toolSlugs
    .map((slug) => {
      const title = resolveToolTitle(slug)
      if (!title) return null
      return {
        slug,
        href:        `/${slug}`,
        title,
        description: resolveToolDescription(slug) ?? '',
      }
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)

  if (tools.length === 0) return null

  return (
    <aside
      aria-labelledby="related-tools-heading"
      className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/50 p-6"
    >
      <p
        id="related-tools-heading"
        className="text-xs font-semibold uppercase tracking-wider text-indigo-600"
      >
        Free tools for this topic
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" role="list">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={tool.href}
              className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              {tool.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

import { getAllGoals } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { getAllTools } from '@/registry/tools'
import { SIZE_TARGETS } from '@/registry/size-presets'
import type { GoalCategory } from '@/registry/goals/schema'
import type {
  SearchIndex,
  FilteredSearchIndex,
  GoalSearchItem,
  CategorySearchItem,
  ToolSearchItem,
} from './types'

export function buildSearchIndex(): SearchIndex {
  const sizeGoals: GoalSearchItem[] = SIZE_TARGETS.map((target) => ({
    type: 'goal',
    slug: target.slug,
    href: `/compress-image-under-${target.sizeParam}`,
    label: target.title,
    shortLabel: target.shortTitle,
    description: target.useCase,
    category: 'compress' as GoalCategory,
    keywords: [
      target.title.toLowerCase(),
      target.shortTitle.toLowerCase(),
      target.displaySize.toLowerCase(),
      ...target.keywords,
    ],
  }))

  const goals: GoalSearchItem[] = [
    ...sizeGoals,
    ...getAllGoals().map((goal) => ({
    type: 'goal' as const,
    slug: goal.slug,
    href: `/goals/${goal.slug}`,
    label: goal.title,
    shortLabel: goal.shortTitle,
    description: goal.description,
    category: goal.category,
    keywords: [
      goal.title.toLowerCase(),
      goal.shortTitle.toLowerCase(),
      goal.category.toLowerCase(),
      ...goal.tags.map((t) => t.toLowerCase()),
      ...goal.keywords.map((k) => k.toLowerCase()),
    ],
  })),
  ]

  const categories: CategorySearchItem[] = getAllCategories().map((cat) => ({
    type: 'category',
    slug: cat.slug as GoalCategory,
    href: `/categories/${cat.slug}`,
    label: cat.name,
    description: cat.description,
    keywords: [
      cat.name.toLowerCase(),
      cat.description.toLowerCase(),
      ...cat.keywords.map((k) => k.toLowerCase()),
    ],
  }))

  const tools: ToolSearchItem[] = getAllTools().map((tool) => ({
    type: 'tool',
    key: tool.key,
    href: `/tools/${tool.key}`,
    label: tool.name,
    description: tool.description,
    keywords: [
      tool.name.toLowerCase(),
      tool.description.toLowerCase(),
      ...tool.capabilities.map((c) => c.toLowerCase()),
    ],
  }))

  return { goals, categories, tools }
}

function matchesQuery(keywords: string[], query: string): boolean {
  return keywords.some((k) => k.includes(query))
}

export function filterSearchIndex(
  index: SearchIndex,
  query: string,
): FilteredSearchIndex {
  const q = query.toLowerCase().trim()

  if (!q) {
    return { goals: [], categories: [], tools: [] }
  }

  return {
    goals: index.goals.filter((item) => matchesQuery(item.keywords, q)),
    categories: index.categories.filter((item) =>
      matchesQuery(item.keywords, q),
    ),
    tools: index.tools.filter((item) => matchesQuery(item.keywords, q)),
  }
}

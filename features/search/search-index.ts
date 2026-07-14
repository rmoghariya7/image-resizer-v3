import { getAllGoals } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { getAllTools } from '@/registry/tools'
import { SIZE_TARGETS } from '@/registry/size-presets'
import { getAllLearnArticles } from '@/registry/learn'
import type { GoalCategory } from '@/registry/goals/schema'
import type {
  SearchIndex,
  FilteredSearchIndex,
  GoalSearchItem,
  CategorySearchItem,
  ToolSearchItem,
  LearnSearchItem,
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
    // indexable === false goals (e.g. the compress-image-to-* shadow goals)
    // are true content duplicates of a canonical page already represented
    // above via sizeGoals — surfacing both would show the same destination
    // twice in the search dropdown for the same query.
    ...getAllGoals()
      .filter((goal) => goal.indexable !== false)
      .map((goal) => ({
    type: 'goal' as const,
    slug: goal.slug,
    href: `/${goal.slug}`,
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
    // Standalone tools declare their own route; the rest fall back to the
    // legacy /tools/<key> pattern.
    href: tool.route ?? `/tools/${tool.key}`,
    label: tool.name,
    description: tool.description,
    keywords: [
      tool.name.toLowerCase(),
      tool.description.toLowerCase(),
      ...tool.capabilities.map((c) => c.toLowerCase()),
    ],
  }))

  const learn: LearnSearchItem[] = getAllLearnArticles().map((article) => ({
    type:        'learn' as const,
    slug:        article.slug,
    href:        `/learn/${article.slug}`,
    label:       article.title,
    description: article.description,
    category:    article.category,
    readingTime: article.readingTime,
    keywords: [
      article.title.toLowerCase(),
      article.shortTitle.toLowerCase(),
      article.category.toLowerCase(),
      ...article.tags.map((t) => t.toLowerCase()),
      ...article.keywords.map((k) => k.toLowerCase()),
    ],
  }))

  return { goals, categories, tools, learn }
}

export function filterSearchIndex(index: SearchIndex, query: string): FilteredSearchIndex {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { goals: [], categories: [], tools: [], learn: [] }
  }
  const match = (keywords: string[]) => keywords.some((k) => k.includes(q))
  return {
    goals: index.goals.filter(
      (item) => match(item.keywords) || item.label.toLowerCase().includes(q),
    ),
    categories: index.categories.filter(
      (item) => match(item.keywords) || item.label.toLowerCase().includes(q),
    ),
    tools: index.tools.filter(
      (item) => match(item.keywords) || item.label.toLowerCase().includes(q),
    ),
    learn: index.learn.filter(
      (item) =>
        match(item.keywords) ||
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    ),
  }
}

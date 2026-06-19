import type { GoalCategory, ToolKey } from '@/types/registry'

export type GoalSearchItem = {
  type: 'goal'
  slug: string
  href: string
  label: string
  shortLabel: string
  description: string
  category: GoalCategory
  keywords: string[]
}

export type CategorySearchItem = {
  type: 'category'
  slug: GoalCategory
  href: string
  label: string
  description: string
  keywords: string[]
}

export type ToolSearchItem = {
  type: 'tool'
  key: ToolKey
  href: string
  label: string
  description: string
  keywords: string[]
}

export type SearchItem = GoalSearchItem | CategorySearchItem | ToolSearchItem

export type SearchIndex = {
  readonly goals: readonly GoalSearchItem[]
  readonly categories: readonly CategorySearchItem[]
  readonly tools: readonly ToolSearchItem[]
}

export type FilteredSearchIndex = {
  goals: GoalSearchItem[]
  categories: CategorySearchItem[]
  tools: ToolSearchItem[]
}

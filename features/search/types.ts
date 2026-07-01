import type { GoalCategory, ToolKey } from '@/types/registry'
import type { LearnCategory } from '@/registry/learn/schema'

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

export type LearnSearchItem = {
  type: 'learn'
  slug: string
  href: string
  label: string
  description: string
  category: LearnCategory
  readingTime: number
  keywords: string[]
}

export type SearchItem = GoalSearchItem | CategorySearchItem | ToolSearchItem | LearnSearchItem

export type SearchIndex = {
  goals: GoalSearchItem[]
  categories: CategorySearchItem[]
  tools: ToolSearchItem[]
  learn: LearnSearchItem[]
}

export type FilteredSearchIndex = {
  goals: GoalSearchItem[]
  categories: CategorySearchItem[]
  tools: ToolSearchItem[]
  learn: LearnSearchItem[]
}

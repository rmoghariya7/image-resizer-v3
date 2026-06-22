export { GlobalSearch } from './components/GlobalSearch'
export { SearchCommandPalette } from './components/SearchCommandPalette'
export { SearchTrigger } from './components/SearchTrigger'
export { SearchProvider, useSearch } from './context'
export { buildSearchIndex, filterSearchIndex } from './search-index'
export type {
  SearchItem,
  SearchIndex,
  FilteredSearchIndex,
  GoalSearchItem,
  CategorySearchItem,
  ToolSearchItem,
} from './types'

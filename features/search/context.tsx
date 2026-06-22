'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { SearchIndex } from './types'

type SearchContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openSearch: () => void
  closeSearch: () => void
  index: SearchIndex
}

const EMPTY_INDEX: SearchIndex = { goals: [], categories: [], tools: [] }

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({
  children,
  index = EMPTY_INDEX,
}: {
  children: ReactNode
  index?: SearchIndex
}) {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])
  const closeSearch = useCallback(() => setOpen(false), [])

  return (
    <SearchContext.Provider value={{ open, setOpen, openSearch, closeSearch, index }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within <SearchProvider>')
  return ctx
}

'use client'

import { Search } from 'lucide-react'
import { useSearch } from '../context'

export function SearchTrigger() {
  const { openSearch } = useSearch()

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Open search"
      className="group flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Search className="size-3.5 shrink-0" aria-hidden="true" />

      {/* Label — hidden on very small screens */}
      <span className="hidden sm:inline">Search…</span>

      {/* Keyboard hint — only on desktop */}
      <kbd
        className="ml-1 hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] leading-none text-muted-foreground/70 lg:flex"
        aria-hidden="true"
      >
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}

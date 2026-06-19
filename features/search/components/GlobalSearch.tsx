'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FileImage, FolderOpen, Wrench, ArrowRight } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useSearch } from '../context'
import { filterSearchIndex } from '../search-index'
import type { SearchIndex, GoalSearchItem, CategorySearchItem, ToolSearchItem } from '../types'
import type { GoalCategory } from '@/types/registry'

// ─── Constants ────────────────────────────────────────────────────────────────

const POPULAR_SLUGS = [
  'compress-image-under-50kb',
  'compress-image-under-20kb',
  'compress-image-under-100kb',
  'upsc-photo-resizer',
  'passport-photo-maker',
]

const CATEGORY_LABELS: Record<GoalCategory, string> = {
  exam: 'Exam',
  'id-documents': 'ID Doc',
  compress: 'Compress',
  signature: 'Signature',
}

const CATEGORY_COLORS: Record<GoalCategory, string> = {
  exam: 'bg-violet-100 text-violet-700',
  'id-documents': 'bg-blue-100 text-blue-700',
  compress: 'bg-amber-100 text-amber-700',
  signature: 'bg-emerald-100 text-emerald-700',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoalResultItem({
  item,
  onSelect,
}: {
  item: GoalSearchItem
  onSelect: (href: string) => void
}) {
  return (
    <CommandItem
      value={item.slug}
      onSelect={() => onSelect(item.href)}
      className="gap-2.5"
    >
      <FileImage className="size-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate font-medium">{item.label}</span>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none ${CATEGORY_COLORS[item.category]}`}
      >
        {CATEGORY_LABELS[item.category]}
      </span>
      <ArrowRight className="size-3 shrink-0 text-muted-foreground/40" />
    </CommandItem>
  )
}

function CategoryResultItem({
  item,
  onSelect,
}: {
  item: CategorySearchItem
  onSelect: (href: string) => void
}) {
  return (
    <CommandItem
      value={item.slug}
      onSelect={() => onSelect(item.href)}
      className="gap-2.5"
    >
      <FolderOpen className="size-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate font-medium">{item.label}</span>
      <span className="max-w-40 truncate text-xs text-muted-foreground">
        {item.description}
      </span>
    </CommandItem>
  )
}

function ToolResultItem({
  item,
  onSelect,
}: {
  item: ToolSearchItem
  onSelect: (href: string) => void
}) {
  return (
    <CommandItem
      value={item.key}
      onSelect={() => onSelect(item.href)}
      className="gap-2.5"
    >
      <Wrench className="size-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate font-medium">{item.label}</span>
      <span className="max-w-40 truncate text-xs text-muted-foreground">
        {item.description}
      </span>
    </CommandItem>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  index: SearchIndex
}

export function GlobalSearch({ index }: Props) {
  const { open, setOpen } = useSearch()
  const router = useRouter()
  const [query, setQuery] = useState('')

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [setOpen])

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen)
      if (!isOpen) setQuery('')
    },
    [setOpen],
  )

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      setQuery('')
      router.push(href)
    },
    [router, setOpen],
  )

  // Popular goals (shown when no query)
  const popularGoals = useMemo(
    () => index.goals.filter((g) => POPULAR_SLUGS.includes(g.slug)),
    [index.goals],
  )

  const isSearching = query.trim().length > 0
  const filtered = useMemo(
    () => (isSearching ? filterSearchIndex(index, query) : null),
    [index, query, isSearching],
  )

  const displayGoals = isSearching ? (filtered?.goals ?? []) : popularGoals
  const displayCategories = isSearching
    ? (filtered?.categories ?? [])
    : [...index.categories]
  const displayTools = isSearching ? (filtered?.tools ?? []) : []

  const hasResults =
    displayGoals.length + displayCategories.length + displayTools.length > 0

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Search Presetly"
      description="Search for goals, categories, or tools"
      className="sm:max-w-xl"
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search goals, categories, tools…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-80">
          {isSearching && !hasResults && (
            <CommandEmpty>No results for "{query}"</CommandEmpty>
          )}

          {displayGoals.length > 0 && (
            <CommandGroup heading={isSearching ? 'Goals' : 'Popular goals'}>
              {displayGoals.map((item) => (
                <GoalResultItem
                  key={item.slug}
                  item={item}
                  onSelect={navigate}
                />
              ))}
            </CommandGroup>
          )}

          {displayGoals.length > 0 && displayCategories.length > 0 && (
            <CommandSeparator />
          )}

          {displayCategories.length > 0 && (
            <CommandGroup heading="Categories">
              {displayCategories.map((item) => (
                <CategoryResultItem
                  key={item.slug}
                  item={item}
                  onSelect={navigate}
                />
              ))}
            </CommandGroup>
          )}

          {displayTools.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                {displayTools.map((item) => (
                  <ToolResultItem
                    key={item.key}
                    item={item}
                    onSelect={navigate}
                  />
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>

        {/* Footer hint */}
        <div className="flex items-center gap-3 border-t border-border/60 px-3 py-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">esc</kbd>
            close
          </span>
        </div>
      </Command>
    </CommandDialog>
  )
}

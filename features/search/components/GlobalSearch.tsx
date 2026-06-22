'use client'

import { useEffect, useState, useCallback, useMemo, type ElementType } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, CreditCard, Minimize2, PenLine, FolderOpen, Wrench } from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { useSearch } from '../context'
import { filterSearchIndex } from '../search-index'
import type { GoalSearchItem, CategorySearchItem, ToolSearchItem } from '../types'
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

const CATEGORY_BADGE_STYLE: Record<GoalCategory, string> = {
  exam: 'bg-violet-100 text-violet-700',
  'id-documents': 'bg-blue-100 text-blue-700',
  compress: 'bg-amber-100 text-amber-700',
  signature: 'bg-emerald-100 text-emerald-700',
}

type IconConfig = { Icon: ElementType; bg: string; text: string }

const CATEGORY_ICON_STYLE: Record<GoalCategory, IconConfig> = {
  exam: { Icon: GraduationCap, bg: 'bg-violet-100', text: 'text-violet-600' },
  'id-documents': { Icon: CreditCard, bg: 'bg-blue-100', text: 'text-blue-600' },
  compress: { Icon: Minimize2, bg: 'bg-amber-100', text: 'text-amber-600' },
  signature: { Icon: PenLine, bg: 'bg-emerald-100', text: 'text-emerald-600' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoalResultItem({
  item,
  onSelect,
}: {
  item: GoalSearchItem
  onSelect: (href: string) => void
}) {
  const iconCfg = CATEGORY_ICON_STYLE[item.category]
  const { Icon } = iconCfg

  return (
    <CommandItem
      value={item.slug}
      onSelect={() => onSelect(item.href)}
      className="gap-3 py-2.5"
    >
      <div
        className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', iconCfg.bg)}
        aria-hidden="true"
      >
        <Icon className={cn('size-4', iconCfg.text)} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium leading-tight text-foreground">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
      <span
        className={cn(
          'hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline-flex',
          CATEGORY_BADGE_STYLE[item.category],
        )}
        aria-hidden="true"
      >
        {CATEGORY_LABELS[item.category]}
      </span>
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
      className="gap-3 py-2.5"
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted"
        aria-hidden="true"
      >
        <FolderOpen className="size-4 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium leading-tight text-foreground">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
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
      className="gap-3 py-2.5"
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted"
        aria-hidden="true"
      >
        <Wrench className="size-4 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium leading-tight text-foreground">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
    </CommandItem>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GlobalSearch() {
  const { open, setOpen, index } = useSearch()
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

  const popularGoals = useMemo(
    () => index.goals.filter(g => POPULAR_SLUGS.includes(g.slug)),
    [index.goals],
  )

  const isSearching = query.trim().length > 0
  const filtered = useMemo(
    () => (isSearching ? filterSearchIndex(index, query) : null),
    [index, query, isSearching],
  )

  const displayGoals = isSearching ? (filtered?.goals ?? []) : popularGoals
  const displayCategories = isSearching ? (filtered?.categories ?? []) : [...index.categories]
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
        <CommandList className="max-h-95">
          {isSearching && !hasResults && (
            <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>
          )}

          {displayGoals.length > 0 && (
            <CommandGroup heading={isSearching ? 'Goals' : 'Popular goals'}>
              {displayGoals.map(item => (
                <GoalResultItem key={item.slug} item={item} onSelect={navigate} />
              ))}
            </CommandGroup>
          )}

          {displayGoals.length > 0 && displayCategories.length > 0 && (
            <CommandSeparator />
          )}

          {displayCategories.length > 0 && (
            <CommandGroup heading="Categories">
              {displayCategories.map(item => (
                <CategoryResultItem key={item.slug} item={item} onSelect={navigate} />
              ))}
            </CommandGroup>
          )}

          {displayTools.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                {displayTools.map(item => (
                  <ToolResultItem key={item.key} item={item} onSelect={navigate} />
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>

        {/* Footer keyboard hints */}
        <div className="flex items-center gap-3 border-t border-border/60 px-3 py-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
              ↑↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
              ↵
            </kbd>
            open
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
              esc
            </kbd>
            close
          </span>
        </div>
      </Command>
    </CommandDialog>
  )
}

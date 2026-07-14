'use client'

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ElementType,
} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search,
  GraduationCap,
  CreditCard,
  Minimize2,
  PenLine,
  TrendingUp,
  ArrowRight,
  Wrench,
  FolderOpen,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearch } from '../context'
import { filterSearchIndex } from '../search-index'
import type { GoalSearchItem, ToolSearchItem, CategorySearchItem, LearnSearchItem } from '../types'
import type { GoalCategory } from '@/types/registry'

// ─── Config ───────────────────────────────────────────────────────────────────

const POPULAR_SLUGS = [
  'compress-image-under-50kb',
  'upsc-photo-resizer',
  'aadhaar-photo-resizer',
  'passport-photo-maker',
  'compress-image-under-20kb',
] as const

const SUGGESTIONS = [
  { label: 'Compress Image', query: 'compress' },
  { label: 'Aadhaar Photo', query: 'aadhaar' },
  { label: 'Passport Photo', query: 'passport' },
]

const CATEGORY_LABELS: Record<GoalCategory, string> = {
  exam: 'Exam',
  'id-documents': 'ID Document',
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

const CATEGORY_ORDER: GoalCategory[] = ['exam', 'id-documents', 'signature', 'compress']

// Icon styling for the non-goal result groups (tools/categories/learn share a
// simpler row shape — no per-item category badge, just a group header).
const TOOL_ROW_ICON = { bg: 'bg-sky-100', text: 'text-sky-600' }
const CATEGORY_ROW_ICON = { bg: 'bg-fuchsia-100', text: 'text-fuchsia-600' }
const LEARN_ROW_ICON = { bg: 'bg-teal-100', text: 'text-teal-600' }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupGoalsByCategory(goals: GoalSearchItem[]): [GoalCategory, GoalSearchItem[]][] {
  const map = new Map<GoalCategory, GoalSearchItem[]>()
  for (const goal of goals) {
    map.set(goal.category, [...(map.get(goal.category) ?? []), goal])
  }
  return CATEGORY_ORDER
    .filter(cat => map.has(cat))
    .map(cat => [cat, map.get(cat)!])
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoalRow({
  id,
  goal,
  isActive,
  onSelect,
  onMouseEnter,
}: {
  id: string
  goal: GoalSearchItem
  isActive: boolean
  onSelect: () => void
  onMouseEnter: () => void
}) {
  const iconCfg = CATEGORY_ICON_STYLE[goal.category]
  const { Icon } = iconCfg

  return (
    <Link
      id={id}
      href={goal.href}
      role="option"
      aria-selected={isActive}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      className={cn(
        'group flex w-full items-center gap-3 px-3 py-2.5 transition-colors duration-100',
        isActive ? 'bg-accent' : 'hover:bg-muted/50',
      )}
    >
      <div
        className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', iconCfg.bg)}
        aria-hidden="true"
      >
        <Icon className={cn('size-4', iconCfg.text)} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium leading-tight',
            isActive ? 'text-accent-foreground' : 'text-foreground',
          )}
        >
          {goal.label}
        </p>
        {goal.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {goal.description}
          </p>
        )}
      </div>

      <span
        className={cn(
          'hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline-flex',
          CATEGORY_BADGE_STYLE[goal.category],
        )}
        aria-hidden="true"
      >
        {CATEGORY_LABELS[goal.category]}
      </span>

      <ArrowRight
        className={cn(
          'size-3.5 shrink-0 text-muted-foreground/40 transition-transform duration-100',
          isActive && 'translate-x-0.5 text-muted-foreground',
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

// Generic row for Tool/Category/Learn results — same shape as GoalRow minus
// the per-item category badge (these types don't share GoalCategory).
function SimpleRow({
  id,
  item,
  isActive,
  onSelect,
  onMouseEnter,
  Icon,
  iconBg,
  iconText,
}: {
  id: string
  item: ToolSearchItem | CategorySearchItem | LearnSearchItem
  isActive: boolean
  onSelect: () => void
  onMouseEnter: () => void
  Icon: ElementType
  iconBg: string
  iconText: string
}) {
  return (
    <Link
      id={id}
      href={item.href}
      role="option"
      aria-selected={isActive}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      className={cn(
        'group flex w-full items-center gap-3 px-3 py-2.5 transition-colors duration-100',
        isActive ? 'bg-accent' : 'hover:bg-muted/50',
      )}
    >
      <div
        className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', iconBg)}
        aria-hidden="true"
      >
        <Icon className={cn('size-4', iconText)} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium leading-tight',
            isActive ? 'text-accent-foreground' : 'text-foreground',
          )}
        >
          {item.label}
        </p>
        {item.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>

      <ArrowRight
        className={cn(
          'size-3.5 shrink-0 text-muted-foreground/40 transition-transform duration-100',
          isActive && 'translate-x-0.5 text-muted-foreground',
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

function EmptyState({
  query,
  onSuggest,
}: {
  query: string
  onSuggest: (q: string) => void
}) {
  return (
    <div className="px-4 py-8 text-center">
      <p className="text-sm font-medium text-foreground">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Try one of these:</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s.query}
            type="button"
            onClick={() => onSuggest(s.query)}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  placeholder?: string
  className?: string
  maxResults?: number
}

export function SearchCommandPalette({
  placeholder = 'Search: UPSC photo, Aadhaar, 50KB compress…',
  className,
  maxResults = 12,
}: Props) {
  const { index } = useSearch()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 120)
    return () => clearTimeout(timer)
  }, [query])

  // Reset active index when results change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: one-shot reset on query change
    setActiveIndex(-1)
  }, [debouncedQuery])

  const isSearching = debouncedQuery.trim().length > 0

  const popularGoals = useMemo(
    () => index.goals.filter(g => (POPULAR_SLUGS as readonly string[]).includes(g.slug)),
    [index.goals],
  )

  // Single filter pass shared by all four result types — filterSearchIndex
  // already partitions goals/tools/categories/learn, so there's no need to
  // call it once per type.
  const filteredIndex = useMemo(
    () => (isSearching ? filterSearchIndex(index, debouncedQuery) : null),
    [index, debouncedQuery, isSearching],
  )

  const filteredGoals = useMemo(
    () => filteredIndex?.goals.slice(0, maxResults) ?? [],
    [filteredIndex, maxResults],
  )
  const filteredTools = useMemo(
    () => filteredIndex?.tools.slice(0, 4) ?? [],
    [filteredIndex],
  )
  const filteredCategories = useMemo(
    () => filteredIndex?.categories.slice(0, 3) ?? [],
    [filteredIndex],
  )
  const filteredLearn = useMemo(
    () => filteredIndex?.learn.slice(0, 3) ?? [],
    [filteredIndex],
  )

  const displayItems = isSearching
    ? [...filteredGoals, ...filteredTools, ...filteredCategories, ...filteredLearn]
    : popularGoals
  const hasResults = displayItems.length > 0
  const showDropdown = open && (hasResults || isSearching)

  const groupedResults = useMemo(
    () => (isSearching ? groupGoalsByCategory(filteredGoals) : []),
    [filteredGoals, isSearching],
  )

  // Close on outside click
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  // cleanup — resets state only; used for mouse/touch clicks where Link href handles nav
  const cleanup = useCallback(() => {
    setOpen(false)
    setActiveIndex(-1)
    setQuery('')
  }, [])

  // navigate — cleanup + router.push; used for keyboard Enter only
  const navigate = useCallback(
    (href: string) => {
      cleanup()
      router.push(href)
    },
    [router, cleanup],
  )

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
      return
    }
    if (!showDropdown || !hasResults) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => Math.min(prev + 1, displayItems.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && displayItems[activeIndex]) {
          navigate(displayItems[activeIndex].href)
        }
        break
    }
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="palette-listbox"
          aria-activedescendant={activeIndex >= 0 ? `palette-item-${activeIndex}` : undefined}
          aria-label="Search for a tool"
          autoComplete="off"
          spellCheck={false}
          className={cn(
            'h-12 w-full rounded-xl border border-border bg-background px-4 pl-11 text-base shadow-sm',
            'text-foreground placeholder:text-muted-foreground',
            'transition-[border-color,box-shadow] duration-150',
            'outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15',
            '[&::-webkit-search-cancel-button]:hidden',
          )}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          id="palette-listbox"
          role="listbox"
          aria-label="Search results"
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-2',
            'max-h-100 overflow-y-auto',
            'rounded-xl border border-border bg-popover',
            'shadow-xl shadow-black/8',
            'animate-in fade-in-0 slide-in-from-top-2 duration-150',
          )}
        >
          {isSearching && !hasResults ? (
            <EmptyState
              query={debouncedQuery}
              onSuggest={q => {
                setQuery(q)
                setOpen(true)
                inputRef.current?.focus()
              }}
            />
          ) : isSearching ? (
            <>
              {groupedResults.map(([cat, goals], groupIdx) => (
                <div key={cat}>
                  <div
                    className={cn(
                      'px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground',
                      groupIdx === 0 ? 'pt-3' : 'pt-2.5',
                    )}
                    aria-hidden="true"
                  >
                    {CATEGORY_LABELS[cat]}
                  </div>
                  {goals.map(goal => {
                    const idx = displayItems.indexOf(goal)
                    return (
                      <GoalRow
                        key={goal.slug}
                        id={`palette-item-${idx}`}
                        goal={goal}
                        isActive={activeIndex === idx}
                        onSelect={cleanup}
                        onMouseEnter={() => setActiveIndex(idx)}
                      />
                    )
                  })}
                </div>
              ))}

              {filteredTools.length > 0 && (
                <div>
                  <div
                    className="flex items-center gap-1.5 px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                    aria-hidden="true"
                  >
                    <Wrench size={11} />
                    Tools
                  </div>
                  {filteredTools.map(tool => {
                    const idx = displayItems.indexOf(tool)
                    return (
                      <SimpleRow
                        key={tool.href}
                        id={`palette-item-${idx}`}
                        item={tool}
                        isActive={activeIndex === idx}
                        onSelect={cleanup}
                        onMouseEnter={() => setActiveIndex(idx)}
                        Icon={Wrench}
                        iconBg={TOOL_ROW_ICON.bg}
                        iconText={TOOL_ROW_ICON.text}
                      />
                    )
                  })}
                </div>
              )}

              {filteredCategories.length > 0 && (
                <div>
                  <div
                    className="flex items-center gap-1.5 px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                    aria-hidden="true"
                  >
                    <FolderOpen size={11} />
                    Categories
                  </div>
                  {filteredCategories.map(cat => {
                    const idx = displayItems.indexOf(cat)
                    return (
                      <SimpleRow
                        key={cat.href}
                        id={`palette-item-${idx}`}
                        item={cat}
                        isActive={activeIndex === idx}
                        onSelect={cleanup}
                        onMouseEnter={() => setActiveIndex(idx)}
                        Icon={FolderOpen}
                        iconBg={CATEGORY_ROW_ICON.bg}
                        iconText={CATEGORY_ROW_ICON.text}
                      />
                    )
                  })}
                </div>
              )}

              {filteredLearn.length > 0 && (
                <div>
                  <div
                    className="flex items-center gap-1.5 px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                    aria-hidden="true"
                  >
                    <BookOpen size={11} />
                    Learn
                  </div>
                  {filteredLearn.map(item => {
                    const idx = displayItems.indexOf(item)
                    return (
                      <SimpleRow
                        key={item.href}
                        id={`palette-item-${idx}`}
                        item={item}
                        isActive={activeIndex === idx}
                        onSelect={cleanup}
                        onMouseEnter={() => setActiveIndex(idx)}
                        Icon={BookOpen}
                        iconBg={LEARN_ROW_ICON.bg}
                        iconText={LEARN_ROW_ICON.text}
                      />
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-1.5 px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                aria-hidden="true"
              >
                <TrendingUp size={11} />
                Popular tools
              </div>
              {popularGoals.map((goal, idx) => (
                <GoalRow
                  key={goal.slug}
                  id={`palette-item-${idx}`}
                  goal={goal}
                  isActive={activeIndex === idx}
                  onSelect={cleanup}
                  onMouseEnter={() => setActiveIndex(idx)}
                />
              ))}
            </>
          )}

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
        </div>
      )}
    </div>
  )
}

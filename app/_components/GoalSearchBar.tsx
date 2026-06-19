'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { GoalCategory } from '@/types/registry'

export type GoalSearchItem = {
  slug: string
  title: string
  shortTitle: string
  category: GoalCategory
  tags: string[]
}

const CATEGORY_LABELS: Record<GoalCategory, string> = {
  exam: 'Exam',
  'id-documents': 'ID Document',
  compress: 'Compress',
  signature: 'Signature',
}

const CATEGORY_COLORS: Record<GoalCategory, string> = {
  exam: 'bg-violet-50 text-violet-700',
  'id-documents': 'bg-blue-50 text-blue-700',
  compress: 'bg-amber-50 text-amber-700',
  signature: 'bg-emerald-50 text-emerald-700',
}

interface Props {
  goals: GoalSearchItem[]
}

export function GoalSearchBar({ goals }: Props) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = query.trim().length >= 1
    ? goals
        .filter(g =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
          g.tags.some(t => t.toLowerCase().includes(query.toLowerCase())),
        )
        .slice(0, 6)
    : []

  const showDropdown = isOpen && filtered.length > 0

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
    setActiveIndex(-1)
  }, [])

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [closeDropdown])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && filtered[activeIndex]) {
          router.push(`/goals/${filtered[activeIndex].slug}`)
          closeDropdown()
          setQuery('')
        }
        break
      case 'Escape':
        closeDropdown()
        inputRef.current?.blur()
        break
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search input */}
      <div className="relative">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search: UPSC photo, Aadhaar, 50KB compress…"
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setIsOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => query.trim().length >= 1 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-12 rounded-xl pl-10 pr-4 text-base shadow-sm"
          aria-label="Search for a tool"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
          role="combobox"
          aria-controls="search-results"
          autoComplete="off"
        />
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <div
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-popover shadow-xl"
        >
          {filtered.map((goal, index) => (
            <Link
              key={goal.slug}
              id={`result-${index}`}
              href={`/goals/${goal.slug}`}
              role="option"
              aria-selected={index === activeIndex}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                'hover:bg-muted',
                index === activeIndex && 'bg-muted',
                index !== filtered.length - 1 && 'border-b border-border/60',
              )}
              onClick={() => { closeDropdown(); setQuery('') }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="flex-1 font-medium text-foreground">{goal.title}</span>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                  CATEGORY_COLORS[goal.category],
                )}
              >
                {CATEGORY_LABELS[goal.category]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

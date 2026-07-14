import Link from 'next/link'
import { Image as ImageIcon, Video, FileText, Sparkles } from 'lucide-react'
import type { ElementType } from 'react'
import { getPlatformCategoryCards } from '@/lib/recommendations/platform-categories'
import type { PlatformCategory } from '@/registry/tools/schema'

const CATEGORY_ICON: Record<PlatformCategory, ElementType> = {
  image: ImageIcon,
  video: Video,
  document: FileText,
  ai: Sparkles,
}

const CATEGORY_STYLE: Record<PlatformCategory, { iconBg: string; iconText: string }> = {
  image: { iconBg: 'bg-violet-100', iconText: 'text-violet-700' },
  video: { iconBg: 'bg-rose-100', iconText: 'text-rose-700' },
  document: { iconBg: 'bg-blue-100', iconText: 'text-blue-700' },
  ai: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-700' },
}

/**
 * Replaces the old document-only CategoriesSection with the platform-level
 * taxonomy (Image / Video / Document / AI). Registry-driven: adding a tool
 * with a new platformCategory value, or bumping a tool's status from
 * 'coming-soon' to 'active', updates these cards automatically — see
 * lib/recommendations/platform-categories.ts.
 */
export function PlatformCategoriesSection() {
  const cards = getPlatformCategoryCards()

  return (
    <section id="categories" aria-labelledby="categories-heading" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Browse by type</p>
          <h2 id="categories-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Every tool, organised by what it works on
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly prepares images, video and documents — pick a category to see everything it can do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = CATEGORY_ICON[card.category]
            const style = CATEGORY_STYLE[card.category]

            return (
              <div
                key={card.category}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.iconBg}`} aria-hidden="true">
                  <Icon className={`size-5 ${style.iconText}`} />
                </div>

                <span className="mt-4 block text-base font-semibold tracking-tight text-foreground">
                  {card.label}
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-muted-foreground">
                  {card.description}
                </span>

                <ul className="mt-4 flex-1 space-y-1.5" role="list">
                  {card.items.map((item) => (
                    <li key={item.label} className="flex items-center justify-between gap-2 text-sm">
                      {item.href ? (
                        <Link href={item.href} className="text-foreground/80 transition-colors hover:text-primary">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground/70">{item.label}</span>
                      )}
                      {item.comingSoon && (
                        <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                          Soon
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

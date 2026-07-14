import Link from 'next/link'
import { ArrowRight, Sparkle } from 'lucide-react'
import { getRecentlyAddedTools } from '@/registry/tools'

/**
 * Newest tools first, entirely from registry data (ToolDefinition.addedDate).
 * Shipping a new tool never requires touching this component — it appears
 * automatically the moment its registry entry is added with status: 'active'.
 */
export function RecentlyAddedSection() {
  const tools = getRecentlyAddedTools(4).filter((t) => t.route !== undefined)
  if (tools.length === 0) return null

  return (
    <section aria-labelledby="recently-added-heading" className="border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100" aria-hidden="true">
            <Sparkle className="h-4 w-4 text-amber-600" />
          </span>
          <h2 id="recently-added-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Recently added
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {tools.map((tool) => (
            <li key={tool.key}>
              <Link
                href={tool.route!}
                className="group flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {tool.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Added {new Date(tool.addedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

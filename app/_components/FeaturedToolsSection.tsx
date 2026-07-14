import Link from 'next/link'
import { ArrowRight, Image as ImageIcon, Video, FileText, Sparkles, ShieldCheck } from 'lucide-react'
import type { ElementType } from 'react'
import { getActiveTools } from '@/registry/tools'
import type { PlatformCategory } from '@/registry/tools/schema'

const CATEGORY_ICON: Record<PlatformCategory, ElementType> = {
  image: ImageIcon,
  video: Video,
  document: FileText,
  ai: Sparkles,
}

const CATEGORY_LABEL: Record<PlatformCategory, string> = {
  image: 'Image',
  video: 'Video',
  document: 'Document',
  ai: 'AI',
}

const CATEGORY_BADGE: Record<PlatformCategory, string> = {
  image: 'bg-violet-50 text-violet-700',
  video: 'bg-rose-50 text-rose-700',
  document: 'bg-blue-50 text-blue-700',
  ai: 'bg-emerald-50 text-emerald-700',
}

/**
 * Platform capabilities — every tool with a working implementation, shown as
 * a single registry-driven grid. Distinct from Popular Goals: this section
 * sells "what Presetly can do", not "what people search for". Adding a new
 * tool with status: 'active' surfaces it here automatically.
 */
export function FeaturedToolsSection() {
  const tools = getActiveTools().filter((t) => t.route !== undefined)
  if (tools.length === 0) return null

  return (
    <section aria-labelledby="featured-tools-heading" className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Complete toolkit</p>
          <h2 id="featured-tools-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Featured tools
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every tool runs entirely in your browser — no uploads, no accounts, no watermarks.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {tools.map((tool) => {
            const Icon = CATEGORY_ICON[tool.platformCategory]
            return (
              <li key={tool.key}>
                <Link
                  href={tool.route!}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${CATEGORY_BADGE[tool.platformCategory]}`}>
                      {CATEGORY_LABEL[tool.platformCategory]}
                    </span>
                  </div>

                  <span className="mt-4 block text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {tool.name}
                  </span>
                  <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {tool.description}
                  </span>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      <ShieldCheck size={11} aria-hidden="true" />
                      Browser-only
                    </span>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

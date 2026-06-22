import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPopularToolGoals, buildGoalHref } from '@/lib/recommendations/engine'

const CATEGORY_BADGE: Record<string, { label: string; className: string }> = {
  exam: { label: 'Exam', className: 'text-blue-600 bg-blue-50' },
  'id-documents': { label: 'ID Document', className: 'text-violet-600 bg-violet-50' },
  signature: { label: 'Signature', className: 'text-teal-600 bg-teal-50' },
  compress: { label: 'Compression', className: 'text-indigo-600 bg-indigo-50' },
}

export function PopularToolsSection() {
  const tools = getPopularToolGoals(6)
  if (tools.length === 0) return null

  return (
    <section
      id="popular-tools"
      aria-labelledby="popular-tools-heading"
      className="bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Government &amp; official documents
          </p>
          <h2
            id="popular-tools-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Popular tools
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pre-configured for Indian government portals. No manual settings — just upload and download.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {tools.map(goal => {
            const badge = CATEGORY_BADGE[goal.category] ?? {
              label: goal.category,
              className: 'text-gray-600 bg-gray-50',
            }

            return (
              <li key={goal.slug}>
                <Link
                  href={buildGoalHref(goal)}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md hover:ring-primary/20"
                >
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <span className="mt-3 block text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {goal.title}
                  </span>
                  <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {goal.description}
                  </span>
                  <span className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    Use free tool
                    <ArrowRight
                      size={11}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

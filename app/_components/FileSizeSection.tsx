import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGoal } from '@/registry/goals'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalDefinition } from '@/types/registry'

const FILE_SIZE_CONFIGS = [
  {
    slug: 'compress-image-to-20kb',
    label: '20 KB',
    usedFor: 'Signature files, strict government portals, NDA, UPSC',
    accent: 'text-emerald-600',
    bgAccent: 'bg-emerald-50',
  },
  {
    slug: 'compress-image-to-50kb',
    label: '50 KB',
    usedFor: 'Aadhaar (UIDAI), PAN card (NSDL), Voter ID, NVSP',
    accent: 'text-primary',
    bgAccent: 'bg-primary/5',
  },
  {
    slug: 'compress-image-to-100kb',
    label: '100 KB',
    usedFor: 'Passport applications, scholarship portals, college admissions',
    accent: 'text-amber-600',
    bgAccent: 'bg-amber-50',
  },
] as const

export function FileSizeSection() {
  return (
    <section
      aria-labelledby="file-size-heading"
      className="bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            File size targets
          </p>
          <h2
            id="file-size-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Compress to exact size
          </h2>
          <p className="mt-3 text-muted-foreground">
            Most government portals require images under a specific file size. Pick
            your target — no quality settings needed.
          </p>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3" role="list">
          {FILE_SIZE_CONFIGS.map(config => {
            const goal: GoalDefinition | undefined = getGoal(config.slug)
            return (
              <li key={config.slug}>
                <Link
                  href={goal ? buildGoalHref(goal) : `/goals/${config.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {/* Size number */}
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold ${config.bgAccent} ${config.accent}`}
                    aria-hidden="true"
                  >
                    {config.label.replace(' KB', '')}
                    <span className="ml-0.5 text-base font-semibold">KB</span>
                  </div>

                  {/* Title */}
                  <span className="block text-base font-semibold tracking-tight text-foreground">
                    {goal?.shortTitle ?? `Compress to ${config.label}`}
                  </span>

                  {/* Used for */}
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-muted-foreground">
                    {config.usedFor}
                  </span>

                  {/* CTA */}
                  <span className="mt-5 flex items-center gap-1 text-xs font-medium text-primary">
                    Compress now
                    <ArrowRight
                      size={13}
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

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGoal } from '@/registry/goals'
import { getPreset } from '@/registry/presets'
import { isImagePreset, isCompressPreset } from '@/types/registry'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalDefinition } from '@/types/registry'

const FEATURED_SLUGS = [
  'pan-card-photo-resizer',
  'nda-photo-resizer',
  'voter-id-photo-resizer',
  'signature-resize-20kb',
] as const

const CATEGORY_LABELS: Record<string, string> = {
  exam: 'Exam Photo',
  'id-documents': 'ID Document',
  compress: 'Compress',
  signature: 'Signature',
}

const CATEGORY_COLORS: Record<string, string> = {
  exam: 'bg-violet-50 text-violet-700',
  'id-documents': 'bg-blue-50 text-blue-700',
  compress: 'bg-amber-50 text-amber-700',
  signature: 'bg-emerald-50 text-emerald-700',
}

function getSpecLine(goal: GoalDefinition): string {
  try {
    const preset = getPreset(goal.preset)
    if (isImagePreset(preset)) {
      const parts = [preset.displayDimensions, preset.displayFormat]
      if (preset.displayMaxSize) parts.push(`Max ${preset.displayMaxSize}`)
      return parts.join(' · ')
    }
    if (isCompressPreset(preset)) {
      return `Target ${preset.displayMaxSize} · Quality-optimised`
    }
  } catch {
    // no-op
  }
  return ''
}

export function FeaturedToolsSection() {
  const goals = FEATURED_SLUGS
    .map(slug => getGoal(slug))
    .filter((g): g is GoalDefinition => g !== undefined)

  return (
    <section
      aria-labelledby="featured-tools-heading"
      className="bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Complete toolkit
          </p>
          <h2
            id="featured-tools-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            More tools
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every tool automatically applies the correct specifications — no
            manual settings required.
          </p>
        </div>

        {/* Tool list — two column grid */}
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          role="list"
        >
          {goals.map(goal => {
            const spec = getSpecLine(goal)
            const categoryLabel = CATEGORY_LABELS[goal.category] ?? goal.category
            const categoryColor = CATEGORY_COLORS[goal.category] ?? 'bg-gray-50 text-gray-700'

            return (
              <li key={goal.slug}>
                <Link
                  href={buildGoalHref(goal)}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {/* Left: metadata */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor}`}
                    >
                      {categoryLabel}
                    </span>
                    <span className="mt-2 block text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {goal.title}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground line-clamp-2">
                      {goal.description}
                    </span>
                    {spec && (
                      <span className="mt-2 block font-mono text-xs text-muted-foreground/70">
                        {spec}
                      </span>
                    )}
                  </div>

                  {/* Right: arrow */}
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SIZE_TARGETS } from '@/registry/size-presets'

const POPULAR_SIZE_PARAMS = ['15kb', '20kb', '25kb', '50kb', '100kb', '200kb'] as const

const ACCENT_STYLES: Record<string, { text: string; bg: string }> = {
  '15kb':  { text: 'text-rose-600',    bg: 'bg-rose-50' },
  '20kb':  { text: 'text-orange-600',  bg: 'bg-orange-50' },
  '25kb':  { text: 'text-amber-600',   bg: 'bg-amber-50' },
  '50kb':  { text: 'text-primary',     bg: 'bg-primary/5' },
  '100kb': { text: 'text-emerald-600', bg: 'bg-emerald-50' },
  '200kb': { text: 'text-sky-600',     bg: 'bg-sky-50' },
}

export function PopularGoalsSection() {
  const sizes = POPULAR_SIZE_PARAMS
    .map(param => SIZE_TARGETS.find(t => t.sizeParam === param))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <section
      id="tools"
      aria-labelledby="popular-sizes-heading"
      className="bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Most searched
          </p>
          <h2
            id="popular-sizes-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Popular size targets
          </h2>
          <p className="mt-3 text-muted-foreground">
            The most common file size limits — from strict government portals to general web use.
          </p>
        </div>

        {/* Size cards */}
        <ul
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          role="list"
        >
          {sizes.map(target => {
            const accent = ACCENT_STYLES[target.sizeParam] ?? { text: 'text-primary', bg: 'bg-primary/5' }
            return (
              <li key={target.id}>
                <Link
                  href={`/compress-image-under-${target.sizeParam}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md hover:ring-primary/20"
                  aria-label={`${target.title} — ${target.useCase}`}
                >
                  {/* Size display */}
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${accent.bg} ${accent.text}`}
                    aria-hidden="true"
                  >
                    {target.targetKB >= 1024
                      ? `${target.targetKB / 1024}M`
                      : `${target.targetKB}K`}
                  </div>

                  {/* Title */}
                  <span className="block text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {target.shortTitle}
                  </span>

                  {/* Use case */}
                  <span className="mt-1 block flex-1 text-xs leading-snug text-muted-foreground line-clamp-2">
                    {target.useCase}
                  </span>

                  {/* CTA */}
                  <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                    Compress
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

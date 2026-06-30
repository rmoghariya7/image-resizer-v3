import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SizeTarget } from '@/registry/size-presets'

interface Props {
  sizes: readonly SizeTarget[]
}

export function RelatedSizesSection({ sizes }: Props) {
  if (sizes.length === 0) return null

  return (
    <section
      aria-labelledby="related-sizes-heading"
      className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Related tools
          </p>
          <h2
            id="related-sizes-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground"
          >
            Other size targets
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Need a different size? Pick from the most common targets below.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sizes.map(target => (
            <li key={target.id}>
              <Link
                href={`/compress-image-under-${target.sizeParam}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-2xl font-bold text-primary">
                  {target.displaySize}
                </span>
                <span className="mt-2 block flex-1 text-sm leading-relaxed text-muted-foreground">
                  {target.useCase}
                </span>
                <span className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                  Compress now
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

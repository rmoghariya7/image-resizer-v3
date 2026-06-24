import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllGoals } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalCategory } from '@/types/registry'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

export const metadata: Metadata = {
  title: 'All photo and image tools | Presetly',
  description:
    'Browse all free tools on Presetly. UPSC, Aadhaar, PAN card, Passport, Railway, IBPS, signature resize, and file size compressors. Browser-based, no uploads.',
  alternates: { canonical: `${BASE_URL}/goals` },
  openGraph: {
    title: 'All image tools on Presetly — exam, ID, signature, compress',
    description:
      'Every portal photo tool in one place. Exam photos, Aadhaar, PAN, Passport, Voter ID, signature resize, and compression. Free, browser-only.',
    url: `${BASE_URL}/goals`,
    type: 'website',
    siteName: 'Presetly',
  },
  twitter: {
    card: 'summary',
    title: 'All tools | Presetly',
    description: 'Exam photos, Aadhaar, PAN, Passport, signature, compression. All free, browser-only.',
  },
}

const CATEGORY_LABELS: Record<GoalCategory, string> = {
  exam: 'Exam Photos',
  'id-documents': 'ID Documents',
  compress: 'Compress Image',
  signature: 'Signature Tools',
}

const CATEGORY_BADGE: Record<GoalCategory, string> = {
  exam: 'bg-violet-50 text-violet-700',
  'id-documents': 'bg-blue-50 text-blue-700',
  compress: 'bg-amber-50 text-amber-700',
  signature: 'bg-emerald-50 text-emerald-700',
}

const CATEGORY_ORDER: GoalCategory[] = ['exam', 'id-documents', 'signature', 'compress']

export default function GoalsListingPage() {
  const allGoals = getAllGoals()
  const categories = getAllCategories()

  const goalsByCategory = CATEGORY_ORDER
    .map(catSlug => {
      const catDef = categories.find(c => c.slug === catSlug)
      const catGoals = allGoals.filter(g => g.category === catSlug)
      return catDef && catGoals.length > 0 ? { catDef, catGoals } : null
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)

  return (
    <article>
      {/* Header */}
      <header className="border-b border-border/50 bg-linear-to-b from-background to-muted/30 px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
          >
            <span aria-hidden="true">←</span>
            Home
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            All tools
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {allGoals.length} free browser-based tools for Indian government portal photo requirements.
            No uploads. No sign-up.
          </p>
        </div>
      </header>

      {/* Goals by category */}
      <div className="mx-auto max-w-5xl divide-y divide-border px-4 sm:px-6">
        {goalsByCategory.map(({ catDef, catGoals }) => (
          <section
            key={catDef.slug}
            aria-labelledby={`cat-${catDef.slug}`}
            className="py-12 sm:py-16"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {catGoals.length} tool{catGoals.length !== 1 ? 's' : ''}
                </p>
                <h2
                  id={`cat-${catDef.slug}`}
                  className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                >
                  {CATEGORY_LABELS[catDef.slug as GoalCategory] ?? catDef.name}
                </h2>
              </div>
              <Link
                href={`/categories/${catDef.slug}`}
                className="hidden items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
              >
                View category
                <ArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {catGoals.map(goal => (
                <li key={goal.slug}>
                  <Link
                    href={buildGoalHref(goal)}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <span
                      className={`inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${CATEGORY_BADGE[goal.category]}`}
                    >
                      {CATEGORY_LABELS[goal.category]}
                    </span>
                    <span className="mt-2.5 block text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {goal.title}
                    </span>
                    <span className="mt-1 block flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {goal.description}
                    </span>
                    <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                      Use tool
                      <ArrowRight
                        size={10}
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/categories/${catDef.slug}`}
              className="mt-4 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80 sm:hidden"
            >
              View {CATEGORY_LABELS[catDef.slug as GoalCategory] ?? catDef.name} category
              <ArrowRight size={11} aria-hidden="true" />
            </Link>
          </section>
        ))}
      </div>
    </article>
  )
}

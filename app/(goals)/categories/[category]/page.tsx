import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, GraduationCap, CreditCard, Minimize2, PenLine } from 'lucide-react'
import {
  getCategory,
  getCategoryStaticParams,
} from '@/registry/categories'
import { getGoalsByCategory } from '@/registry/goals'
import { buildGoalHref } from '@/lib/recommendations/engine'
import type { GoalCategory } from '@/types/registry'
import type { ElementType } from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

const CATEGORY_META: Record<
  GoalCategory,
  { Icon: ElementType; color: string; iconBg: string; badgeColor: string }
> = {
  exam: {
    Icon: GraduationCap,
    color: 'text-violet-700',
    iconBg: 'bg-violet-100',
    badgeColor: 'bg-violet-50 text-violet-700',
  },
  'id-documents': {
    Icon: CreditCard,
    color: 'text-blue-700',
    iconBg: 'bg-blue-100',
    badgeColor: 'bg-blue-50 text-blue-700',
  },
  compress: {
    Icon: Minimize2,
    color: 'text-amber-700',
    iconBg: 'bg-amber-100',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  signature: {
    Icon: PenLine,
    color: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
}

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return getCategoryStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = getCategory(category as GoalCategory)
  if (!cat) return {}

  const canonical = `${BASE_URL}/categories/${cat.slug}`

  return {
    title: `${cat.name} — Free Online Tools | Presetly`,
    description: cat.metaDescription,
    keywords: [...cat.keywords],
    alternates: { canonical },
    openGraph: {
      title: cat.name,
      description: cat.metaDescription,
      url: canonical,
      type: 'website',
      siteName: 'Presetly',
    },
    twitter: {
      card: 'summary',
      title: cat.name,
      description: cat.metaDescription,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = getCategory(category as GoalCategory)

  if (!cat) notFound()

  const goals = getGoalsByCategory(category as GoalCategory)
  const meta = CATEGORY_META[category as GoalCategory]
  const Icon = meta?.Icon ?? GraduationCap

  const canonicalUrl = `${BASE_URL}/categories/${cat.slug}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cat.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: cat.name, item: canonicalUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article>
        {/* Header */}
        <header className="border-b border-border/50 bg-linear-to-b from-background to-muted/30 px-4 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
            >
              <span aria-hidden="true">←</span>
              All tools
            </Link>

            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta?.iconBg ?? 'bg-muted'}`}
                aria-hidden="true"
              >
                <Icon className={`size-6 ${meta?.color ?? 'text-foreground'}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {cat.name}
                </h1>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {cat.description}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Tools grid */}
        <section
          aria-labelledby="tools-heading"
          className="px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Available tools
              </p>
              <h2
                id="tools-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-foreground"
              >
                {goals.length} tool{goals.length !== 1 ? 's' : ''} in this category
              </h2>
            </div>

            {goals.length > 0 ? (
              <ul
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {goals.map(goal => (
                  <li key={goal.slug}>
                    <Link
                      href={buildGoalHref(goal)}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md hover:ring-primary/20"
                    >
                      <span
                        className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${meta?.badgeColor ?? 'bg-muted text-muted-foreground'}`}
                      >
                        {cat.name}
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
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No tools in this category yet.</p>
            )}
          </div>
        </section>

        {/* FAQ */}
        {cat.faqs.length > 0 && (
          <section
            id="faq"
            aria-labelledby="faq-heading"
            className="bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
          >
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  FAQ
                </p>
                <h2
                  id="faq-heading"
                  className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                >
                  Frequently asked questions
                </h2>
              </div>

              <dl className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
                {cat.faqs.map(faq => (
                  <details key={faq.question} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                      <dt>{faq.question}</dt>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </dd>
                  </details>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* Internal links — back to homepage sections */}
        <section
          aria-label="Explore more"
          className="border-t border-border bg-muted/10 px-4 py-10 sm:px-6"
        >
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore Presetly
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#tools"
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Popular size targets
              </Link>
              <Link
                href="/#categories"
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                All categories
              </Link>
              <Link
                href="/#faq"
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Common questions
              </Link>
              <Link
                href="/goals"
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                All tools
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateCompressMetadata } from '@/lib/metadata/generators'
import {
  getSizeTarget,
  getAllSizeParams,
  generateFaqs,
  generateHowItWorks,
  getRelatedSizes,
} from '@/registry/size-presets'
import { getCommonErrors } from '@/content/errors'
import { getCompressPageGoalLinks, buildGoalHref } from '@/lib/recommendations/engine'
import { SizeToolSection } from './_components/SizeToolSection'

const CATEGORY_NAMES: Record<string, string> = {
  exam: 'Exam',
  'id-documents': 'ID Document',
  signature: 'Signature',
  compress: 'Compression',
}
import { RelatedSizesSection } from './_components/RelatedSizesSection'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

interface Props {
  params: Promise<{ size: string }>
}

export function generateStaticParams() {
  return getAllSizeParams().map(size => ({ size }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { size } = await params
  const target = getSizeTarget(size)
  if (!target) return {}

  const canonical = `${BASE_URL}/compress-image-under-${target.sizeParam}`
  return generateCompressMetadata(target, canonical)
}

export default async function CompressImageUnderSizePage({ params }: Props) {
  const { size } = await params
  const target = getSizeTarget(size)
  if (!target) notFound()

  const faqs = generateFaqs(target)
  const steps = generateHowItWorks(target)
  const relatedSizes = getRelatedSizes(target)
  const commonErrors = getCommonErrors('compress')
  const popularGoals = getCompressPageGoalLinks(4)
  const canonicalUrl = `${BASE_URL}/compress-image-under-${target.sizeParam}`

  // ─── Structured data ─────────────────────────────────────────────────────────

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: target.title,
    description: target.description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.body,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: target.title,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: canonicalUrl,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <article>
        {/* ── Page header ─────────────────────────────────────────────────────── */}
        <header className="border-b border-border/50 bg-linear-to-b from-background to-muted/30 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Free · No upload · Browser-based
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {target.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
              {target.description}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Used for: <span className="font-medium text-foreground">{target.useCase}</span>
            </p>
          </div>
        </header>

        {/* ── Tool ────────────────────────────────────────────────────────────── */}
        <SizeToolSection defaultPresetKey={target.id} />

        {/* ── Quick steps ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="steps-heading"
          className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Quick start
              </p>
              <h2
                id="steps-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-foreground"
              >
                Done in {steps.length} steps
              </h2>
            </div>

            <ol
              className="grid grid-cols-1 gap-6 sm:grid-cols-3"
              role="list"
              aria-label="Step-by-step workflow"
            >
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Output spec ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="spec-heading"
          className="bg-background px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Output specification
              </p>
              <h2
                id="spec-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-foreground"
              >
                What you get
              </h2>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: 'Target size', value: `Under ${target.displaySize}` },
                { label: 'Format', value: target.targetKB <= 40 ? 'JPEG (best for small sizes)' : 'Original format preserved' },
                { label: 'Quality', value: 'Auto-optimised' },
                { label: 'Processing', value: 'Browser-only' },
                { label: 'Upload', value: 'None — private' },
                { label: 'Cost', value: 'Free forever' },
              ].map(spec => (
                <div key={spec.label} className="rounded-xl border border-border/60 bg-muted/40 px-4 py-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold tracking-tight text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Common errors ────────────────────────────────────────────────────── */}
        {commonErrors.length > 0 && (
          <section
            aria-labelledby="errors-heading"
            className="bg-background px-4 py-12 sm:px-6 sm:py-16"
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Troubleshooting
                </p>
                <h2
                  id="errors-heading"
                  className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                >
                  Common issues &amp; fixes
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                {commonErrors.map(error => (
                  <li
                    key={error.id}
                    className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
                  >
                    <div className="flex items-start gap-3 border-b border-border/60 bg-amber-50/60 px-5 py-3.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <h3 className="text-sm font-semibold text-foreground">{error.title}</h3>
                    </div>
                    <div className="space-y-3 px-5 py-4">
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          What you see
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{error.symptom}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          How to fix it
                        </p>
                        <p className="text-sm leading-relaxed text-foreground">{error.fix}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── FAQ (server-rendered, crawlable) ────────────────────────────────── */}
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
              {faqs.map(faq => (
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

        {/* ── Related sizes ────────────────────────────────────────────────────── */}
        <RelatedSizesSection sizes={relatedSizes} />

        {/* ── Popular tools — exam/ID goals for discovery ──────────────────────── */}
        {popularGoals.length > 0 && (
          <section
            aria-labelledby="popular-tools-heading"
            className="border-t border-border bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Also popular
                </p>
                <h2
                  id="popular-tools-heading"
                  className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                >
                  Photo resizing tools
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Need to resize for a specific portal? These tools apply the exact specifications automatically.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
                {popularGoals.map(goal => (
                  <li key={goal.slug}>
                    <a
                      href={buildGoalHref(goal)}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {CATEGORY_NAMES[goal.category] ?? goal.category}
                      </span>
                      <span className="mt-1.5 block text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        {goal.shortTitle}
                      </span>
                      <span className="mt-1 block flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {goal.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getGuide, getGuideSlugs } from '@/content/guides'
import { getGoal } from '@/registry/goals'
import { buildGoalHref } from '@/lib/recommendations/engine'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getGuideSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}

  const canonical = `${BASE_URL}/guides/${guide.slug}`
  const description = guide.introduction.slice(0, 155).replace(/\.$/, '') + '.'

  return {
    title: `${guide.title} | Presetly`,
    description,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description,
      url: canonical,
      type: 'article',
      siteName: 'Presetly',
    },
    twitter: {
      card: 'summary',
      title: guide.title,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  const canonical = `${BASE_URL}/guides/${guide.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.introduction,
    url: canonical,
    dateModified: guide.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Presetly',
      url: BASE_URL,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: canonical },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Guide
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            {guide.introduction}
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Updated {new Date(guide.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="space-y-8">
          {guide.sections.map((section, i) => (
            <section key={i} aria-labelledby={`section-${i}`}>
              <h2
                id={`section-${i}`}
                className="text-xl font-semibold tracking-tight text-gray-900"
              >
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">{section.body}</p>
            </section>
          ))}
        </div>

        {guide.relatedGoals && guide.relatedGoals.length > 0 && (
          <aside className="mt-12 rounded-xl border border-indigo-100 bg-indigo-50/50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Free tools for this topic
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" role="list">
              {guide.relatedGoals.map(goalSlug => {
                const goal = getGoal(goalSlug)
                if (!goal) return null
                return (
                  <li key={goalSlug}>
                    <Link
                      href={buildGoalHref(goal)}
                      className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50"
                    >
                      {goal.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>
        )}
      </article>
    </>
  )
}

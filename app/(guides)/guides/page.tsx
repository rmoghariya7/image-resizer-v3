import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock } from 'lucide-react'
import { getAllGuides } from '@/content/guides'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'
const canonical = `${BASE_URL}/guides`

export const metadata: Metadata = {
  title: 'Guides | Government portal photo & signature requirements | Presetly',
  description:
    'Step-by-step guides to Indian government photo and signature requirements — passport photos, exam ID sizes, and compressing images to an exact file size.',
  alternates: { canonical },
  openGraph: {
    title: 'Guides — government portal photo requirements | Presetly',
    description:
      'In-depth guides covering passport photo rules, signature and photo file size limits, and how to hit an exact KB target without losing quality.',
    url: canonical,
    type: 'website',
    siteName: 'Presetly',
    images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, type: 'image/png' as const }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides | Presetly',
    description: 'Passport photo rules, signature and photo size limits, and exact-KB compression guides.',
    images: [`${BASE_URL}/opengraph-image`],
  },
  robots: { index: true, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: canonical },
  ],
}

export default function GuidesIndexPage() {
  const guides = getAllGuides()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b border-gray-200 bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
              <BookOpen className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Guides
            </p>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Photo & signature requirement guides
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            Detailed, source-checked guides to Indian government portal photo rules and how to
            meet exact file size limits — with links to the free tool for each one.
          </p>
          <p className="mt-2 text-sm text-gray-500">{guides.length} guides</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <h2 className="text-base font-semibold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600">
                  {guide.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {guide.introduction}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Updated {new Date(guide.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs font-medium text-indigo-500 transition-transform group-hover:translate-x-0.5"
                  >
                    Read →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/metadata/generators'
import {
  getStandaloneToolPageGoals,
  getStandaloneTools,
} from '@/lib/recommendations/engine'
import { getTool } from '@/registry/tools'
import { FaqSection } from '../[slug]/_components/FaqSection'
import { QuickStepsSection } from '../[slug]/_components/QuickStepsSection'
import { ExploreMoreToolsSection } from '../[slug]/_components/ExploreMoreToolsSection'
import { BackgroundRemoverSection } from './_components/BackgroundRemoverSection'
import {
  DESCRIPTION,
  FAQS,
  HOW_IT_WORKS,
  PAGE_TITLE,
  SEO_TITLE,
} from './content'

const CANONICAL = `${BASE_URL}/background-remover`
const SITE_NAME = 'Presetly'

const OG_IMAGE = {
  url: `${CANONICAL}/opengraph-image`,
  width: 1200,
  height: 630,
  type: 'image/png' as const,
}

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: SEO_TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION.slice(0, 150),
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  other: {
    'search:primaryQuery': 'free ai background remover online',
  },
}

// ─── Structured data ──────────────────────────────────────────────────────────

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: PAGE_TITLE, item: CANONICAL },
  ],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: PAGE_TITLE,
  description: DESCRIPTION,
  applicationCategory: 'PhotoEditingApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern web browser with WebAssembly support',
  url: CANONICAL,
  featureList: [
    'Removes image backgrounds automatically using an in-browser AI model',
    'Exports a transparent PNG, or a white/custom-color JPG',
    'Runs entirely in the browser — photos are never uploaded',
    'Free with no sign-up or watermarks',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: `How to remove a background from a photo with ${SITE_NAME}`,
  step: HOW_IT_WORKS.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.body,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BackgroundRemoverPage() {
  const tool = getTool('background-remover')
  const exploreGoals = getStandaloneToolPageGoals(12)
  const otherTools = getStandaloneTools().filter((t) => t.key !== tool.key)

  return (
    <>
      {[breadcrumbSchema, softwareSchema, howToSchema, faqSchema].map(
        (schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ),
      )}

      <article>
        {/* 1. Page header — deliberately compact so upload, AI processing and
               the before/after preview all share the first mobile viewport. */}
        <div className="border-b border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-1.5 sm:mb-4">
              <ol
                className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
                role="list"
              >
                <li>
                  <Link href="/" className="transition-colors hover:text-indigo-600">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">/</li>
                <li className="font-medium text-gray-900" aria-current="page">
                  Background Remover
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Free AI Background Remover — Remove Image Background Online
            </h1>
            {/* Description hidden on mobile — the upload area and result must
                fit the first viewport (320px rule). */}
            <p className="mt-2 hidden text-base leading-relaxed text-gray-600 sm:mt-4 sm:block sm:text-lg">
              Upload a photo and Presetly&apos;s AI background remover erases the background
              automatically — free, with no uploads to any server. Download a transparent PNG,
              or swap in a white or custom-color background in one click.
            </p>

            <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
              {['free background remover', 'transparent background maker', 'no upload', 'no watermark'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* 2. The tool — primary CTA, above the fold */}
        <BackgroundRemoverSection />

        {/* 3. How it works */}
        <QuickStepsSection steps={HOW_IT_WORKS} />

        {/* 4. What makes a good AI background remover — keyword-rich body content */}
        <section
          aria-labelledby="about-heading"
          className="bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="about-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              A free background eraser powered by on-device AI
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                Most tools that promise to remove background online quietly upload your photo to a
                server first. Presetly&apos;s background remover works differently: the page downloads
                a small AI segmentation model once, then every photo you process is analyzed and cut
                out entirely inside your own browser. That makes it both a genuinely free AI background
                remover and a private one — nothing about your photo, or the people in it, ever leaves
                your device.
              </p>
              <p>
                Use it as a transparent background maker for product photos and profile pictures, a
                background eraser for portraits before a passport or ID upload, or simply to remove
                image background clutter before dropping a photo into a design. Because everything runs
                locally, you can remove background from image files as many times as you like, with no
                account, no watermark, and no per-image cost.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Related tools — explicit, keyword-relevant anchor text */}
        <section
          aria-labelledby="related-tools-heading"
          className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="related-tools-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              Finish the job with Presetly&apos;s other free tools
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              After you remove the background, these tools can help prepare the final image:
            </p>
            <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2" role="list">
              <li>
                <Link
                  href="/resize-image"
                  className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
                >
                  Image resizer &amp; compressor
                </Link>
                <span className="text-gray-600"> — fit your cutout to an exact size or file-size limit.</span>
              </li>
              <li>
                <Link
                  href="/convert-image"
                  className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
                >
                  Image converter
                </Link>
                <span className="text-gray-600"> — switch between PNG, JPEG and WebP.</span>
              </li>
              <li>
                <Link
                  href="/crop-image"
                  className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
                >
                  Image cropper
                </Link>
                <span className="text-gray-600"> — trim the frame before or after removing the background.</span>
              </li>
              <li>
                <Link
                  href="/add-name-and-date-on-photo"
                  className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500"
                >
                  Date stamp generator
                </Link>
                <span className="text-gray-600"> — add a name and date overlay for exam or ID uploads.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 6. FAQ */}
        <FaqSection faqs={FAQS} />

        {/* 7. Related tools — broad discovery at page bottom */}
        <ExploreMoreToolsSection goals={exploreGoals} tools={otherTools} />
      </article>
    </>
  )
}

import { SiteHeader } from './_components/SiteHeader'
import { SiteFooter } from './_components/SiteFooter'
import { HeroSection } from './_components/HeroSection'
import { PopularGoalsSection } from './_components/PopularGoalsSection'
import { PopularToolsSection } from './_components/PopularToolsSection'
import { CategoriesSection } from './_components/CategoriesSection'
import { FeaturedToolsSection } from './_components/FeaturedToolsSection'
import { HomeFaqSection } from './_components/HomeFaqSection'
import { InternalLinksSection } from './_components/InternalLinksSection'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

// ─── Structured data ──────────────────────────────────────────────────────────

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Presetly',
  url: BASE_URL,
  description:
    'Free browser-based image compressor and resizer. Compress any image to the exact file size you need — 15 KB, 50 KB, 100 KB, and more. No upload, no sign-up.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/goals/{search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Presetly',
  url: BASE_URL,
  description:
    'Browser-based image compression and document preparation platform. Privacy-first: all processing runs locally in the browser.',
}

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Presetly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Presetly is a free browser-based image compression and resizing platform. Pick a target file size, upload your image, and download the compressed file in seconds — no sign-up, no server uploads, no watermarks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my image get uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens locally in your browser using Web Workers and the Canvas API. Your image never leaves your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the smallest file size I can compress to?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The smallest supported target is 15 KB. For very small targets, the tool converts PNG images to JPEG for maximum efficiency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which image formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JPEG, PNG, and WebP. Files up to 20 MB are supported.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this for government portal photo requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Presetly supports photo resizing for UPSC, GPSC, NDA, Aadhaar, PAN card, Passport, and Voter ID — automatically applying the correct dimensions, DPI, and format.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are all tools completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 100% free, no sign-up, no credit card, no watermarks, no daily limits.',
      },
    },
  ],
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      <SiteHeader />

      <main id="main-content">
        <HeroSection />
        <PopularGoalsSection />
        <PopularToolsSection />
        <CategoriesSection />
        <FeaturedToolsSection />
        <HomeFaqSection />
        <InternalLinksSection />
      </main>

      <SiteFooter />
    </>
  )
}

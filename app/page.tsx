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
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Presetly',
  url: BASE_URL,
  description:
    'Browser-based image compression and document preparation platform. Privacy-first: all processing runs locally in the browser.',
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Presetly: free photo resizer for Indian government portals',
  description:
    'Resize and compress photos for UPSC, GPSC, Aadhaar, PAN card, Passport, and 10+ Indian government portals. Browser-based, no uploads, no sign-up, completely free.',
  url: BASE_URL,
  isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Presetly' },
  about: {
    '@type': 'Thing',
    name: 'Image resizing and compression for Indian government portals',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    ],
  },
}

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  // NOTE: answers must match the visible HomeFaqSection content exactly.
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Presetly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Presetly is a free browser-based image compression and resizing platform. You pick a target file size — 15 KB, 50 KB, 100 KB, or any other limit — upload your image, and download the compressed file in seconds. No sign-up, no server uploads, no watermarks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my image get uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens locally in your browser using Web Workers and the Canvas API. Your image never leaves your device. Nothing is stored, logged, or transmitted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the smallest file size I can compress to?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The smallest supported target is 15 KB. For very small targets, the tool converts PNG images to JPEG — the most efficient format for photos at small sizes. Most images can reach 15 KB with acceptable visual quality.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which image formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JPEG, PNG, and WebP. Files up to 20 MB can be uploaded. The tool outputs JPEG for small size targets (under 40 KB) and preserves the original format for larger targets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this for government portal photo requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Presetly also supports photo resizing presets for UPSC, GPSC, NDA, Aadhaar, PAN card, Passport, and Voter ID — automatically setting the correct dimensions, DPI, and format for each portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are all tools completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, every tool is free with no restrictions — no sign-up, no credit card, no watermarks, no daily limits.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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

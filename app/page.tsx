import { SiteHeader } from './_components/SiteHeader'
import { SiteFooter } from './_components/SiteFooter'
import { HeroSection } from './_components/HeroSection'
import { QuickActionsSection } from './_components/QuickActionsSection'
import { PlatformCategoriesSection } from './_components/PlatformCategoriesSection'
import { PopularGoalsSection } from './_components/PopularGoalsSection'
import { FeaturedToolsSection } from './_components/FeaturedToolsSection'
import { RecentlyAddedSection } from './_components/RecentlyAddedSection'
import { WhyPresetlySection } from './_components/WhyPresetlySection'
import { HomeFaqSection, HOME_FAQS } from './_components/HomeFaqSection'
import { HomeLearnSection } from './_components/HomeLearnSection'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

// ─── Structured data ──────────────────────────────────────────────────────────

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Presetly',
  url: BASE_URL,
  description:
    'Free browser-based toolkit for preparing images, video and documents. Compress, resize, crop, convert, and extract audio — all processed locally, no upload, no sign-up.',
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
  name: 'Presetly: browser-based image, video and document toolkit',
  description:
    'Compress, resize, crop and convert images, extract audio from video, and generate exact-spec photos for UPSC, GPSC, Aadhaar, PAN card, Passport and more Indian government portals. Browser-based, no uploads, no sign-up, completely free.',
  url: BASE_URL,
  isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Presetly' },
  about: {
    '@type': 'Thing',
    name: 'Browser-based image, video and document preparation',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    ],
  },
}

// Sourced from the same HOME_FAQS constant HomeFaqSection renders — keeps the
// structured data and the visible FAQ copy from ever drifting apart.
const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
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
        <QuickActionsSection />
        <PlatformCategoriesSection />
        <PopularGoalsSection />
        <FeaturedToolsSection />
        <RecentlyAddedSection />
        <WhyPresetlySection />
        <HomeFaqSection />
        <HomeLearnSection />
      </main>

      <SiteFooter />
    </>
  )
}

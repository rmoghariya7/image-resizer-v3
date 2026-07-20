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
import { BASE_URL } from '@/lib/metadata/generators'

// ─── Structured data ──────────────────────────────────────────────────────────
// Organization + WebSite schema are rendered once, sitewide, in app/layout.tsx —
// this page only adds what's specific to the homepage (WebPage + FAQPage).

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Presetly: browser-based image, video and document toolkit',
  description:
    'Compress, resize, crop and convert images, extract audio from video, and prepare exact-spec exam, ID, and passport photos — all in your browser. No uploads, no sign-up, completely free.',
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

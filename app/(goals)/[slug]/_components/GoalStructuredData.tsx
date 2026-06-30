import type { GoalDefinition } from '@/types/registry'
import { stripGoalTokens } from '@/lib/linking/resolver'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

const CATEGORY_NAMES: Record<string, string> = {
  'exam': 'Exam Photos',
  'id-documents': 'ID Documents',
  'compress': 'Compress Image',
  'signature': 'Signature Tools',
}

interface Props {
  goal: GoalDefinition
  canonicalUrl: string
}

export function GoalStructuredData({ goal, canonicalUrl }: Props) {
  const categoryName = CATEGORY_NAMES[goal.category] ?? goal.category
  const categoryUrl = `${BASE_URL}/categories/${goal.category}`

  // ── BreadcrumbList: Home → Category → Goal ──────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: goal.title,
        item: canonicalUrl,
      },
    ],
  }

  // ── HowTo: step-by-step workflow ─────────────────────────────────────────────
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: goal.title,
    description: goal.description,
    url: canonicalUrl,
    step: goal.howItWorks.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.body,
    })),
  }

  // ── FAQPage ──────────────────────────────────────────────────────────────────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: goal.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripGoalTokens(faq.answer),
      },
    })),
  }

  // ── SoftwareApplication ──────────────────────────────────────────────────────
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: goal.title,
    description: goal.description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with Canvas API support',
    url: canonicalUrl,
    featureList: [
      'Browser-based processing — no server upload',
      'Free to use — no sign-up required',
      `Resizes and compresses images to ${goal.shortTitle} specifications`,
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'Presetly',
      url: BASE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  )
}

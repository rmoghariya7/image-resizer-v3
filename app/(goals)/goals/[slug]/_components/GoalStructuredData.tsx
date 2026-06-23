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
        item: `${BASE_URL}/goals`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: goal.title,
        item: canonicalUrl,
      },
    ],
  }

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
    </>
  )
}

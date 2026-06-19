import type { GoalDefinition } from '@/types/registry'
import { stripGoalTokens } from '@/lib/linking/resolver'

interface Props {
  goal: GoalDefinition
  canonicalUrl: string
}

export function GoalStructuredData({ goal, canonicalUrl }: Props) {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

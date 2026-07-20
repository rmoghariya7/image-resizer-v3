import type { LearnArticle } from '@/registry/learn/schema'
import { BASE_URL } from '@/lib/metadata/generators'

interface Props {
  article:  LearnArticle
  canonical: string
}

export function LearnStructuredData({ article, canonical }: Props) {
  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type':    'Article',
    headline:   article.title,
    description: article.description,
    url:         canonical,
    datePublished: article.publishedAt,
    dateModified:  article.updatedAt,
    author: {
      '@type': 'Organization',
      name:    'Presetly',
      url:     BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name:    'Presetly',
      url:     BASE_URL,
    },
  }

  // BreadcrumbList: Home → Learn → Article title
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: `${BASE_URL}/learn` },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonical },
    ],
  }

  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name:    faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

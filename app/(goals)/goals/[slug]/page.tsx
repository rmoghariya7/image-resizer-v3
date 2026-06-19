import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getGoal, getGoalStaticParams, getRelatedGoals } from '@/registry/goals'
import { getPreset } from '@/registry/presets'
import { getRequirements } from '@/content/requirements'
import { getCommonErrors } from '@/content/errors'
import { GoalHeader } from './_components/GoalHeader'
import { ToolSection } from './_components/ToolSection'
import { QuickStepsSection } from './_components/QuickStepsSection'
import { RequirementsSection } from './_components/RequirementsSection'
import { CommonErrorsSection } from './_components/CommonErrorsSection'
import { FaqSection } from './_components/FaqSection'
import { RelatedGoalsSection } from './_components/RelatedGoalsSection'
import { GoalStructuredData } from './_components/GoalStructuredData'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getGoalStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const goal = getGoal(slug)
  if (!goal) return {}

  const canonical = `${BASE_URL}/goals/${goal.slug}`

  return {
    title: `${goal.title} — Free Online Tool | Presetly`,
    description: goal.description,
    keywords: goal.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: goal.title,
      description: goal.description,
      url: canonical,
      type: 'website',
      siteName: 'Presetly',
    },
    twitter: {
      card: 'summary',
      title: goal.title,
      description: goal.description,
    },
    robots: {
      index: goal.status === 'active',
      follow: true,
    },
  }
}

export default async function GoalPage({ params }: Props) {
  const { slug } = await params
  const goal = getGoal(slug)

  if (!goal || goal.status === 'deprecated') {
    notFound()
  }

  const preset = getPreset(goal.preset)
  const relatedGoals = getRelatedGoals(goal.slug)
  const canonicalUrl = `${BASE_URL}/goals/${goal.slug}`

  // Content layer — O(1) lookups, safe to call during static generation
  const requirements = getRequirements(goal.preset)
  const commonErrors = getCommonErrors(goal.category)

  return (
    <>
      <GoalStructuredData goal={goal} canonicalUrl={canonicalUrl} />

      <article>
        {/* 1. Page header — title, description, category breadcrumb */}
        <GoalHeader goal={goal} />

        {/* 2. The tool itself — primary CTA, above the fold */}
        <ToolSection toolKey={goal.tool} preset={preset} />

        {/* 3. Quick Steps — visual workflow for immediate orientation */}
        <QuickStepsSection steps={goal.howItWorks} />

        {/* 4. Requirements — official specs enriched from content registry */}
        <RequirementsSection preset={preset} content={requirements} />

        {/* 5. Common Errors — troubleshooting for upload rejections */}
        <CommonErrorsSection errors={commonErrors} />

        {/* 6. FAQ — structured Q&A for SEO and user trust */}
        <FaqSection faqs={goal.faqs} />

        {/* 7. Related Goals — internal linking for discoverability */}
        <RelatedGoalsSection goals={relatedGoals} />
      </article>
    </>
  )
}

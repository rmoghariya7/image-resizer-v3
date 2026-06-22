import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getGoal, getGoalStaticParams, getRelatedGoals } from '@/registry/goals'
import { getPreset } from '@/registry/presets'
import { getRequirements } from '@/content/requirements'
import { getCommonErrors } from '@/content/errors'
import {
  getGoalPageRecommendations,
  getResultRecommendations,
} from '@/lib/recommendations/engine'
import { GoalHeader } from './_components/GoalHeader'
import { ToolSection } from './_components/ToolSection'
import { QuickStepsSection } from './_components/QuickStepsSection'
import { RequirementsSection } from './_components/RequirementsSection'
import { CommonErrorsSection } from './_components/CommonErrorsSection'
import { FaqSection } from './_components/FaqSection'
import { RelatedGoalsSection } from './_components/RelatedGoalsSection'
import { RelatedSizesSection } from './_components/RelatedSizesSection'
import { UsersAlsoVisitSection } from './_components/UsersAlsoVisitSection'
import { ExploreMoreToolsSection } from './_components/ExploreMoreToolsSection'
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

  // Recommendation engine — all data derived from registries, no hardcoding
  const pageRecs = getGoalPageRecommendations(goal.slug)
  const resultRecs = getResultRecommendations(goal.slug)

  // Heading for the compress-sizes strip differs for compress vs other goals
  const sizesHeading =
    goal.category === 'compress'
      ? 'Related compression sizes'
      : 'Popular compression sizes'

  return (
    <>
      <GoalStructuredData goal={goal} canonicalUrl={canonicalUrl} />

      <article>
        {/* 1. Page header — title, description, category breadcrumb */}
        <GoalHeader goal={goal} />

        {/* 2. The tool itself — primary CTA, above the fold */}
        {/* resultRecs are passed as props so the client bundle stays registry-free */}
        <ToolSection toolKey={goal.tool} preset={preset} recommendations={resultRecs} />

        {/* 3. Related compression sizes — quick navigation strip below tool */}
        <RelatedSizesSection goals={pageRecs.relatedSizes} heading={sizesHeading} />

        {/* 4. Quick Steps — visual workflow for immediate orientation */}
        <QuickStepsSection steps={goal.howItWorks} />

        {/* 5. Requirements — official specs enriched from content registry */}
        <RequirementsSection preset={preset} content={requirements} />

        {/* 6. Common Errors — troubleshooting for upload rejections */}
        <CommonErrorsSection errors={commonErrors} />

        {/* 7. FAQ — structured Q&A for SEO and user trust */}
        <FaqSection faqs={goal.faqs} />

        {/* 8. Users Also Visit — complementary cross-category goals after FAQ */}
        <UsersAlsoVisitSection goals={pageRecs.usersAlsoVisit} />

        {/* 9. Related Goals — same-category tools (existing registry data) */}
        <RelatedGoalsSection goals={relatedGoals} />

        {/* 10. Explore More Tools — broad discovery at page bottom */}
        <ExploreMoreToolsSection goals={pageRecs.exploreMore} />
      </article>
    </>
  )
}

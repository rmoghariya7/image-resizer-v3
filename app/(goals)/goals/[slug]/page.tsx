import { permanentRedirect } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

// No static params — don't pre-render the old /goals/[slug] shell pages.
export function generateStaticParams() {
  return []
}

// 308 permanent redirect: /goals/[slug] → /[slug]
export default async function GoalLegacyRedirect({ params }: Props) {
  const { slug } = await params
  permanentRedirect(`/${slug}`)
}

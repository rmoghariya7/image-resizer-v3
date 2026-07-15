import { permanentRedirect } from 'next/navigation'

interface Props {
  params: Promise<{ size: string }>
}

// /compress-image-to-[size] is now the canonical, indexed goal page for each
// size target — see registry/goals/compress/generator.ts. This route only
// exists so the old public URL /compress-image-under-[size] (rewritten here
// by next.config.ts) 301-redirects to its replacement instead of 404ing.
export function generateStaticParams() {
  return []
}

export default async function CompressUnderLegacyRedirect({ params }: Props) {
  const { size } = await params
  permanentRedirect(`/compress-image-to-${size}`)
}

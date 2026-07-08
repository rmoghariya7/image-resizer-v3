// This route is superseded by app/(compress)/compress-image-under/[size]/page.tsx.
// The public URL /compress-image-under-[size] is handled by the rewrite in next.config.ts
// which forwards requests to the canonical route. This file cannot be deleted in the
// current environment; it generates NO pages at build time (generateStaticParams returns []).
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  // Return empty — canonical route at app/(compress)/compress-image-under/[size]/ handles all traffic.
  return []
}

export const dynamic = 'force-static'

export default function DeprecatedCompressRoute() {
  notFound()
}

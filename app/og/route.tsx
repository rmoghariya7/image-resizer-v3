import type { NextRequest } from 'next/server'
import { renderOgImage } from '@/lib/og/template'

// A single, ordinary dynamic route for every non-root page's Open Graph
// image — NOT the app/**/opengraph-image.tsx file convention.
//
// Next.js 16.2.9 assigns a disambiguating hash to the internal route id
// whenever multiple `opengraph-image.tsx` files share the same conventional
// name across different segments (we had 9: one per goal page + 8 core
// tools). That hash leaks into the served route path (e.g.
// `/compress-image/opengraph-image-1j2z9c`) but the framework's own
// `openGraph.images` URL resolution still points at the unhashed
// conventional path, so every one of those images 404'd in production while
// only the root `/opengraph-image` (no sibling to disambiguate against)
// worked. Routing all per-page images through this single endpoint sidesteps
// the collision entirely, and scales cleanly to however many future tool/goal
// pages get added — no new file per page required.

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const badge = searchParams.get('badge') ?? 'Presetly'
  const title = searchParams.get('title') ?? 'Presetly'
  const description = searchParams.get('description') ?? ''
  const badgesParam = searchParams.get('badges')
  const badges = badgesParam ? badgesParam.split('|') : undefined

  return renderOgImage({ badge, title, description, badges })
}

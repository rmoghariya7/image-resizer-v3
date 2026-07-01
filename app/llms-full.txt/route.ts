/**
 * app/llms-full.txt/route.ts
 *
 * Serves the comprehensive llms-full.txt manifest at /llms-full.txt.
 *
 * Contains the complete canonical URL index for the site, organised by
 * section. Noindex pages and duplicate routes are excluded (specifically,
 * /compress-image-to-* goals whose canonical is /compress-image-under-*).
 *
 * Statically generated at build time from the goal registry, size-preset
 * registry, category definitions, and guide registry. Adding or removing
 * tools from any registry automatically updates this file on next deploy.
 */

import { generateLlmsFullTxt } from '@/lib/llms/generate'

// Statically generate this response at build time.
export const dynamic = 'force-static'

export async function GET(): Promise<Response> {
  const body = generateLlmsFullTxt()

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}

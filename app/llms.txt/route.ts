/**
 * app/llms.txt/route.ts
 *
 * Serves the concise llms.txt manifest at /llms.txt.
 *
 * The llms.txt convention (https://llmstxt.org) gives AI assistants and
 * LLM-aware crawlers a structured, human-readable overview of the site.
 * This file is intentionally brief — see /llms-full.txt for the complete
 * URL index.
 *
 * The route is statically generated at build time. Deploying new goals or
 * guides will regenerate it automatically because the content is derived
 * entirely from the registry.
 */

import { generateLlmsTxt } from '@/lib/llms/generate'

// Statically generate this response at build time.
// Next.js will regenerate it on every deployment when the registry changes.
export const dynamic = 'force-static'

export async function GET(): Promise<Response> {
  const body = generateLlmsTxt()

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Allow LLM crawlers to cache for up to 24 hours
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}

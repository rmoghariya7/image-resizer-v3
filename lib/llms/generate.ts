/**
 * lib/llms/generate.ts
 *
 * Registry-driven content generators for /llms.txt and /llms-full.txt.
 *
 * Both files follow the emerging llms.txt convention described at
 * https://llmstxt.org — a plain-text manifest that helps AI assistants and
 * LLM-aware crawlers understand a website's structure.
 *
 * Rules applied here (must mirror sitemap.ts):
 *  - Goals with slug prefix `compress-image-to-` are noindex.
 *    Their canonical URL is /compress-image-under-{size} (served by size-presets).
 *  - Only `status === 'active'` goals are included.
 *  - No duplicate URLs.
 */

import { getAllGoals } from '@/registry/goals'
import { getAllCategories } from '@/registry/categories'
import { SIZE_TARGETS } from '@/registry/size-presets'
import { getAllGuides } from '@/content/guides'
import { getAllLearnArticles } from '@/registry/learn'
import { getStandaloneTools } from '@/lib/recommendations/engine'

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

/** Slugs that are noindex — their canonical lives at a different URL. */
const NOINDEX_SLUG_PREFIX = 'compress-image-to-'

// Core Tool pages that reuse the image-resizer engine but aren't backed by
// their own ToolDefinition route, so getStandaloneTools() can't surface them
// automatically (mirrors the same list in app/sitemap.ts).
const EXTRA_CORE_TOOL_PAGES = [
  { title: 'Compress Image', path: '/compress-image', description: 'Compress any image to a target file size.' },
  { title: 'Convert Image', path: '/convert-image', description: 'Convert images between JPEG, PNG, and WebP.' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function url(path: string): string {
  return `${BASE_URL}${path}`
}

function link(title: string, path: string, description?: string): string {
  const base = `- [${title}](${url(path)})`
  return description ? `${base}: ${description}` : base
}

// ─── Canonical goal URLs ──────────────────────────────────────────────────────

/** Active goals with canonical URLs (noindex compress-image-to-* excluded). */
export function getCanonicalGoals() {
  return getAllGoals().filter(
    (g) => !g.slug.startsWith(NOINDEX_SLUG_PREFIX),
  )
}

/** Goals by category, canonical only. */
export function getCanonicalGoalsByCategory(category: string) {
  return getCanonicalGoals().filter((g) => g.category === category)
}

/** Compress-image-under-* canonical pages derived from size-presets registry. */
export function getCompressPages() {
  return SIZE_TARGETS.map((t) => ({
    slug: t.slug,              // "compress-image-under-15kb"
    title: t.title,            // "Compress Image Under 15KB"
    description: t.useCase,   // one-line use case
  }))
}

// ─── /llms.txt (concise) ─────────────────────────────────────────────────────

/**
 * Generates the concise /llms.txt manifest.
 *
 * Structure:
 *   # Site name
 *   > Tagline
 *   Description paragraph
 *   ## Categories
 *   ## Most Important Tools
 *   ## Key Guides
 *   ## Contact
 */
export function generateLlmsTxt(): string {
  const categories = getAllCategories()
  const guides = getAllGuides()

  // High-priority tools — one representative per major category
  const highPriorityGoals = getCanonicalGoals().filter((g) => g.priority === 'high')

  const lines: string[] = []

  // ── Header
  lines.push('# Presetly')
  lines.push('')
  lines.push('> Goal-first document preparation platform for Indian government portals and ID applications.')
  lines.push('')
  lines.push(
    'Presetly lets users prepare photos, signatures, and documents for Indian exam portals, ' +
    'ID applications, and file-size targets without ever needing to know pixel dimensions, ' +
    'DPI, or compression ratios. All processing runs in the browser — nothing is uploaded to any server.',
  )
  lines.push('')

  // ── Categories
  lines.push('## Categories')
  lines.push('')
  for (const cat of categories) {
    lines.push(link(cat.name, `/categories/${cat.slug}`, cat.description))
  }
  lines.push('')

  // ── Most important tools
  lines.push('## Most Important Tools')
  lines.push('')
  for (const goal of highPriorityGoals) {
    lines.push(link(goal.title, `/${goal.slug}`, goal.description))
  }
  // Add a representative compression tool
  const compress50 = getCompressPages().find((p) => p.slug === 'compress-image-under-50kb')
  if (compress50) {
    lines.push(link(compress50.title, `/${compress50.slug}`, compress50.description))
  }
  // Standalone tools (own route outside the goal registry, e.g. /video-to-audio)
  for (const tool of getStandaloneTools()) {
    lines.push(link(tool.name, tool.route!, tool.description))
  }
  // Extra Core Tool pages not tied to a ToolDefinition route
  for (const page of EXTRA_CORE_TOOL_PAGES) {
    lines.push(link(page.title, page.path, page.description))
  }
  lines.push('')

  // ── Key guides
  if (guides.length > 0) {
    lines.push('## Key Guides')
    lines.push('')
    for (const guide of guides) {
      lines.push(link(guide.title, `/guides/${guide.slug}`))
    }
    lines.push('')
  }

  // ── Learn articles (high priority)
  const learnArticles = getAllLearnArticles().filter((a) => a.priority === 'high')
  if (learnArticles.length > 0) {
    lines.push('## Learn')
    lines.push('')
    lines.push(link('Learn — Image preparation guides', '/learn'))
    for (const article of learnArticles) {
      lines.push(link(article.title, `/learn/${article.slug}`, article.description))
    }
    lines.push('')
  }

  // ── Contact
  lines.push('## Contact')
  lines.push('')
  lines.push(link('Contact', '/contact'))
  lines.push(link('Privacy Policy', '/privacy-policy'))
  lines.push(link('Terms of Service', '/terms'))
  lines.push('')

  return lines.join('\n')
}

// ─── /llms-full.txt (comprehensive) ──────────────────────────────────────────

/**
 * Generates the comprehensive /llms-full.txt manifest.
 *
 * Structure:
 *   # Presetly — Full URL Index
 *   Product overview
 *   ## Core Pages
 *   ## Exam Photo Tools        (per category)
 *   ## ID Document Tools
 *   ## Compression Tools
 *   ## Signature Tools
 *   ## Category Pages
 *   ## Guides
 *   ## Legal & Info
 */
export function generateLlmsFullTxt(): string {
  const categories = getAllCategories()
  const guides = getAllGuides()
  const compressPages = getCompressPages()

  const lines: string[] = []

  // ── Header
  lines.push('# Presetly — Full URL Index')
  lines.push('')
  lines.push('> Goal-first document preparation platform for Indian government portals and ID applications.')
  lines.push('')
  lines.push(
    'Presetly provides browser-based tools for resizing photos and signatures to the exact ' +
    'specifications required by Indian government portals (UPSC, GPSC, SSC, IBPS, Aadhaar, PAN, ' +
    'Passport, Voter ID, Driving Licence) and for compressing images to precise file-size targets. ' +
    'All processing runs client-side — no uploads, no accounts, no server.',
  )
  lines.push('')
  lines.push(
    'This document lists every canonical public URL on the site. ' +
    'Noindex pages and duplicate routes (e.g. /compress-image-to-* redirects) are excluded.',
  )
  lines.push('')

  // ── Core pages
  lines.push('## Core Pages')
  lines.push('')
  lines.push(link('Home', '/'))
  lines.push(link('All Tools', '/tools'))
  lines.push('')

  // ── Per-category goal pages
  const CATEGORY_HEADINGS: Record<string, string> = {
    'exam':         'Exam Photo Tools',
    'id-documents': 'ID Document Tools',
    'compress':     'Compression Tools (Exact Targets)',
    'signature':    'Signature Tools',
  }

  for (const cat of categories) {
    const heading = CATEGORY_HEADINGS[cat.slug] ?? cat.name
    lines.push(`## ${heading}`)
    lines.push('')

    if (cat.slug === 'compress') {
      // Canonical compress pages come from size-presets, not goals
      for (const page of compressPages) {
        lines.push(link(page.title, `/${page.slug}`, page.description))
      }
    } else {
      const goals = getCanonicalGoalsByCategory(cat.slug)
      for (const goal of goals) {
        lines.push(link(goal.title, `/${goal.slug}`, goal.description))
      }
    }
    lines.push('')
  }

  // ── Standalone converter tools
  const standaloneTools = getStandaloneTools()
  if (standaloneTools.length > 0 || EXTRA_CORE_TOOL_PAGES.length > 0) {
    lines.push('## Converter Tools')
    lines.push('')
    for (const tool of standaloneTools) {
      lines.push(link(tool.name, tool.route!, tool.description))
    }
    for (const page of EXTRA_CORE_TOOL_PAGES) {
      lines.push(link(page.title, page.path, page.description))
    }
    lines.push('')
  }

  // ── Category index pages
  lines.push('## Category Pages')
  lines.push('')
  for (const cat of categories) {
    lines.push(link(`${cat.name} — Overview`, `/categories/${cat.slug}`, cat.description))
  }
  lines.push('')

  // Guides
  if (guides.length > 0) {
    lines.push('## Guides')
    lines.push('')
    for (const guide of guides) {
      lines.push(link(guide.title, `/guides/${guide.slug}`))
    }
    lines.push('')
  }

  // Learn articles
  const learnArticlesFull = getAllLearnArticles()
  if (learnArticlesFull.length > 0) {
    lines.push('## Learn')
    lines.push('')
    lines.push(link('Learn: Image preparation guides', '/learn'))
    for (const article of learnArticlesFull) {
      lines.push(link(article.title, `/learn/${article.slug}`, article.description))
    }
    lines.push('')
  }

  // Legal & info
  lines.push('## Legal & Info')
  lines.push('')
  lines.push(link('About Presetly', '/about'))
  lines.push(link('Contact', '/contact'))
  lines.push(link('Privacy Policy', '/privacy-policy'))
  lines.push(link('Terms of Service', '/terms'))
  lines.push('')

  return lines.join('\n')
}

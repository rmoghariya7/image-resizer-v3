import { getToolsByPlatformCategory, getTool } from '@/registry/tools'
import { getAllGoals } from '@/registry/goals'
import { buildGoalHref } from './engine'
import type { PlatformCategory } from '@/registry/tools/schema'

// ─── Homepage "Tool Categories" section ──────────────────────────────────────
//
// Composes the registry into the platform-level taxonomy shown on the
// homepage (Image / Video / Document / AI). This is homepage-presentation
// logic, not registry data — the registry only knows about ToolDefinitions
// and GoalDefinitions; grouping them into these four user-facing cards, and
// deciding which roadmap placeholders to show alongside them, lives here so
// adding a new tool never requires touching this file's card list, only its
// own registry entry's `platformCategory`.

export type CategoryItem = {
  label: string
  href?: string
  comingSoon: boolean
}

export type PlatformCategoryCard = {
  category: PlatformCategory
  label: string
  description: string
  items: CategoryItem[]
}

const CATEGORY_META: Record<PlatformCategory, { label: string; description: string }> = {
  image: {
    label: 'Image Tools',
    description: 'Compress, resize, crop and convert any photo — all in your browser.',
  },
  video: {
    label: 'Video Tools',
    description: 'Extract audio today; trimming and compression are on the way.',
  },
  document: {
    label: 'Document Tools',
    description: 'Government and ID photo presets, pre-configured to the exact spec.',
  },
  ai: {
    label: 'AI Tools',
    description: 'Smarter automatic edits — coming soon.',
  },
}

// Roadmap placeholders: named capabilities with no ToolDefinition yet.
// These are declarative "Coming Soon" tags only — never a fake/dead link.
const ROADMAP: Record<PlatformCategory, string[]> = {
  image: ['Rotate', 'Flip', 'Background Remove', 'Watermark'],
  video: ['Video Compressor', 'Trim Video', 'Video Converter'],
  document: [],
  ai: ['Background Removal', 'AI Upscale', 'Face Crop', 'Portrait Enhancement'],
}

/** Image / Video / AI cards: built from active ToolDefinitions + roadmap placeholders. */
function buildToolDrivenCard(category: PlatformCategory): PlatformCategoryCard {
  const meta = CATEGORY_META[category]
  const tools = getToolsByPlatformCategory(category)

  const items: CategoryItem[] = [
    ...tools.map((t) => ({
      label: t.name,
      href: t.status === 'active' ? t.route : undefined,
      comingSoon: t.status !== 'active',
    })),
    ...ROADMAP[category].map((label) => ({ label, comingSoon: true })),
  ]

  return { category, label: meta.label, description: meta.description, items }
}

/**
 * Document Tools card: unlike Image/Video/AI, what users actually look for
 * here is the specific goal (Passport Photo, PAN Card, UPSC…), not the
 * underlying tool engine — so this card lists high-priority goals from the
 * exam / id-documents / signature categories instead of ToolDefinitions.
 */
function buildDocumentCard(): PlatformCategoryCard {
  const meta = CATEGORY_META.document
  const DOCUMENT_GOAL_CATEGORIES = ['id-documents', 'exam', 'signature'] as const

  const goals = getAllGoals()
    .filter((g) => (DOCUMENT_GOAL_CATEGORIES as readonly string[]).includes(g.category))
    .filter((g) => g.priority === 'high')
    .slice(0, 7)

  const items: CategoryItem[] = goals.map((g) => {
    const tool = getTool(g.tool)
    return {
      label: g.shortTitle,
      href: tool.status === 'active' ? buildGoalHref(g) : undefined,
      comingSoon: tool.status !== 'active',
    }
  })

  return { category: 'document', label: meta.label, description: meta.description, items }
}

export function getPlatformCategoryCards(): PlatformCategoryCard[] {
  return [
    buildToolDrivenCard('image'),
    buildToolDrivenCard('video'),
    buildDocumentCard(),
    buildToolDrivenCard('ai'),
  ]
}

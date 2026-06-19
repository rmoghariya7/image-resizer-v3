import type { GoalDefinition } from '@/registry/goals/schema'
import {
  SIZE_TARGETS,
  generateFaqs,
  generateHowItWorks,
  type SizeTarget,
} from '@/registry/size-presets'

// ─── Slug ─────────────────────────────────────────────────────────────────────

export function compressGoalSlug(target: SizeTarget): string {
  // Preserve existing slugs for backward-compatibility with external links and
  // cross-references in exam/id-document goals.
  if (target.targetKB === 1024) return 'compress-image-to-1mb'
  return `compress-image-to-${target.sizeParam}`
}

// ─── Static cross-references ──────────────────────────────────────────────────
// Goals that are genuinely relevant to a user who needs a specific size —
// chosen by use-case proximity, not just numeric adjacency.

function staticRelatedGoals(targetKB: number): string[] {
  if (targetKB <= 25)  return ['signature-resize-20kb', 'upsc-photo-resizer']
  if (targetKB <= 75)  return ['aadhaar-photo-resizer', 'pan-card-photo-resizer']
  if (targetKB <= 200) return ['passport-photo-maker', 'aadhaar-photo-resizer']
  return ['passport-photo-maker']
}

// ─── Generator ────────────────────────────────────────────────────────────────

export function generateCompressGoal(
  target: SizeTarget,
  allTargets: readonly SizeTarget[],
): GoalDefinition {
  const slug = compressGoalSlug(target)
  const faqs = generateFaqs(target)
  const steps = generateHowItWorks(target)
  const idx = allTargets.findIndex(t => t.id === target.id)

  // Adjacent compress goal slugs (up to 2 smaller + 2 larger)
  const adjacentSlugs: string[] = []
  for (let i = idx - 1; i >= 0 && adjacentSlugs.length < 2; i--) {
    adjacentSlugs.unshift(compressGoalSlug(allTargets[i]))
  }
  for (let i = idx + 1; i < allTargets.length && adjacentSlugs.length < 4; i++) {
    adjacentSlugs.push(compressGoalSlug(allTargets[i]))
  }

  const relatedGoals = [
    ...adjacentSlugs.slice(0, 3),
    ...staticRelatedGoals(target.targetKB),
  ]

  const longDescription = [
    `Compress any image to under ${target.displaySize} — entirely in your browser, with no uploads, no account, and no quality sliders.`,
    `The tool uses a binary-search algorithm to find the highest JPEG quality that produces a file under ${target.displaySize}.`,
    `Commonly needed for: ${target.useCase}.`,
    `Accepts JPEG, PNG, and WebP. Files up to 20 MB supported.`,
    `Your image never leaves your device.`,
  ].join(' ')

  const priority: GoalDefinition['priority'] =
    target.targetKB <= 100 ? 'high' : target.targetKB <= 200 ? 'medium' : 'low'

  return {
    slug,
    title: `Compress Image to ${target.displaySize}`,
    shortTitle: `Compress to ${target.displaySize}`,
    description: target.description.slice(0, 160),
    longDescription,
    category: 'compress',
    tags: [
      'compress image',
      'reduce image size',
      target.displaySize.toLowerCase(),
      'file size',
      'jpeg compression',
    ],
    tool: 'image-resizer',
    preset: target.id,
    keywords: [...target.keywords],
    howItWorks: steps,
    faqs,
    relatedGoals,
    complementaryGoals: adjacentSlugs.slice(0, 2),
    status: 'active',
    priority,
    updatedAt: '2026-06-01',
  } satisfies GoalDefinition
}

// ─── All generated compress goals ─────────────────────────────────────────────

export const ALL_COMPRESS_GOALS: readonly GoalDefinition[] = Object.freeze(
  SIZE_TARGETS.map(target => generateCompressGoal(target, SIZE_TARGETS)),
)

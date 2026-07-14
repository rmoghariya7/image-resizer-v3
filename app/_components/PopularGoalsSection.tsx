import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGoal } from '@/registry/goals'
import { compressGoalSlug } from '@/registry/goals/compress'
import { QUICK_ACTION_SIZES } from '@/registry/size-presets'
import { getCropPreset } from '@/registry/crop-presets'
import { getTool } from '@/registry/tools'
import { buildGoalHref } from '@/lib/recommendations/engine'

// ─── Popular Goals ────────────────────────────────────────────────────────────
//
// Replaces the old "Popular size targets" (compress-only) + "Popular tools"
// (goals-only) pair with one cross-category grid: the specific destinations
// people actually search for, whatever category or engine they happen to use
// under the hood — compress sizes, government photo goals, a crop preset, and
// a standalone tool all sit side by side.

const CATEGORY_BADGE: Record<string, { label: string; className: string }> = {
  compress: { label: 'Compress', className: 'text-amber-600 bg-amber-50' },
  exam: { label: 'Exam', className: 'text-violet-600 bg-violet-50' },
  'id-documents': { label: 'ID Document', className: 'text-blue-600 bg-blue-50' },
  signature: { label: 'Signature', className: 'text-emerald-600 bg-emerald-50' },
  crop: { label: 'Crop', className: 'text-indigo-600 bg-indigo-50' },
  video: { label: 'Video', className: 'text-rose-600 bg-rose-50' },
}

type PopularCard = {
  key: string
  href: string
  title: string
  description: string
  category: string
}

function buildPopularCards(): PopularCard[] {
  const cards: PopularCard[] = []

  // Two most-searched compress targets
  for (const sizeParam of ['20kb', '50kb'] as const) {
    const target = QUICK_ACTION_SIZES.find((t) => t.sizeParam === sizeParam)
    const goal = target && getGoal(compressGoalSlug(target))
    if (target && goal) {
      cards.push({
        key: goal.slug,
        href: buildGoalHref(goal),
        title: target.title,
        description: target.useCase,
        category: 'compress',
      })
    }
  }

  // High-priority government/ID goals
  for (const slug of ['passport-photo-maker', 'upsc-photo-resizer', 'pan-card-photo-resizer', 'aadhaar-photo-resizer']) {
    const goal = getGoal(slug)
    if (!goal) continue
    const tool = getTool(goal.tool)
    if (tool.status !== 'active') continue
    cards.push({
      key: goal.slug,
      href: buildGoalHref(goal),
      title: goal.shortTitle,
      description: goal.description,
      category: goal.category,
    })
  }

  // A representative Image Cropper preset
  const instagramPreset = getCropPreset('social-instagram-post')
  if (instagramPreset) {
    cards.push({
      key: instagramPreset.id,
      href: '/crop-image',
      title: instagramPreset.name,
      description: instagramPreset.description,
      category: 'crop',
    })
  }

  // Video to Audio
  const videoTool = getTool('video-to-audio')
  if (videoTool.status === 'active' && videoTool.route) {
    cards.push({
      key: videoTool.key,
      href: videoTool.route,
      title: 'Video to MP3',
      description: videoTool.description,
      category: 'video',
    })
  }

  return cards
}

export function PopularGoalsSection() {
  const cards = buildPopularCards()

  return (
    <section id="tools" aria-labelledby="popular-goals-heading" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Most searched</p>
          <h2 id="popular-goals-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Popular goals
          </h2>
          <p className="mt-3 text-muted-foreground">
            The specific things people come to Presetly to do — across every tool.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
          {cards.map((card) => {
            const badge = CATEGORY_BADGE[card.category] ?? { label: card.category, className: 'text-gray-600 bg-gray-50' }
            return (
              <li key={card.key}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md hover:ring-primary/20"
                >
                  <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${badge.className}`}>
                    {badge.label}
                  </span>
                  <span className="mt-2.5 block text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {card.title}
                  </span>
                  <span className="mt-1 block flex-1 text-xs leading-snug text-muted-foreground line-clamp-2">
                    {card.description}
                  </span>
                  <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                    Open
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

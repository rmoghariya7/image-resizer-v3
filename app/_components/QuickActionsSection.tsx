import Link from 'next/link'
import {
  Minimize2,
  Maximize2,
  Crop,
  RefreshCw,
  Music,
  IdCard,
  PenLine,
  SlidersHorizontal,
} from 'lucide-react'
import type { ElementType } from 'react'
import { getGoal } from '@/registry/goals'
import { buildGoalHref } from '@/lib/recommendations/engine'

// ─── Quick Actions ────────────────────────────────────────────────────────────
//
// The first thing a user does after the hero: pick a literal action and land
// on a working tool in one tap. This is intentionally a curated, hand-picked
// list (like FEATURED_SLUGS elsewhere) rather than fully registry-generated —
// Quick Actions is a product decision about which 8 destinations matter most
// today, not an exhaustive tool index (that's what Tool Categories is for).
//
// "Resize Image" and "Custom Resize" intentionally point to the same
// /resize-image destination: the page already supports both quick common
// sizes and typed custom width/height, so a second, separate "custom" tool
// would just be the same capability behind a different label.

type QuickAction = {
  label: string
  href: string
  Icon: ElementType
}

function buildQuickActions(): QuickAction[] {
  const passportGoal = getGoal('passport-photo-maker')
  const signatureGoal = getGoal('signature-resize-20kb')

  const actions: QuickAction[] = [
    { label: 'Compress Image', href: '/compress-image', Icon: Minimize2 },
    { label: 'Resize Image', href: '/resize-image', Icon: Maximize2 },
    { label: 'Crop Image', href: '/crop-image', Icon: Crop },
    { label: 'Convert Image', href: '/convert-image', Icon: RefreshCw },
    { label: 'Extract Audio', href: '/video-to-audio', Icon: Music },
  ]

  if (passportGoal) {
    actions.push({ label: 'Passport Photo', href: buildGoalHref(passportGoal), Icon: IdCard })
  }
  if (signatureGoal) {
    actions.push({ label: 'Signature', href: buildGoalHref(signatureGoal), Icon: PenLine })
  }

  actions.push({ label: 'Custom Resize', href: '/resize-image', Icon: SlidersHorizontal })

  return actions
}

export function QuickActionsSection() {
  const actions = buildQuickActions()

  return (
    <section aria-labelledby="quick-actions-heading" className="bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2
            id="quick-actions-heading"
            className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          >
            What do you want to do?
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" role="list">
          {actions.map(({ label, href, Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-6 text-center shadow-sm ring-1 ring-foreground/5 transition-all hover:border-primary/30 hover:shadow-md sm:flex-row sm:gap-3 sm:px-5 sm:py-5 sm:text-left"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15"
                  aria-hidden="true"
                >
                  <Icon className="size-5 text-primary" />
                </div>
                <span className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

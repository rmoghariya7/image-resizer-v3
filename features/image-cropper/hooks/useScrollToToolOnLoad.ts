'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Auto-scrolls the tool container into view ONCE per page load — on every
 * viewport (mobile, tablet, and desktop) — so the tool is the immediate focus
 * when the page opens, without any manual scrolling.
 *
 * Identical contract to features/image-resizer/hooks/useScrollToToolOnLoad —
 * duplicated here to keep this feature module self-contained (see CLAUDE.md
 * Architecture Rules).
 */
export function useScrollToToolOnLoad(
  toolRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    if (nav?.type === 'back_forward') return

    if (window.location.hash) return
    if (window.scrollY > 8) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const raf = requestAnimationFrame(() => {
      toolRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [toolRef])
}

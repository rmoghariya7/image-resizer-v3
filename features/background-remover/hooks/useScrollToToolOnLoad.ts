'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Auto-scrolls the tool container into view ONCE per page load — on every
 * viewport (mobile, tablet, and desktop) — so the tool is the immediate focus
 * when a tool page opens, without any manual scrolling.
 *
 * Guarantees:
 * - Runs only on mount — never on uploads, processing, or downloads, since
 *   those update state without remounting the tool component.
 * - Runs only after hydration: the tool component is loaded via next/dynamic
 *   (ssr: false) behind a client-mount gate, so by the time this effect fires
 *   the page is fully hydrated and interactive.
 * - Runs inside requestAnimationFrame so the browser has calculated the final
 *   layout of the freshly mounted tool before we scroll.
 * - Skips back/forward navigation (the browser restores the previous scroll
 *   position — we must not fight it) and in-page anchor targets (#hash).
 * - Skips if the user has already started scrolling — never yank the page out
 *   from under them on slow connections.
 * - Respects prefers-reduced-motion (instant jump instead of smooth scroll).
 * - The sticky header offset comes from `scroll-mt-*` (scroll-margin-top) on
 *   the tool container itself — no hard-coded pixel offsets in JS.
 */
export function useScrollToToolOnLoad(
  toolRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    // Back/forward navigation: let the browser's scroll restoration win.
    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    if (nav?.type === 'back_forward') return

    // Anchor navigation (/page#faq): the user asked for a specific section.
    if (window.location.hash) return

    // The user already scrolled while the tool chunk was loading — don't yank.
    if (window.scrollY > 8) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // rAF ensures the final layout has been calculated post-commit.
    const raf = requestAnimationFrame(() => {
      toolRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [toolRef])
}

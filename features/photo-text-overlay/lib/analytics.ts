// Lightweight analytics dispatch for the Photo Footer Generator tool.
// Same GA-only, safe-no-op contract as features/image-cropper/lib/analytics.ts
// (see that file's header comment) — duplicated per feature module.

export type TextOverlayAnalyticsEvent =
  | 'text_overlay_upload'
  | 'text_overlay_name_toggled'
  | 'text_overlay_date_toggled'
  | 'text_overlay_completed'
  | 'text_overlay_download'
  | 'text_overlay_reset'
  | 'text_overlay_error'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: EventParams) => void
  }
}

export function trackTextOverlayEvent(event: TextOverlayAnalyticsEvent, params?: EventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', event, params)
  } catch {
    // Analytics must never break the tool.
  }
}

// Lightweight analytics dispatch for the Image Cropper tool.
//
// The project wires Google Analytics via @next/third-parties/google
// (see app/_components/analytics/analytics.tsx), which exposes a global
// `window.gtag` function once loaded. PostHog (see CLAUDE.md "Technology
// Stack") is planned but not yet wired — this helper is intentionally
// GA-only for now and safely no-ops everywhere else (SSR, ad-blockers,
// analytics not yet loaded), so call sites never need to guard it.

export type CropAnalyticsEvent =
  | 'crop_image_upload'
  | 'crop_image_preset_selected'
  | 'crop_image_adjusted'
  | 'crop_image_completed'
  | 'crop_image_download'
  | 'crop_image_reset'
  | 'crop_image_error'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: EventParams) => void
  }
}

export function trackCropEvent(event: CropAnalyticsEvent, params?: EventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', event, params)
  } catch {
    // Analytics must never break the tool.
  }
}

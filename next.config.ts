import type { NextConfig } from 'next'

// Content Security Policy
//
// Designed to be production-safe today AND extensible for future integrations.
// Each directive is annotated with the reason it exists and what to add/change
// when new integrations are enabled.
//
// UPGRADING:
//   Google Analytics  -- add to script-src: https://www.googletagmanager.com https://www.google-analytics.com
//                        add to connect-src: https://www.google-analytics.com https://analytics.google.com
//   Google AdSense    -- add to script-src: https://pagead2.googlesyndication.com https://*.googlesyndication.com
//                        add to frame-src:  https://googleads.g.doubleclick.net https://tpc.googlesyndication.com
//                        add to img-src:    https://googleads.g.doubleclick.net
//   PostHog           -- add to connect-src: https://app.posthog.com (or eu.posthog.com for EU)
//   Sentry            -- add to connect-src: https://*.sentry.io https://*.ingest.sentry.io
//   CDN               -- add your CDN origin to img-src and font-src

const isDev = process.env.NODE_ENV === 'development'

const CSP_DIRECTIVES = [
  // Safest default: block everything not explicitly allowed below.
  "default-src 'self'",

  // Next.js App Router requires 'unsafe-inline' for its inline hydration scripts.
  // 'unsafe-eval' is NOT included in production - React/webpack only need it for
  // dev-mode Fast Refresh and eval-based source maps. Production builds never call eval().
  // When adding Google Analytics or AdSense, append their script origins here.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,

  // Tailwind utility classes and shadcn/ui components inject inline styles.
  // Next.js also injects critical CSS inline. 'unsafe-inline' is required.
  "style-src 'self' 'unsafe-inline'",

  // next/font/google self-hosts fonts at /_next/static/ -- 'self' is sufficient.
  // fonts.gstatic.com retained as a safety net for edge deployment variants.
  "font-src 'self' https://fonts.gstatic.com",

  // Canvas outputs (compressed images) are surfaced as blob: URLs.
  // Preview thumbnails may use data: URLs for small inline previews.
  // When adding a CDN for static assets, append the CDN origin here.
  "img-src 'self' data: blob:",

  // All fetch/XHR calls are same-origin only.
  // 'ws:'/'wss:' in dev allow the Fast Refresh / HMR websocket, which can run
  // on a different port than the page (e.g. LAN access, custom dev ports).
  // When adding PostHog, Sentry, or Analytics, append their ingest endpoints.
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,

  // The image-processing Web Worker is created from a blob: URL at runtime.
  // 'self' covers worker scripts served from /_next/static/; blob: covers
  // the inline Worker construction pattern (new Worker(URL.createObjectURL(...))).
  "worker-src 'self' blob:",

  // No iframes are used anywhere on this site.
  // When adding Google AdSense, replace 'none' with AdSense frame origins.
  "frame-src 'none'",

  // Prevents this page from being embedded in any frame or iframe on any origin.
  // Supersedes X-Frame-Options (kept for older browser compatibility).
  "frame-ancestors 'self'",

  // Prevents base-tag hijacking attacks.
  "base-uri 'self'",

  // All HTML form submissions go to the same origin only.
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from the declared content-type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Stop pages from being embedded in iframes on other origins (older browser fallback).
  // CSP frame-ancestors above is the modern equivalent.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Force HTTPS for 1 year (set after confirming TLS is in place on Vercel).
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Controls how much referrer info is sent with requests.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict access to browser features; this site needs no microphone, camera, etc.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // Content Security Policy -- see directives and upgrade notes above.
  { key: 'Content-Security-Policy', value: CSP_DIRECTIVES },
]

const nextConfig: NextConfig = {
  headers: async () => [
    {
      // Apply security headers to all routes.
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],

  rewrites: async () => [
    // Public URL /compress-image-under-15kb is rewritten internally to
    // /compress-image-under/15kb so the App Router routes it to
    // app/(compress)/compress-image-under/[size]/page.tsx with params.size = '15kb'.
    {
      source: '/compress-image-under-:size',
      destination: '/compress-image-under/:size',
    },
    // Rewrites the OG image path for compress pages so that social crawlers
    // requesting /compress-image-under-50kb/opengraph-image are routed to the
    // correct Next.js route handler at compress-image-under/[size]/opengraph-image.tsx.
    {
      source: '/compress-image-under-:size/opengraph-image',
      destination: '/compress-image-under/:size/opengraph-image',
    },
  ],
}

export default nextConfig

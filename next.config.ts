import type { NextConfig } from 'next'

// Content Security Policy
//
// Designed to be production-safe today AND extensible for future integrations.
// Each directive is annotated with the reason it exists and what to add/change
// when new integrations are enabled.
//
// UPGRADING:
//   Google Analytics  -- DONE (see script-src / connect-src below).
//   Microsoft Clarity -- DONE (see script-src / connect-src below).
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
  // 'wasm-unsafe-eval' allows WebAssembly compilation ONLY (not JS eval) — required
  // by the FFmpeg WASM engine (video-to-audio) in production. This CSP also applies
  // to /ffmpeg/worker.js, whose worker scope compiles ffmpeg-core.wasm.
  // Google Analytics (via @next/third-parties/google) loads gtag.js from googletagmanager.com.
  // Microsoft Clarity load-balances its tag script across lettered subdomains
  // (a.clarity.ms ... z.clarity.ms) plus c.bing.com -- per Microsoft's official
  // CSP guidance: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp
  // When adding AdSense, also append its script origins here.
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com${isDev ? " 'unsafe-eval'" : ''}`,

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

  // The video-to-audio tool previews extracted audio via <audio src="blob:...">
  // and reads video metadata via <video src="blob:...">. Without an explicit
  // media-src, browsers fall back to default-src 'self' and block blob: media.
  "media-src 'self' blob:",

  // Fetch/XHR calls are same-origin only, plus Google Analytics' measurement
  // endpoints and Microsoft Clarity's data-collection subdomains (same
  // wildcard set as script-src -- Clarity load-balances across both).
  // 'ws:'/'wss:' in dev allow the Fast Refresh / HMR websocket, which can run
  // on a different port than the page (e.g. LAN access, custom dev ports).
  // When adding PostHog or Sentry, append their ingest endpoints.
  `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.clarity.ms https://c.bing.com${isDev ? ' ws: wss:' : ''}`,

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
    {
      // FFmpeg WASM runtime (~31 MB) — cache hard so returning visitors never
      // re-download it. Not `immutable`: the filenames are unversioned, so a
      // week-long TTL bounds staleness after an @ffmpeg/core upgrade.
      source: '/ffmpeg/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
      ],
    },
  ],

  redirects: async () => [
    // Renamed for SEO: the top-ranking competitors for this tool (Pi7,
    // WebUtility.io, Pixellize.io, Pokecut) all use the exact-match URL
    // slug `add-name-and-date-on-photo` for the query "add name and date
    // to photo" — see app/(goals)/add-name-and-date-on-photo/content.ts.
    {
      source: '/photo-date-stamp',
      destination: '/add-name-and-date-on-photo',
      permanent: true,
    },
    {
      source: '/photo-date-stamp/:path*',
      destination: '/add-name-and-date-on-photo/:path*',
      permanent: true,
    },
  ],

  rewrites: async () => [
    // /compress-image-to-[size] (a goal page under app/(goals)/[slug]/) is now
    // the canonical, indexed URL for each size target. The old public URL
    // /compress-image-under-15kb is rewritten internally to /compress-image-under/15kb
    // so the App Router can extract params.size = '15kb' (App Router dynamic
    // segments can't be embedded in a partially-static folder name), then
    // app/(compress)/compress-image-under/[size]/page.tsx 301-redirects it to
    // /compress-image-to-15kb.
    {
      source: '/compress-image-under-:size',
      destination: '/compress-image-under/:size',
    },
  ],
}

export default nextConfig

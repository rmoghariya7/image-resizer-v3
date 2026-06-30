import type { NextConfig } from 'next'

const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from the declared content-type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Stop pages from being embedded in iframes (clickjacking protection).
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
    //
    // Without this rewrite, the old single-segment folder name
    // compress-image-under-[size] would capture the entire slug as
    // params.size = 'compress-image-under-15kb', causing getSizeTarget() to return
    // undefined and triggering notFound(). The root-level [slug] route would also
    // intercept these URLs for the same reason (both have identical regex patterns).
    {
      source: '/compress-image-under-:size',
      destination: '/compress-image-under/:size',
    },
  ],
}

export default nextConfig

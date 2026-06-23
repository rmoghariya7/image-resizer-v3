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
}

export default nextConfig

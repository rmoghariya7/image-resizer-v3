import type { MetadataRoute } from 'next'
import {
  BACKGROUND_COLOR,
  SITE_DESCRIPTION_SHORT,
  SITE_NAME,
  THEME_COLOR,
} from '@/lib/metadata/brand'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Free Online Image, Video & Document Tools`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION_SHORT,
    start_url: '/',
    display: 'standalone',
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

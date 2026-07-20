import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/metadata/brand'

/**
 * One shared visual template for every opengraph-image.tsx route in the app
 * (root, goal pages, and all core tool pages). Each route file stays a thin
 * wrapper — Next.js requires the actual `opengraph-image.tsx` file convention
 * per route, but the JSX and layout only need to live here once.
 */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const DEFAULT_BADGES = ['Free', 'No uploads', 'Browser-based'] as const

interface OgTemplateOptions {
  /** Small pill top-right identifying the tool/category, e.g. "Image Compressor". */
  badge: string
  title: string
  description: string
  badges?: readonly string[]
}

export function renderOgImage({
  badge,
  title,
  description,
  badges = DEFAULT_BADGES,
}: OgTemplateOptions) {
  const displayDesc =
    description.length > 100 ? description.slice(0, 97) + '…' : description

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: brand + category pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e1b4b', letterSpacing: '-0.5px' }}>
            {SITE_NAME}
          </div>
          <div
            style={{
              background: '#ede9fe',
              color: '#4f46e5',
              borderRadius: 30,
              padding: '8px 20px',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {badge}
          </div>
        </div>

        {/* Middle: title + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: title.length > 36 ? 40 : title.length > 24 ? 52 : 56,
              fontWeight: 800,
              color: '#1e1b4b',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, color: '#4b5563', lineHeight: 1.5, maxWidth: 900 }}>
            {displayDesc}
          </div>
        </div>

        {/* Bottom: trust badges */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {badges.map((b) => (
            <div
              key={b}
              style={{
                background: '#4f46e5',
                color: 'white',
                borderRadius: 24,
                padding: '8px 20px',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  )
}

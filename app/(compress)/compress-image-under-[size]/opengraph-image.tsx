import { ImageResponse } from 'next/og'
import { getSizeTarget } from '@/registry/size-presets'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ size: string }>
}

export default async function CompressOgImage({ params }: Props) {
  const { size: sizeParam } = await params
  const target = getSizeTarget(sizeParam)

  const title = target?.title ?? 'Compress Image'
  const useCase = target?.useCase ?? 'Government portals, forms, and document uploads'
  const displaySize = target?.displaySize ?? sizeParam.toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
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
            Presetly
          </div>
          <div
            style={{
              background: '#fde68a',
              color: '#92400e',
              borderRadius: 30,
              padding: '8px 20px',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Image Compression
          </div>
        </div>

        {/* Middle: title + use case */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#1e1b4b',
              letterSpacing: '-2px',
              lineHeight: 1.05,
            }}
          >
            Under {displaySize}
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#4b5563',
              lineHeight: 1.4,
              maxWidth: 850,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 20, color: '#6b7280' }}>
            Used for: {useCase}
          </div>
        </div>

        {/* Bottom: trust badges */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['Free', 'No uploads', 'Auto quality', 'Browser-only'].map((badge) => (
            <div
              key={badge}
              style={{
                background: '#d97706',
                color: 'white',
                borderRadius: 24,
                padding: '8px 20px',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}

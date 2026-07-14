import { ImageResponse } from 'next/og'
import { DESCRIPTION, PAGE_TITLE } from './content'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function ConvertImageOgImage() {
  const displayDesc = DESCRIPTION.length > 100 ? DESCRIPTION.slice(0, 97) + '…' : DESCRIPTION

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e1b4b', letterSpacing: '-0.5px' }}>
            Presetly
          </div>
          <div style={{ background: '#ede9fe', color: '#4f46e5', borderRadius: 30, padding: '8px 20px', fontSize: 18, fontWeight: 600 }}>
            Image Converter
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#1e1b4b', letterSpacing: '-2px', lineHeight: 1.1 }}>
            {PAGE_TITLE}
          </div>
          <div style={{ fontSize: 24, color: '#4b5563', lineHeight: 1.5, maxWidth: 900 }}>
            {displayDesc}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {['Free', 'No uploads', 'JPEG · PNG · WebP'].map((badge) => (
            <div key={badge} style={{ background: '#4f46e5', color: 'white', borderRadius: 24, padding: '8px 20px', fontSize: 16, fontWeight: 600 }}>
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}

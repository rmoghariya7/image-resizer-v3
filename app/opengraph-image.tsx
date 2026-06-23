import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Presetly — Free Photo Resizer for Indian Government Applications'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#1e1b4b',
            letterSpacing: '-3px',
            lineHeight: 1,
          }}
        >
          Presetly
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#4f46e5',
            fontWeight: 600,
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Free Photo Resizer for Indian Government Applications
        </div>

        {/* Tool labels */}
        <div
          style={{
            fontSize: 20,
            color: '#6b7280',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          UPSC · Aadhaar · PAN Card · Passport · Voter ID · Signature
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['No uploads', 'No sign-up', 'Browser-based', 'Free forever'].map((badge) => (
            <div
              key={badge}
              style={{
                background: '#4f46e5',
                color: 'white',
                borderRadius: 30,
                padding: '10px 24px',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 18,
            color: '#9ca3af',
            fontWeight: 500,
          }}
        >
          presetly.app
        </div>
      </div>
    ),
    size,
  )
}

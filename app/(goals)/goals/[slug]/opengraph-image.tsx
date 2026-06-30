import { ImageResponse } from 'next/og'
import { getGoal } from '@/registry/goals'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

const CATEGORY_LABELS: Record<string, string> = {
  exam: 'Exam Photo',
  'id-documents': 'ID Document',
  compress: 'Image Compression',
  signature: 'Signature Tool',
}

export default async function GoalOgImage({ params }: Props) {
  const { slug } = await params
  const goal = getGoal(slug)

  const title = goal?.title ?? 'Free Photo Resizer'
  const description = goal?.description ?? 'Resize and compress photos for Indian government portals.'
  const category = goal ? (CATEGORY_LABELS[goal.category] ?? 'Tool') : 'Tool'

  // Truncate description for the OG image (keeps it readable)
  const displayDesc = description.length > 100 ? description.slice(0, 97) + '…' : description

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
            Presetly
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
            {category}
          </div>
        </div>

        {/* Middle: title + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: '#1e1b4b',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#4b5563',
              lineHeight: 1.5,
              maxWidth: 900,
            }}
          >
            {displayDesc}
          </div>
        </div>

        {/* Bottom: trust badges */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['Free', 'No uploads', 'Browser-only'].map((badge) => (
            <div
              key={badge}
              style={{
                background: '#4f46e5',
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

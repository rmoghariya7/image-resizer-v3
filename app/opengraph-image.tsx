import { SITE_DESCRIPTION, SITE_NAME, TRUST_BADGES } from '@/lib/metadata/brand'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og/template'

export const runtime = 'edge'
export const alt = `${SITE_NAME} — Free Online Image, Video & Document Tools`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderOgImage({
    badge: 'All-in-one toolkit',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    badges: TRUST_BADGES,
  })
}

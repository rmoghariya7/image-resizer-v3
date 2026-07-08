import { getImagePreset } from '@/registry/presets'
import type { ImagePresetKey } from '@/registry/presets/schema'

// ─── Resize preset types ──────────────────────────────────────────────────────
// Quick dimension presets for the /image-resizer flagship tool.
//
// Government presets DERIVE their dimensions from the image-preset registry
// (single source of truth) — if a portal spec changes, both the dedicated goal
// page and the Image Resizer preset update together.

export type ResizePresetCategory = 'government' | 'social' | 'developer' | 'display'

export interface ResizePreset {
  readonly id: string
  readonly label: string
  readonly width: number
  readonly height: number
  readonly category: ResizePresetCategory
  /** Short context shown under the label — aspect ratio or physical size. */
  readonly hint: string
  /** Dedicated goal page for this preset, when one exists (government only). */
  readonly href?: string
}

export const RESIZE_PRESET_CATEGORIES: readonly {
  id: ResizePresetCategory
  label: string
}[] = [
  { id: 'government', label: 'Government' },
  { id: 'social', label: 'Social' },
  { id: 'developer', label: 'Developer' },
  { id: 'display', label: 'Desktop' },
]

// ─── Government presets (derived from the image-preset registry) ──────────────

const GOVERNMENT_SOURCES: readonly {
  id: string
  label: string
  presetKey: ImagePresetKey
  href: string
}[] = [
  { id: 'upsc', label: 'UPSC', presetKey: 'upsc', href: '/upsc-photo-resizer' },
  { id: 'gpsc', label: 'GPSC', presetKey: 'gpsc', href: '/gpsc-photo-resizer' },
  { id: 'ssc', label: 'SSC', presetKey: 'ssc', href: '/ssc-photo-resizer' },
  { id: 'passport', label: 'Passport', presetKey: 'passport-india', href: '/passport-photo-maker' },
  { id: 'aadhaar', label: 'Aadhaar', presetKey: 'aadhaar', href: '/aadhaar-photo-resizer' },
  { id: 'pan-card', label: 'PAN Card', presetKey: 'pan-card', href: '/pan-card-photo-resizer' },
  { id: 'signature', label: 'Signature', presetKey: 'signature-20kb', href: '/signature-resize-20kb' },
]

const governmentPresets: ResizePreset[] = GOVERNMENT_SOURCES.map(src => {
  const preset = getImagePreset(src.presetKey)
  return {
    id: src.id,
    label: src.label,
    width: preset.widthPx,
    height: preset.heightPx,
    category: 'government',
    hint: preset.displayDimensions,
    href: src.href,
  }
})

// ─── Social media presets ─────────────────────────────────────────────────────

const socialPresets: ResizePreset[] = [
  { id: 'instagram-square', label: 'Instagram Square', width: 1080, height: 1080, category: 'social', hint: '1:1' },
  { id: 'instagram-portrait', label: 'Instagram Portrait', width: 1080, height: 1350, category: 'social', hint: '4:5' },
  { id: 'instagram-story', label: 'Instagram Story', width: 1080, height: 1920, category: 'social', hint: '9:16' },
  { id: 'facebook-cover', label: 'Facebook Cover', width: 820, height: 312, category: 'social', hint: 'Cover' },
  { id: 'facebook-post', label: 'Facebook Post', width: 1200, height: 630, category: 'social', hint: '1.91:1' },
  { id: 'linkedin-banner', label: 'LinkedIn Banner', width: 1584, height: 396, category: 'social', hint: '4:1' },
  { id: 'twitter-header', label: 'Twitter Header', width: 1500, height: 500, category: 'social', hint: '3:1' },
  { id: 'youtube-thumbnail', label: 'YouTube Thumbnail', width: 1280, height: 720, category: 'social', hint: '16:9' },
  { id: 'tiktok', label: 'TikTok', width: 1080, height: 1920, category: 'social', hint: '9:16' },
]

// ─── Developer presets (favicons / app icons) ─────────────────────────────────

const FAVICON_SIZES = [16, 32, 64, 128, 256, 512, 1024] as const

const developerPresets: ResizePreset[] = FAVICON_SIZES.map(size => ({
  id: `favicon-${size}`,
  label: size <= 64 ? `Favicon ${size}×${size}` : `Icon ${size}×${size}`,
  width: size,
  height: size,
  category: 'developer',
  hint: '1:1',
}))

// ─── Desktop / display presets ────────────────────────────────────────────────

const displayPresets: ResizePreset[] = [
  { id: 'hd', label: 'HD', width: 1280, height: 720, category: 'display', hint: '720p' },
  { id: 'full-hd', label: 'Full HD', width: 1920, height: 1080, category: 'display', hint: '1080p' },
  { id: '2k', label: '2K', width: 2560, height: 1440, category: 'display', hint: '1440p' },
  { id: '4k', label: '4K', width: 3840, height: 2160, category: 'display', hint: '2160p' },
]

// ─── Registry ─────────────────────────────────────────────────────────────────

export const RESIZE_PRESETS: readonly ResizePreset[] = Object.freeze([
  ...governmentPresets,
  ...socialPresets,
  ...developerPresets,
  ...displayPresets,
])

const BY_ID = new Map<string, ResizePreset>(RESIZE_PRESETS.map(p => [p.id, p]))

export function getResizePreset(id: string): ResizePreset | undefined {
  return BY_ID.get(id)
}

export function getResizePresetsByCategory(
  category: ResizePresetCategory,
): ResizePreset[] {
  return RESIZE_PRESETS.filter(p => p.category === category)
}

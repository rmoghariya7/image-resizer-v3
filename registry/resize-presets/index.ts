import { getCompressPreset, getImagePreset } from '@/registry/presets'
import type { CompressPresetKey, ImagePresetKey, OutputFormat } from '@/registry/presets/schema'

// ─── Resize preset types ──────────────────────────────────────────────────────
// Goal-first presets for the /image-resizer flagship tool. A preset is a
// destination — either "I need these dimensions" ('dimensions' kind:
// "YouTube Thumbnail", "Aadhaar Update") or "I need this file size"
// ('compress' kind: "Under 50 KB"). Selecting one configures every technical
// setting so the user never thinks in pixels or kilobytes.
//
// Government presets DERIVE their dimensions and output format from the
// image-preset registry, and compression presets DERIVE their target from the
// compress-preset registry (single sources of truth) — if a spec changes,
// the dedicated goal page and the Image Resizer preset update together.

export type ResizePresetCategory =
  | 'government'
  | 'social'
  | 'developer'
  | 'display'
  | 'compression'

/** Icon identifier rendered on preset cards (mapped to lucide icons in the picker). */
export type ResizePresetIcon =
  | 'landmark'
  | 'plane'
  | 'fingerprint'
  | 'credit-card'
  | 'pen-line'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'music'
  | 'globe'
  | 'app-window'
  | 'monitor'
  | 'file-down'

interface ResizePresetBase {
  readonly id: string
  readonly label: string
  readonly category: ResizePresetCategory
  /** Short context — aspect ratio, physical size, or size cap. Shown in reference tables. */
  readonly hint: string
  /** Goal-first helper text on the preset card ("Perfect for YouTube videos"). */
  readonly description: string
  /** Picker card icon. */
  readonly icon: ResizePresetIcon
  /** Dedicated goal page for this preset, when one exists. */
  readonly href?: string
}

/** "I need these dimensions" — configures the resize pipeline. */
export interface DimensionResizePreset extends ResizePresetBase {
  readonly kind: 'dimensions'
  readonly width: number
  readonly height: number
  /** Output format the destination requires (government portals). Absent = keep the user's format. */
  readonly format?: OutputFormat
}

/** "I need this file size" — runs the compression engine with this registry preset. */
export interface CompressResizePreset extends ResizePresetBase {
  readonly kind: 'compress'
  readonly targetKB: number
  /** Key into the compress-preset registry — the engine config lives there. */
  readonly presetKey: CompressPresetKey
}

export type ResizePreset = DimensionResizePreset | CompressResizePreset

export const RESIZE_PRESET_CATEGORIES: readonly {
  id: ResizePresetCategory
  label: string
}[] = [
  { id: 'government', label: 'Government' },
  { id: 'social', label: 'Social' },
  { id: 'compression', label: 'File size' },
  { id: 'developer', label: 'Developer' },
  { id: 'display', label: 'Desktop' },
]

// ─── Government presets (derived from the image-preset registry) ──────────────

const GOVERNMENT_SOURCES: readonly {
  id: string
  label: string
  presetKey: ImagePresetKey
  description: string
  icon: ResizePresetIcon
  href: string
}[] = [
  { id: 'upsc', label: 'UPSC', presetKey: 'upsc', description: 'UPSC application photo', icon: 'landmark', href: '/upsc-photo-resizer' },
  { id: 'gpsc', label: 'GPSC', presetKey: 'gpsc', description: 'GPSC application photo', icon: 'landmark', href: '/gpsc-photo-resizer' },
  { id: 'ssc', label: 'SSC', presetKey: 'ssc', description: 'SSC application photo', icon: 'landmark', href: '/ssc-photo-resizer' },
  { id: 'passport', label: 'Passport', presetKey: 'passport-india', description: 'Passport application photo', icon: 'plane', href: '/passport-photo-maker' },
  { id: 'aadhaar', label: 'Aadhaar', presetKey: 'aadhaar', description: 'Aadhaar update photo', icon: 'fingerprint', href: '/aadhaar-photo-resizer' },
  { id: 'pan-card', label: 'PAN Card', presetKey: 'pan-card', description: 'PAN card photo', icon: 'credit-card', href: '/pan-card-photo-resizer' },
  { id: 'signature', label: 'Signature', presetKey: 'signature-20kb', description: 'Portal signature upload', icon: 'pen-line', href: '/signature-resize-20kb' },
]

const governmentPresets: DimensionResizePreset[] = GOVERNMENT_SOURCES.map(src => {
  const preset = getImagePreset(src.presetKey)
  return {
    kind: 'dimensions',
    id: src.id,
    label: src.label,
    width: preset.widthPx,
    height: preset.heightPx,
    category: 'government',
    hint: preset.displayDimensions,
    description: src.description,
    icon: src.icon,
    format: preset.format,
    href: src.href,
  }
})

// ─── Social media presets ─────────────────────────────────────────────────────

const socialPresets: DimensionResizePreset[] = [
  { kind: 'dimensions', id: 'instagram-square', label: 'Instagram Square', width: 1080, height: 1080, category: 'social', hint: '1:1', description: 'Square feed post', icon: 'instagram' },
  { kind: 'dimensions', id: 'instagram-portrait', label: 'Instagram Portrait', width: 1080, height: 1350, category: 'social', hint: '4:5', description: 'Tall 4:5 feed post', icon: 'instagram' },
  { kind: 'dimensions', id: 'instagram-story', label: 'Instagram Story', width: 1080, height: 1920, category: 'social', hint: '9:16', description: 'Vertical Story', icon: 'instagram' },
  { kind: 'dimensions', id: 'facebook-cover', label: 'Facebook Cover', width: 820, height: 312, category: 'social', hint: 'Cover', description: 'Page cover photo', icon: 'facebook' },
  { kind: 'dimensions', id: 'facebook-post', label: 'Facebook Post', width: 1200, height: 630, category: 'social', hint: '1.91:1', description: 'Feed & link post', icon: 'facebook' },
  { kind: 'dimensions', id: 'linkedin-banner', label: 'LinkedIn Banner', width: 1584, height: 396, category: 'social', hint: '4:1', description: 'Profile banner', icon: 'linkedin' },
  { kind: 'dimensions', id: 'twitter-header', label: 'Twitter Header', width: 1500, height: 500, category: 'social', hint: '3:1', description: 'Profile header', icon: 'twitter' },
  { kind: 'dimensions', id: 'youtube-thumbnail', label: 'YouTube Thumbnail', width: 1280, height: 720, category: 'social', hint: '16:9', description: 'Perfect for YouTube videos', icon: 'youtube' },
  { kind: 'dimensions', id: 'tiktok', label: 'TikTok', width: 1080, height: 1920, category: 'social', hint: '9:16', description: 'Vertical video cover', icon: 'music' },
]

// ─── Compression goal presets (derived from the compress-preset registry) ─────

const COMPRESSION_SOURCES: readonly {
  id: string
  presetKey: CompressPresetKey
  description: string
}[] = [
  { id: 'under-10kb', presetKey: 'compress-10kb', description: 'Strict portal limits' },
  { id: 'under-15kb', presetKey: 'compress-15kb', description: 'Signature uploads' },
  { id: 'under-20kb', presetKey: 'compress-20kb', description: 'Document photos' },
  { id: 'under-25kb', presetKey: 'compress-25kb', description: 'Exam portal uploads' },
  { id: 'under-30kb', presetKey: 'compress-30kb', description: 'Application forms' },
  { id: 'under-50kb', presetKey: 'compress-50kb', description: 'Email & web forms' },
  { id: 'under-100kb', presetKey: 'compress-100kb', description: 'Fast web images' },
  { id: 'under-200kb', presetKey: 'compress-200kb', description: 'High-quality sharing' },
]

const compressionPresets: CompressResizePreset[] = COMPRESSION_SOURCES.map(src => {
  const preset = getCompressPreset(src.presetKey)
  return {
    kind: 'compress',
    id: src.id,
    label: `Under ${preset.displayMaxSize}`,
    targetKB: preset.targetKB,
    presetKey: src.presetKey,
    category: 'compression',
    hint: `≤ ${preset.displayMaxSize}`,
    description: src.description,
    icon: 'file-down',
  }
})

// ─── Developer presets (favicons / app icons) ─────────────────────────────────

const FAVICON_SIZES = [16, 32, 64, 128, 256, 512, 1024] as const

const developerPresets: DimensionResizePreset[] = FAVICON_SIZES.map(size => ({
  kind: 'dimensions',
  id: `favicon-${size}`,
  label: size <= 64 ? `Favicon ${size}×${size}` : `Icon ${size}×${size}`,
  width: size,
  height: size,
  category: 'developer',
  hint: '1:1',
  description: size <= 64 ? 'Browser tab icon' : size <= 512 ? 'App & web icon' : 'App store icon',
  icon: size <= 64 ? 'globe' : 'app-window',
}))

// ─── Desktop / display presets ────────────────────────────────────────────────

const displayPresets: DimensionResizePreset[] = [
  { kind: 'dimensions', id: 'hd', label: 'HD', width: 1280, height: 720, category: 'display', hint: '720p', description: 'Web videos & headers', icon: 'monitor' },
  { kind: 'dimensions', id: 'full-hd', label: 'Full HD', width: 1920, height: 1080, category: 'display', hint: '1080p', description: 'Wallpapers & screens', icon: 'monitor' },
  { kind: 'dimensions', id: '2k', label: '2K', width: 2560, height: 1440, category: 'display', hint: '1440p', description: 'High-res monitors', icon: 'monitor' },
  { kind: 'dimensions', id: '4k', label: '4K', width: 3840, height: 2160, category: 'display', hint: '2160p', description: 'UHD displays', icon: 'monitor' },
]

// ─── Registry ─────────────────────────────────────────────────────────────────

export const RESIZE_PRESETS: readonly ResizePreset[] = Object.freeze([
  ...governmentPresets,
  ...socialPresets,
  ...compressionPresets,
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

/**
 * "You may also need" suggestions: siblings from the same category, in
 * registry order. Drives the related-presets strip in the picker.
 */
export function getRelatedResizePresets(id: string, limit = 4): ResizePreset[] {
  const preset = BY_ID.get(id)
  if (!preset) return []
  return RESIZE_PRESETS
    .filter(p => p.category === preset.category && p.id !== id)
    .slice(0, limit)
}

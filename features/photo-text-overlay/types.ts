import type { DateFormatId } from '@/registry/text-overlay-presets'

export type AcceptedMimeType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif'

export const ACCEPTED_MIME_TYPES: readonly AcceptedMimeType[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]

export const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp,.avif'
export const MAX_FILE_SIZE_MB = 20
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export type OutputFormat = 'jpeg' | 'png' | 'webp'

// ─── Drop zone ────────────────────────────────────────────────────────────────

export type DropZoneStatus = 'idle' | 'active' | 'rejected'

export type ValidationError = {
  code: 'file-too-large' | 'invalid-type'
  message: string
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export type OriginalImage = {
  file: File
  objectUrl: string
  width: number
  height: number
  sizeKB: number
}

export type FooterResult = {
  blob: Blob
  objectUrl: string
  sizeKB: number
  width: number
  height: number
  filename: string
  mimeType: string
}

// ─── Name / Date / Footer settings ───────────────────────────────────────────
// This tool is a Photo Footer Generator, not a watermark or on-image overlay
// tool: the uploaded photo is never drawn on. A white (or chosen colour)
// footer band is added BELOW the photo instead, and Name/Date text is placed
// only inside that band. See lib/canvas-utils.ts for the extend-canvas-
// downward pipeline this feeds into.

export type Alignment = 'left' | 'center' | 'right'

export type NameSettings = {
  enabled: boolean
  text: string
  alignment: Alignment
  fontSizePx: number
}

export type DateSettings = {
  enabled: boolean
  date: Date
  dateFormat: DateFormatId
  alignment: Alignment
  fontSizePx: number
}

export type FooterSettings = {
  heightPx: number
  backgroundColor: string
  textColor: string
}

export const DEFAULT_NAME_SETTINGS: NameSettings = {
  enabled: true,
  text: '',
  alignment: 'left',
  fontSizePx: 28,
}

export const DEFAULT_DATE_SETTINGS_BASE: Omit<DateSettings, 'dateFormat'> = {
  enabled: true,
  date: new Date(),
  alignment: 'right',
  fontSizePx: 28,
}

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  heightPx: 40,
  backgroundColor: '#FFFFFF',
  textColor: '#111827',
}

// Size-like values (fontSizePx, footer heightPx, padding) are expressed in
// "design pixels" against a 1000px-wide reference frame — see
// lib/canvas-utils.ts's REFERENCE_WIDTH comment for how these stay
// proportionally identical between the live preview and the exported image
// regardless of the photo's actual resolution or how large the preview is
// rendered on screen.

// ─── Footer layout mode — the "smart alignment" decision ────────────────────
// Purely derived from which of Name/Date are enabled and their alignments
// (see lib/canvas-utils.ts's resolveFooterLayoutMode). Both the canvas
// exporter and the live CSS preview read the same mode so they can never
// disagree about whether Name and Date sit in one row or stack.

export type FooterLayoutMode = 'empty' | 'name-only' | 'date-only' | 'row' | 'stacked'

// ─── State machine ────────────────────────────────────────────────────────────

export type FooterToolState =
  | { status: 'idle' }
  | { status: 'ready'; original: OriginalImage }
  | { status: 'processing'; original: OriginalImage }
  | { status: 'done'; original: OriginalImage; result: FooterResult }
  | { status: 'error'; message: string }

export type { DateFormatId }

// ─── Accepted inputs ──────────────────────────────────────────────────────────

export type AcceptedVideoMimeType =
  | 'video/mp4'
  | 'video/quicktime'
  | 'video/x-msvideo'
  | 'video/x-matroska'
  | 'video/webm'
  | 'video/x-m4v'

export const ACCEPTED_MIME_TYPES: readonly AcceptedVideoMimeType[] = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/webm',
  'video/x-m4v',
]

// Windows/Android often report an empty or generic MIME type for MKV/AVI,
// so validation also accepts files by extension.
export const ACCEPTED_EXTENSIONS = '.mp4,.mov,.avi,.mkv,.webm,.m4v'
export const ACCEPTED_EXTENSION_LIST: readonly string[] = [
  'mp4',
  'mov',
  'avi',
  'mkv',
  'webm',
  'm4v',
]

// The whole file is written into FFmpeg's in-memory filesystem (wasm32 heap),
// so the ceiling is memory, not bandwidth — nothing is uploaded.
export const MAX_FILE_SIZE_MB = 512
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// ─── Output formats ───────────────────────────────────────────────────────────

export type OutputFormat = 'mp3' | 'wav' | 'aac' | 'ogg' | 'flac'

export type FormatConfig = {
  key: OutputFormat
  label: string
  /** Decorative emoji shown on the format card. */
  icon: string
  /** One-line benefit shown on the card. */
  tagline: string
  /** Second line — hidden on the most compact layouts. */
  detail: string
  /** File extension of the produced audio (aac ships in an .m4a container). */
  extension: string
  mimeType: string
  /** FFmpeg encoder used — surfaced read-only under Advanced. */
  codec: string
  /** Lossless formats ignore the bitrate setting. */
  lossless: boolean
}

export const OUTPUT_FORMATS: readonly FormatConfig[] = [
  {
    key: 'mp3',
    label: 'MP3',
    icon: '🎵',
    tagline: 'Smallest size',
    detail: 'Best compatibility',
    extension: 'mp3',
    mimeType: 'audio/mpeg',
    codec: 'libmp3lame',
    lossless: false,
  },
  {
    key: 'wav',
    label: 'WAV',
    icon: '🎧',
    tagline: 'Highest quality',
    detail: 'Larger file',
    extension: 'wav',
    mimeType: 'audio/wav',
    codec: 'pcm_s16le',
    lossless: true,
  },
  {
    key: 'aac',
    label: 'AAC',
    icon: '🎙️',
    tagline: 'Apple devices',
    detail: 'Balanced quality',
    extension: 'm4a',
    mimeType: 'audio/mp4',
    codec: 'aac',
    lossless: false,
  },
  {
    key: 'ogg',
    label: 'OGG',
    icon: '🎼',
    tagline: 'Open format',
    detail: 'Great for web',
    extension: 'ogg',
    mimeType: 'audio/ogg',
    codec: 'libvorbis',
    lossless: false,
  },
  {
    key: 'flac',
    label: 'FLAC',
    icon: '💿',
    tagline: 'Lossless',
    detail: 'Studio quality',
    extension: 'flac',
    mimeType: 'audio/flac',
    codec: 'flac',
    lossless: true,
  },
]

export function getFormatConfig(format: OutputFormat): FormatConfig {
  const config = OUTPUT_FORMATS.find(f => f.key === format)
  if (!config) throw new Error(`Unknown output format: "${format}"`)
  return config
}

// ─── Advanced settings ────────────────────────────────────────────────────────

export type Bitrate = '128' | '192' | '256' | '320'
export type SampleRate = 'auto' | '44100' | '48000'
export type Channels = 'auto' | 'mono' | 'stereo'

export type AdvancedSettings = {
  /** kbps — applies to lossy formats (MP3/AAC/OGG) only. */
  bitrate: Bitrate
  /** 'auto' keeps the source sample rate. */
  sampleRate: SampleRate
  /** 'auto' keeps the source channel layout. */
  channels: Channels
}

export const DEFAULT_ADVANCED_SETTINGS: AdvancedSettings = {
  bitrate: '192',
  sampleRate: 'auto',
  channels: 'auto',
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export type SourceVideo = {
  file: File
  name: string
  sizeKB: number
  /**
   * Seconds. Undefined until known — browsers can't read metadata for every
   * container (AVI/MKV); FFmpeg's log fills it in during extraction.
   */
  duration?: number
}

export type ExtractedAudio = {
  blob: Blob
  objectUrl: string
  filename: string
  /** One-decimal-place KB. Measured from the actual Blob. */
  sizeKB: number
  format: OutputFormat
  duration?: number
}

// ─── State machine ────────────────────────────────────────────────────────────

/** 'engine' = downloading/booting FFmpeg (first run only); 'extract' = converting. */
export type ExtractStage = 'engine' | 'extract'

export type ExtractorState =
  | { status: 'idle' }
  | { status: 'ready'; video: SourceVideo }
  | { status: 'extracting'; video: SourceVideo; stage: ExtractStage; progress: number }
  | { status: 'done'; video: SourceVideo; result: ExtractedAudio }
  | { status: 'error'; message: string; video?: SourceVideo }

// ─── Drop zone ────────────────────────────────────────────────────────────────

export type DropZoneStatus = 'idle' | 'active' | 'rejected'

export type ValidationError = {
  code: 'file-too-large' | 'invalid-type'
  message: string
}

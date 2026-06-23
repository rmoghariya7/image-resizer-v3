import type { Preset, PresetKey } from '@/types/registry'

export type AcceptedMimeType = 'image/jpeg' | 'image/png' | 'image/webp'

export type CompressionStatus =
  | 'already-below-target'
  | 'compressed'
  | 'could-not-reach-target'

export const ACCEPTED_MIME_TYPES: readonly AcceptedMimeType[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp'
export const MAX_FILE_SIZE_MB = 20
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// ─── Worker message protocol ──────────────────────────────────────────────────

export type WorkerRequest = {
  type: 'PROCESS'
  id: string
  bitmap: ImageBitmap
  preset: Preset
  originalMime: AcceptedMimeType
}

export type WorkerResponse =
  | { type: 'PROGRESS'; id: string; percent: number }
  // sizeKB: one decimal precision (e.g. 14.7). targetKB / compressionStatus: compress presets only.
  | { type: 'SUCCESS'; id: string; blob: Blob; sizeKB: number; targetKB?: number; compressionStatus?: CompressionStatus }
  | { type: 'ERROR'; id: string; message: string }

// ─── Domain types ─────────────────────────────────────────────────────────────

export type ProcessedResult = {
  blob: Blob
  objectUrl: string
  /** One-decimal-place KB (e.g. 14.7). Validates the actual Blob size — never derived from filename. */
  sizeKB: number
  /** Present for compress presets. Used to show target vs. actual comparison. */
  targetKB?: number
  /** Outcome of the compress pipeline. Absent for image presets. */
  compressionStatus?: CompressionStatus
  filename: string
  mimeType: string
}

export type OriginalImage = {
  file: File
  objectUrl: string
  width: number
  height: number
  sizeKB: number
}

// ─── State machine ────────────────────────────────────────────────────────────

export type ResizerState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'processing'; progress: number; original: OriginalImage }
  | { status: 'done'; original: OriginalImage; result: ProcessedResult }
  | { status: 'error'; message: string }

// ─── Drop zone ────────────────────────────────────────────────────────────────

export type DropZoneStatus = 'idle' | 'active' | 'rejected'

export type ValidationError = {
  code: 'file-too-large' | 'invalid-type'
  message: string
}

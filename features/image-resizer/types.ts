import type { CompressPreset, Preset } from '@/types/registry'
import type { OutputFormat } from '@/registry/presets/schema'

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

// ─── Custom resize operation ──────────────────────────────────────────────────
// Free-form resize used by the /image-resizer flagship tool. Unlike Preset
// (registry-defined, fixed dimensions), an operation is assembled by the user
// in the resize editor: dimensions, mode, output format, and quality.

export type ResizeMode = 'stretch' | 'fit' | 'fill'

export type ResizeOperation = {
  /** Requested output size in pixels. For 'fit' mode the actual output may be smaller on one axis. */
  targetWidth: number
  targetHeight: number
  mode: ResizeMode
  format: OutputFormat
  /** 1–100. Applied to lossy encoders (JPEG/WebP); ignored for PNG. */
  quality: number
}

// ─── Custom tool job ──────────────────────────────────────────────────────────
// What the /image-resizer tool asks the worker to do. A dimension preset or
// the custom editor produces a 'resize' job; a compression goal preset runs
// the existing compress engine (binary-search quality pipeline) via its
// registry preset — no duplicated logic.

export type ResizeJob =
  | { kind: 'resize'; operation: ResizeOperation }
  | { kind: 'compress'; preset: CompressPreset; originalMime: AcceptedMimeType }

// ─── Worker message protocol ──────────────────────────────────────────────────

export type WorkerRequest =
  | {
      type: 'PROCESS'
      id: string
      bitmap: ImageBitmap
      preset: Preset
      originalMime: AcceptedMimeType
    }
  | {
      type: 'RESIZE'
      id: string
      bitmap: ImageBitmap
      operation: ResizeOperation
    }

export type WorkerResponse =
  | { type: 'PROGRESS'; id: string; percent: number }
  // sizeKB: one decimal precision (e.g. 14.7). targetKB / compressionStatus: compress presets only.
  // width/height: actual output dimensions — present for RESIZE operations.
  | { type: 'SUCCESS'; id: string; blob: Blob; sizeKB: number; targetKB?: number; compressionStatus?: CompressionStatus; width?: number; height?: number }
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
  /** Actual output dimensions in px. Present for custom resize operations. */
  width?: number
  height?: number
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

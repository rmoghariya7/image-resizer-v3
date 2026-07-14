import type { Area } from 'react-easy-crop'
import type { CropOutputFormat } from '@/registry/crop-presets'

export type AcceptedMimeType = 'image/jpeg' | 'image/png' | 'image/webp'

export const ACCEPTED_MIME_TYPES: readonly AcceptedMimeType[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp'
export const MAX_FILE_SIZE_MB = 20
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

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

export type CroppedResult = {
  blob: Blob
  objectUrl: string
  sizeKB: number
  width: number
  height: number
  filename: string
  mimeType: string
}

/** Live transform applied on the crop stage — mirrors react-easy-crop's own state shape. */
export type CropTransform = {
  crop: { x: number; y: number }
  zoom: number
  rotation: number
  flipHorizontal: boolean
  flipVertical: boolean
}

export const DEFAULT_TRANSFORM: CropTransform = {
  crop: { x: 0, y: 0 },
  zoom: 1,
  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,
}

export type { Area as CropArea }
export type { CropOutputFormat }

// ─── State machine ────────────────────────────────────────────────────────────

export type CropperState =
  | { status: 'idle' }
  | { status: 'ready'; original: OriginalImage }
  | { status: 'processing'; original: OriginalImage }
  | { status: 'done'; original: OriginalImage; result: CroppedResult }
  | { status: 'error'; message: string }

// ─── Export options passed into the canvas pipeline ──────────────────────────

export type ExportOptions = {
  rotation: number
  flipHorizontal: boolean
  flipVertical: boolean
  /** When set, the final crop is resized to these exact pixels. */
  outputWidth?: number
  outputHeight?: number
  format: CropOutputFormat
  backgroundFill?: string
}

export type AcceptedMimeType = 'image/jpeg' | 'image/png' | 'image/webp'

export const ACCEPTED_MIME_TYPES: readonly AcceptedMimeType[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp'
export const MAX_FILE_SIZE_MB = 20
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// ─── Output background options ────────────────────────────────────────────────

export type BackgroundOption = 'transparent' | 'white' | 'color'

export type BackgroundChoice =
  | { kind: 'transparent' }
  | { kind: 'white' }
  | { kind: 'color'; hex: string }

// ─── Worker message protocol ──────────────────────────────────────────────────
// Two-phase progress: the model only needs to load once per session (cached
// after that), so PHASE lets the UI show "Loading AI model…" vs "Removing
// background…" instead of one misleading combined percentage.

export type ProcessingPhase = 'loading-model' | 'removing-background'

export type WorkerRequest =
  | { type: 'PROCESS'; id: string; bitmap: ImageBitmap; background: BackgroundChoice }
  // Re-composites the *already-computed* alpha mask onto a new background —
  // instant (no re-inference) so switching Transparent/White/Color feels
  // immediate. Only valid after a PROCESS has succeeded in this worker.
  | { type: 'RECOMPOSITE'; id: string; background: BackgroundChoice }

export type WorkerResponse =
  | { type: 'PHASE'; id: string; phase: ProcessingPhase }
  | { type: 'PROGRESS'; id: string; phase: ProcessingPhase; percent: number }
  // sizeKB: one decimal precision (e.g. 214.7).
  | { type: 'SUCCESS'; id: string; blob: Blob; sizeKB: number; mimeType: string }
  | { type: 'ERROR'; id: string; message: string }

// ─── Domain types ─────────────────────────────────────────────────────────────

export type OriginalImage = {
  file: File
  objectUrl: string
  width: number
  height: number
  sizeKB: number
}

export type ProcessedResult = {
  blob: Blob
  objectUrl: string
  /** One-decimal-place KB (e.g. 214.7). Validates the actual Blob size. */
  sizeKB: number
  filename: string
  mimeType: string
  background: BackgroundChoice
}

// ─── State machine ────────────────────────────────────────────────────────────

export type RemoverState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'processing'; phase: ProcessingPhase; progress: number; original: OriginalImage }
  // recompositing: true while a background switch (RECOMPOSITE) is in flight.
  // The result stays visible/mounted the whole time — only the picker and
  // download button are briefly disabled — so switching backgrounds never
  // flickers back to the upload screen.
  | { status: 'done'; original: OriginalImage; result: ProcessedResult; recompositing?: boolean }
  | { status: 'error'; message: string; original?: OriginalImage }

// ─── Drop zone ────────────────────────────────────────────────────────────────

export type DropZoneStatus = 'idle' | 'active' | 'rejected'

export type ValidationError = {
  code: 'file-too-large' | 'invalid-type'
  message: string
}

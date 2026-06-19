import type { CommonError } from '@/content/types'
import type { GoalCategory } from '@/types/registry'
import { examErrors } from './exam'
import { idDocumentErrors } from './id-documents'
import { compressErrors } from './compress'
import { signatureErrors } from './signature'

// ─── Registry map ─────────────────────────────────────────────────────────────

const ERRORS_MAP = new Map<GoalCategory, readonly CommonError[]>([
  ['exam', examErrors],
  ['id-documents', idDocumentErrors],
  ['compress', compressErrors],
  ['signature', signatureErrors],
])

// ─── Lookup ───────────────────────────────────────────────────────────────────

/**
 * Returns the CommonError list for a given goal category.
 * Returns an empty array if no errors are registered for that category.
 * O(1) lookup — safe to call during SSR/static generation.
 */
export function getCommonErrors(category: GoalCategory): readonly CommonError[] {
  return ERRORS_MAP.get(category) ?? []
}

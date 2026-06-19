import type { PresetKey, GoalCategory } from '@/types/registry'

// ─── Requirements ─────────────────────────────────────────────────────────────

/** A single note row shown beneath the spec grid. */
export type RequirementNote = {
  text: string
  /** When true, renders with an amber warning icon. */
  critical?: boolean
}

/**
 * Enrichment data for a preset's official requirements.
 * Base specs (dimensions, format, size) are derived from the preset object.
 * This record adds the human-context that presets don't carry.
 */
export type RequirementsContent = {
  presetKey: PresetKey
  /** Official spec name shown as section eyebrow */
  officialTitle: string
  /** One-sentence context about where/why this spec exists */
  introduction?: string
  /** Required background — "Plain white or off-white" */
  background?: string
  /** Attire note, if applicable */
  attire?: string
  /** Ordered list of additional notes */
  notes?: RequirementNote[]
  /** Name of the official source document */
  officialSource?: string
  /** ISO date string */
  updatedAt: string
}

// ─── Common Errors ────────────────────────────────────────────────────────────

/** A single common error item shown in CommonErrorsSection. */
export type CommonError = {
  id: string
  /** Short title of the error — displayed as the card heading */
  title: string
  /** What the user sees or experiences */
  symptom: string
  /** Step-by-step fix */
  fix: string
}

/** Map from category to its error list. */
export type CategoryErrors = Record<GoalCategory, readonly CommonError[]>

// ─── Guides ──────────────────────────────────────────────────────────────────

export type GuideSection = {
  heading: string
  body: string
}

/** Long-form SEO guide content referenced by goal.primaryGuide. */
export type GuideContent = {
  slug: string
  title: string
  introduction: string
  sections: readonly GuideSection[]
  relatedGoals?: string[]
  updatedAt: string
}

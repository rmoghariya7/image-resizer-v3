/**
 * registry/shared/search-intent.ts
 *
 * Search Intent layer — the semantic heart of Presetly's registry architecture.
 *
 * Every page in Presetly should have a clearly defined search intent.
 * This data powers: metadata generation, indian-seo-writer content guidance,
 * internal linking, recommendations, search autocomplete, analytics, and
 * future AI-powered features.
 *
 * The SearchIntent object is added as an optional field to GoalDefinition,
 * CategoryDefinition, SizeTarget, LearnArticle, and GuideContent. It is the
 * single source of truth for what a page is about from a search perspective.
 *
 * See docs/search-intent.md for contributor guidance.
 */

import { z } from 'zod'

// ─── Search intent type ───────────────────────────────────────────────────────

/**
 * The user's primary motivation when searching for this page.
 *
 * - informational:  User wants to learn. ("how to compress image to 20kb")
 * - transactional:  User wants to do something. ("compress image to 20kb free")
 * - commercial:     User is evaluating options. ("best image compressor for upsc")
 * - navigational:   User wants a specific page. ("presetly upsc photo resizer")
 */
export const SEARCH_INTENT_TYPE_SCHEMA = z.enum([
  'informational',
  'transactional',
  'commercial',
  'navigational',
])

export type SearchIntentType = z.infer<typeof SEARCH_INTENT_TYPE_SCHEMA>

export const SEARCH_INTENT_TYPE_LABELS: Record<SearchIntentType, string> = {
  informational: 'Informational',
  transactional: 'Transactional',
  commercial:    'Commercial',
  navigational:  'Navigational',
}

// ─── Topic clusters ───────────────────────────────────────────────────────────

/**
 * Logical groupings used for internal linking, recommendations, and content strategy.
 *
 * Every page belongs to exactly one topic cluster. The cluster determines which
 * related tools, guides, and articles are recommended alongside a page.
 *
 * Cluster → typical page types:
 * - image-compression:  Compress-under tools, compression learn articles, compress guides
 * - photo-resizing:     General photo resize goals (job application, resume, etc.)
 * - passport-photos:    Passport/visa goal pages + passport guides
 * - signature-tools:    All signature resize goals + signature guides
 * - exam-photos:        UPSC, GPSC, NDA, SSC, IBPS, Railway, Bank, UGC-NET goals
 * - id-documents:       Aadhaar, PAN, Voter ID, Driving Licence goals
 * - image-formats:      JPEG vs PNG, image basics learn articles
 * - learn:              General educational content without a single functional home
 */
export const TOPIC_CLUSTER_SCHEMA = z.enum([
  'image-compression',
  'photo-resizing',
  'passport-photos',
  'signature-tools',
  'exam-photos',
  'id-documents',
  'image-formats',
  'learn',
])

export type TopicCluster = z.infer<typeof TOPIC_CLUSTER_SCHEMA>

export const TOPIC_CLUSTER_LABELS: Record<TopicCluster, string> = {
  'image-compression': 'Image Compression',
  'photo-resizing':    'Photo Resizing',
  'passport-photos':   'Passport Photos',
  'signature-tools':   'Signature Tools',
  'exam-photos':       'Exam Photos',
  'id-documents':      'ID Documents',
  'image-formats':     'Image Formats',
  'learn':             'Learn',
}

// ─── SearchIntent schema ──────────────────────────────────────────────────────

/**
 * Search intent data for a single page.
 *
 * Used by:
 * - Metadata generators (title/description hints)
 * - indian-seo-writer (keyword context for content creation)
 * - Internal linking (topic cluster grouping)
 * - Recommendations engine (cluster-based suggestions)
 * - Search index (weighted matching)
 * - Analytics (intent funnel tracking)
 * - Future: autocomplete, semantic search, AI recommendations
 */
export const searchIntentSchema = z.object({
  /**
   * The single most important query this page should rank for.
   * Write it exactly as users type it — lowercase, no pipes, no brand names.
   *
   * Good: "compress image to 20kb"
   * Bad:  "Compress Image to 20KB | Presetly"
   */
  primaryQuery: z.string().min(3).max(100),

  /**
   * Related searches that this page should also satisfy.
   * Guidance for content and metadata — never repeat these verbatim as a list.
   * 3–8 queries that represent real user language.
   */
  relatedQueries: z.array(z.string().min(3).max(100)).min(3).max(8),

  /**
   * The user's primary motivation when arriving at this page.
   * Choose the strongest single intent.
   */
  intent: SEARCH_INTENT_TYPE_SCHEMA,

  /**
   * The topic cluster this page belongs to.
   * Used for internal linking and related content recommendations.
   * Every page belongs to exactly one cluster.
   */
  topicCluster: TOPIC_CLUSTER_SCHEMA,
})

export type SearchIntent = z.infer<typeof searchIntentSchema>

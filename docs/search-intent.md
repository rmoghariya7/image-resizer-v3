# Search Intent Layer

## Why this exists

Every page in Presetly has a clearly defined purpose from a user's search perspective. The Search Intent layer makes that purpose explicit and machine-readable — stored directly in the registry definition of each page, not in a separate SEO-only config file.

This data is not just for SEO. It powers:

- **Metadata generation** — `lib/metadata/generators.ts` reads `search.primaryQuery` to keep titles and descriptions aligned with real user language
- **Content creation** — when using the `indian-seo-writer` skill, pass the search object so the writer knows the primary query, related queries, and intent before generating copy
- **Internal linking** — `registry/shared/index.ts` groups pages by `topicCluster` for sidebar recommendations and related tools
- **Search index weighting** — `features/search/search-index.ts` can use `primaryQuery` for relevance boosting
- **Analytics** — intent and cluster data flows into funnel-stage reporting (transactional vs informational conversion rates)
- **Future features** — autocomplete, semantic search, AI-powered recommendations all read from this same source

The alternative — a separate keyword registry, a SEO YAML file, or a keyword-map.ts — would create a second source of truth that drifts out of sync with the page definitions it describes. Here, the page is the source of truth.

---

## The SearchIntent object

```typescript
type SearchIntent = {
  primaryQuery:   string        // The single query this page should rank for
  relatedQueries: string[]      // 3–8 related user searches
  intent:         SearchIntentType
  topicCluster:   TopicCluster
}
```

It lives as an optional field (`search?`) on:

| Type | File |
|---|---|
| `GoalDefinition` | `registry/goals/schema.ts` |
| `CategoryDefinition` | `registry/categories/schema.ts` |
| `SizeTarget` | `registry/size-presets/index.ts` |
| `LearnArticle` | `registry/learn/schema.ts` |
| `GuideContent` | `content/types.ts` |

Optional means existing definitions without a `search` field continue to work. New definitions should always include one.

---

## Search intent types

Choose the intent that best describes **why a user ends up on this page**.

| Intent | User motivation | Example query | Example page |
|---|---|---|---|
| `transactional` | User wants to complete a task | "compress image to 20kb" | `/compress-image-under-20kb` |
| `informational` | User wants to learn | "how does image compression work" | `/learn/image-compression-explained` |
| `commercial` | User is evaluating options | "best image compressor for upsc" | `/categories/compress` |
| `navigational` | User wants a specific page | "presetly upsc photo resizer" | `/upsc-photo-resizer` |

**When in doubt:** tool pages are almost always `transactional`. Learn articles are almost always `informational`. Category landing pages are usually `commercial`. Only use `navigational` for pages that are primarily destination pages for branded searches.

---

## Topic clusters

Every page belongs to exactly one topic cluster. The cluster determines which other pages are recommended alongside it.

| Cluster | Typical pages |
|---|---|
| `image-compression` | Compress-under tools, compress goal pages, compression guides, compression learn articles |
| `exam-photos` | UPSC, GPSC, NDA, SSC, IBPS, Railway, Bank, UGC-NET goal pages |
| `id-documents` | Aadhaar, PAN, Passport, Voter ID, Driving Licence, Visa goal pages |
| `passport-photos` | Passport photo maker, visa photo, passport photo guides |
| `signature-tools` | All signature resize goals, signature guides |
| `photo-resizing` | General photo resize goals (job application, resume, etc.) |
| `image-formats` | JPEG vs PNG, image basics, format conversion articles |
| `learn` | General educational content without a single functional home |

**Matching examples:**
- UPSC photo resizer → `exam-photos` (user wants to prepare for an exam)
- Compress image to 50KB → `image-compression` (user has a file size problem)
- Passport photo maker → `id-documents` (user is applying for a document)
- Image compression explained → `image-compression` (supporting article for compress tools)
- JPEG vs PNG → `image-formats` (general image knowledge)

---

## How to choose a primaryQuery

The primary query is the single most important phrase you want the page to rank for. Write it as a user would type it.

**Rules:**
- Lowercase only
- No brand names (`presetly`, `uidai`, etc.)
- No pipes, dashes, or title formatting
- Specific enough to describe this exact page, not a category
- 3–8 words is the sweet spot

**Good examples:**
```
compress image to 20kb
upsc photo resizer
passport photo guide india
image compression explained
```

**Bad examples:**
```
Compress Image to 20KB | Presetly     ← title case and brand name
image                                  ← too broad
compress                               ← too broad
compress image to exactly 20 kilobytes for upsc portal requirements  ← too long
```

---

## How to choose relatedQueries

These are the secondary queries the page should also satisfy. Think of them as the full range of ways a user might phrase the same need.

**Rules:**
- 3–8 queries per page
- Write them as real users type them
- Include variations: synonyms, longer tails, portal-specific phrasing
- Do not repeat the primaryQuery verbatim
- Never use these to keyword-stuff content — they are guidance only

**Example for `compress-image-under-20kb`:**
```typescript
relatedQueries: [
  'reduce image size to 20kb',
  'compress photo to 20kb',
  'make image 20kb',
  'upsc signature 20kb',
  'shrink image to 20kb',
]
```

**Example for `upsc-photo-resizer`:**
```typescript
relatedQueries: [
  'upsc photo size pixels',
  'upsc exam photo resize',
  'upsc application photo 413x531',
  'ias photo requirements',
  'upsc photo under 300kb',
]
```

---

## Adding search data to a new page

When creating a new goal, category, size target, learn article, or guide, add a `search` block before the closing of the object:

```typescript
// registry/goals/exam/new-exam.ts
export const newExamGoal = {
  slug:  'new-exam-photo-resizer',
  title: 'New Exam Photo Resizer',
  // ... other fields ...

  search: {
    primaryQuery:   'new exam photo resizer',
    relatedQueries: [
      'new exam photo size',
      'new exam application photo dimensions',
      'new exam portal photo requirements',
      'photo resize new exam online',
    ],
    intent:       'transactional',
    topicCluster: 'exam-photos',
  },

  status:    'active',
  priority:  'medium',
  updatedAt: '2026-07-01',
} satisfies GoalDefinition
```

---

## Using search data with indian-seo-writer

When writing content with the `/indian-seo-writer` skill, include the page's search context:

```
Write the meta description for the UPSC photo resizer page.

Search context:
- primaryQuery: "upsc photo resizer"
- relatedQueries: ["upsc photo size pixels", "upsc exam photo resize", "upsc application photo 413x531"]
- intent: transactional
- topicCluster: exam-photos

The description should be 140–155 characters, reflect the transactional intent, 
and include the primary query naturally.
```

The writer will use these queries as guidance — the output should read naturally and never repeat the queries mechanically.

---

## How topic clusters power internal linking

The `registry/shared/index.ts` helpers let any component query related pages by cluster:

```typescript
import { getRelatedByCluster } from '@/registry/shared'

// In a goal page component:
const relatedPages = getRelatedByCluster('upsc-photo-resizer', 6)
// Returns up to 6 other exam-photos pages (GPSC, NDA, SSC, etc.)
```

The full API:

```typescript
// All pages in a cluster
getItemsByTopicCluster('exam-photos')

// All transactional pages
getItemsByIntent('transactional')

// Pages related to a specific slug (same cluster, excludes self)
getRelatedByCluster('compress-image-under-20kb', 4)

// Autocomplete candidates matching a query string
getItemsByQuery('upsc photo', 5)
```

---

## Migration report

**What changed:**

| File | Change |
|---|---|
| `registry/shared/search-intent.ts` | New file — SearchIntent type, SearchIntentType enum, TopicCluster enum, Zod schema |
| `registry/shared/index.ts` | New file — cross-registry aggregation and filtering helpers |
| `registry/goals/schema.ts` | Added `search?: SearchIntent` to `goalDefinitionSchema` |
| `registry/categories/schema.ts` | Added `search?: SearchIntent` to `categoryDefinitionSchema` |
| `registry/learn/schema.ts` | Added `search?: SearchIntent` to `learnArticleSchema` |
| `registry/size-presets/index.ts` | Added `readonly search?: SearchIntent` to `SizeTarget` type |
| `content/types.ts` | Added `search?: SearchIntent` to `GuideContent` type |
| `lib/metadata/generators.ts` | Added `getSearchHints()` helper; generators now emit `search:primaryQuery` and `search:cluster` in `other` metadata for analytics tooling |
| `registry/categories/definitions.ts` | Added `search` to all 4 category definitions |
| `registry/size-presets/index.ts` | Added `search` to all 12 SizeTarget definitions |
| `registry/goals/exam/*.ts` | Added `search` to all 8 exam goal definitions |
| `registry/goals/id-documents/*.ts` | Added `search` to all 8 ID document goal definitions |
| `registry/goals/signature/*.ts` | Added `search` to all 4 signature goal definitions |
| `registry/goals/compress/*.ts` | Added `search` to all 3 compress goal definitions |
| `registry/learn/articles/*.ts` | Added `search` to all 10 learn article definitions |

**What did not change:**
- All existing fields remain exactly as-is — the `search` field is additive and optional
- Metadata output is identical for all pages that lack a `search` field
- All existing routes, components, sitemap, and llms.txt continue to work without modification
- No new routes were introduced
- TypeScript compilation: zero errors (`tsc --noEmit --skipLibCheck`)

---

## Non-goals

- This is **not** a keyword registry. Do not add a `keywords` field to `SearchIntent` — the existing `keywords` arrays on each definition serve that purpose.
- This is **not** the `<meta name="keywords">` tag. We never emit that tag. Google ignores it.
- This is **not** a replacement for the existing `description`, `seoTitle`, `ogDescription` fields. Those fields define the actual content. `SearchIntent` defines the search context.

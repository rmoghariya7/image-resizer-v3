# Production Readiness Audit — Presetly

**Date:** 2026-07-01  
**Auditor:** Claude (Anthropic)  
**Scope:** Build health, Routing, SEO, Security, Performance, Accessibility, Mobile UX, Deployment  
**Instruction:** Do not add new features. Do not redesign the UI. Do not change the architecture unless a critical issue is found.

---

## Overall Score: 76 / 100

The codebase is well-architected, TypeScript-clean, and thoughtfully structured. Two critical issues must be resolved before deploying. Once fixed, the platform is deployable with high confidence.

---

## Critical Issues — Must Fix Before Deployment

### 1. Duplicate compress route directories (Routing)

**File:** `app/(compress)/`

Two directories exist for the same logical route:
- `app/(compress)/compress-image-under-[size]/` (old, single-segment)
- `app/(compress)/compress-image-under/[size]/` (new, canonical)

The rewrite in `next.config.ts` maps `/compress-image-under-:size` → `/compress-image-under/:size`, routing all traffic to the new directory. But the old directory still exists. Next.js file-system routing sees both, which creates a structural conflict — build output may include both route trees, and the old pages can be reached at unexpected paths.

**Fix:** Delete `app/(compress)/compress-image-under-[size]/` entirely.

```bash
rm -rf "app/(compress)/compress-image-under-[size]"
```

Verify with `next build` that the compress pages still resolve correctly via the rewrite.

---

### 2. No Content-Security-Policy header (Security)

**File:** `next.config.ts`

The `securityHeaders` array defines X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, and Permissions-Policy — but has no `Content-Security-Policy`. CSP is the primary defence against XSS and data exfiltration. A production site without it fails the OWASP A05:2021 Security Misconfiguration check.

**Fix:** Add a CSP header to `next.config.ts`. A working starting point for this stack (Next.js with Geist fonts from Google, no third-party scripts, canvas-based image processing using blob URLs):

```typescript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",   // unsafe-eval needed by Next.js dev; remove in prod if possible
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",                         // blob: needed for canvas output preview
    "connect-src 'self'",
    "frame-ancestors 'none'",                             // stronger than X-Frame-Options
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
},
```

Note: `'unsafe-inline'` on `script-src` is required by Next.js's inline hydration scripts. If you add a strict `nonce`-based CSP later, you can remove it. Start with this and tighten over time.

---

## High-Priority — Fix Before First Indexed Traffic

### 3. Footer links point to noindex/redirect slugs (SEO)

**File:** `app/_components/SiteFooter.tsx`

Footer compress links use `/compress-image-to-*` slugs (which are set to `robots: index: false` and canonicalised to `/compress-image-under-*`). This wastes internal link equity. Footer links should always point to canonical URLs.

**Fix:** Update all compress links in SiteFooter from `/compress-image-to-*` to `/compress-image-under-*`.

---

### 4. Open Graph and Twitter metadata missing `images` array (SEO)

**Files:** `lib/metadata/generators.ts`, `app/layout.tsx`

The root `metadata` and all generator functions define `openGraph` and `twitter` objects but none include an `images` array. Without this, social platforms (Twitter/X, Facebook, LinkedIn, WhatsApp) may not find the OG image or may pick a random image from the page.

The project has `app/opengraph-image.tsx` (and likely per-route equivalents). Next.js auto-generates `/opengraph-image` URLs for these. Wire them up:

```typescript
// In root layout metadata:
openGraph: {
  ...existing,
  images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
},
twitter: {
  ...existing,
  images: ['/opengraph-image'],
},
```

Add the same to `generateGoalMetadata`, `generateCategoryMetadata`, `generateCompressMetadata`, and `generateLearnMetadata`, using the `canonical` URL base to construct the path.

---

### 5. `buildSearchIndex()` called on every server request (Performance)

**File:** `app/layout.tsx`, line 59

```typescript
const searchIndex = buildSearchIndex()
```

This runs inside `RootLayout`, which is called on every SSR request. The search index is derived entirely from static registry data — it never changes at runtime. Calling it per-request wastes CPU on every page load.

**Fix:** Move it to module scope so it runs once at startup:

```typescript
// Outside RootLayout, at module level:
const searchIndex = buildSearchIndex()

export default function RootLayout(...) {
  // searchIndex already computed
}
```

---

### 6. No `.env.example` file (Developer Experience / Deployment)

The codebase reads `process.env.NEXT_PUBLIC_BASE_URL` in multiple places (layout.tsx, metadata generators). There is no `.env.example` documenting this or other environment variables.

**Fix:** Create `.env.example`:

```bash
# Required — the canonical base URL for this deployment
NEXT_PUBLIC_BASE_URL=https://presetly.app

# Optional — PostHog analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Optional — Sentry error monitoring
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
```

---

### 7. `keywords` in root layout metadata (SEO — Minor waste)

**File:** `app/layout.tsx`, lines 28–38

The root `metadata` exports a `keywords` array. Google has ignored `<meta name="keywords">` since 2009. Other search engines that still read it (Bing, Yandex) weigh it negligibly and some use it as a spam signal if overused. The metadata generators correctly omit `keywords` — the root layout should too.

**Fix:** Remove the `keywords` field from the `metadata` export in `app/layout.tsx`.

---

## Nice-to-Have — Post-Launch Improvements

### 8. Inconsistent layout in `(goals)` route group

**File:** `app/(goals)/layout.tsx`

The goals route group uses a different `<SiteHeader>` variant than the other route groups. This is not a bug (it works) but creates a visual inconsistency that may confuse users navigating between goal pages and other pages.

**Recommendation:** Audit whether the difference is intentional. If not, unify to the shared header.

---

### 9. Missing `focus-visible` on some navigation Link components

**Files:** Category page links, footer links

Some interactive `<Link>` components have `hover:` states but no `focus-visible:` styles. Keyboard-only users and screen reader users may not see a clear focus indicator.

**Fix:** Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary` (or your design system equivalent) to any Link that currently only has `hover:` state.

---

### 10. No `loading="lazy"` on below-fold images

Several homepage sections render images that are not visible in the initial viewport. These load eagerly, adding to initial page weight.

**Fix:** Add `loading="lazy"` to `<img>` elements in sections that appear below the fold (learn section, internal links section, footer).

---

### 11. ResultPanel image preview uses fixed height

**File:** `features/image-resizer/components/ResultPanel.tsx`

Preview images use `h-44 sm:h-52` (fixed 176px / 208px). On very small screens (iPhone SE at 375px or older 320px devices), this can crop portrait images noticeably.

**Fix:** Change to `max-h-44 sm:max-h-52 w-full object-contain` so the container shrinks to fit rather than cropping.

---

### 12. No `security.txt`

No `/.well-known/security.txt` exists for responsible vulnerability disclosure. Not required, but expected by security researchers and enterprise clients.

**Fix:** Create `public/.well-known/security.txt`:

```
Contact: mailto:security@presetly.app
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: en
```

---

### 13. Bundle analysis not tracked

No `@next/bundle-analyzer` integration. The largest chunk is ~290 KB — not alarming, but without tracking, regressions go unnoticed.

**Recommendation:** Add `ANALYZE=true next build` capability via `@next/bundle-analyzer` as a dev dependency. Run it before each major release.

---

## Audit Findings by Area

| Area | Score | Status |
|---|---|---|
| TypeScript | 10/10 | Clean — zero errors (`tsc --noEmit --skipLibCheck`) |
| Routing | 6/10 | Duplicate compress route directory is a structural risk |
| SEO | 8/10 | Excellent structured data, canonicals, sitemap; OG images not wired |
| Security | 6/10 | 5 of 6 standard headers present; CSP missing entirely |
| Performance | 8/10 | SSG throughout; search index rebuilt per-request |
| Accessibility | 8/10 | Strong baseline; some link focus states incomplete |
| Mobile UX | 9/10 | Excellent responsive design; minor fixed-height issue |
| Code Quality | 10/10 | No `console.log`, no `any`, consistent patterns throughout |
| Deployment | 7/10 | No `.env.example`; stale route directory |

---

## Fix Priority Order

For a clean first deployment, fix in this sequence:

1. **Delete** `app/(compress)/compress-image-under-[size]/` — eliminates routing ambiguity
2. **Add CSP header** to `next.config.ts` — closes the primary security gap
3. **Fix footer links** from `/compress-image-to-*` → `/compress-image-under-*` — stops internal link equity going to noindex pages
4. **Add OG `images` array** to metadata generators and root layout — enables social preview cards
5. **Move `buildSearchIndex()`** to module scope — one-line perf fix
6. **Create `.env.example`** — required for any other engineer to set up the project

Items 7–13 can be addressed post-launch without affecting indexing or stability.

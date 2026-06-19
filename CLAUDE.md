# Project: Presetly

## Vision

Presetly is a goal-first document preparation platform.

Users should never need to understand:

- Width
- Height
- DPI
- Compression ratios
- File formats
- Image quality percentages

Users should simply choose a goal.

Examples:

- UPSC Photo Resizer
- GPSC Photo Resizer
- Aadhaar Photo Resizer
- PAN Card Photo Resizer
- Passport Photo Maker
- Compress Image To 50KB
- Compress Image To 100KB
- Signature Resize To 20KB

The platform automatically configures all technical settings.

---

# Core Philosophy

Goal → Upload → Download

Maximum 3 user actions.

Never expose technical controls first.

Bad UX:

Width: **
Height: **
Quality: \_\_

Good UX:

What are you trying to do?

○ UPSC Application
○ GPSC Application
○ Aadhaar Update
○ PAN Card
○ Passport Photo
○ Compress To 50KB

The system should configure everything automatically.

---

# Product Goals

1. Fastest document preparation platform.
2. Best mobile experience.
3. SEO-first architecture.
4. Privacy-first processing.
5. Browser-based processing.
6. Extremely simple workflows.
7. Production-grade code quality.

---

# Technology Stack

Framework:

- Next.js App Router
- React
- TypeScript

UI:

- Tailwind CSS
- shadcn/ui
- Radix UI

State:

- Zustand

Validation:

- Zod

Forms:

- React Hook Form

Animations:

- Framer Motion

Analytics:

- PostHog

Monitoring:

- Sentry

Testing:

- Vitest
- Playwright

Deployment:

- Vercel

---

# Design Principles

Inspired by:

- Linear
- Stripe
- Vercel
- Notion
- Arc Browser

Requirements:

- Clean
- Modern
- Minimal
- Mobile-first
- Accessible

Avoid:

- Clutter
- Giant forms
- Excessive settings
- Old utility website aesthetics

---

# Architecture Rules

Use feature-based architecture.

Every feature must be self-contained.

Example:

src/features/image-resizer
src/features/pdf-compressor
src/features/passport-photo

Avoid shared business logic duplication.

Prefer composition over inheritance.

Use strict TypeScript.

Never use any.

---

# Goal Registry System

All goal pages must be generated from configuration.

Example:

{
slug: "upsc-photo-resizer",
title: "UPSC Photo Resizer",
category: "exam",
preset: "upsc"
}

No manually created pages.

Everything should be data-driven.

---

# Content Writing Rules

Before blog or content writing get the keywords from `keyword-research` skill and then write all content with those keywords and for the writing pattern use `indian-seo-writer`

---

# SEO Rules

Every goal must have:

- Unique title
- Unique description
- Structured data
- Canonical URL
- OpenGraph tags

Support thousands of generated pages.

Examples:

/goals/upsc-photo-resizer
/goals/gpsc-photo-resizer
/goals/aadhaar-photo-resizer
/goals/passport-photo-maker

---

# Performance Rules

Target Lighthouse:

Performance: 95+
Accessibility: 100
Best Practices: 100
SEO: 100

Use:

- Server Components by default
- Dynamic imports
- Lazy loading
- Web Workers for heavy processing

---

# Mobile Rules

Mobile-first design.

Support:

- 320px
- 375px
- 390px
- 414px

Touch-friendly controls.

Sticky bottom actions where appropriate.

---

# Accessibility Rules

Keyboard navigation.

Screen reader support.

Proper focus states.

ARIA labels.

Reduced motion support.

---

# Revenue Strategy

Phase 1:

- Organic SEO traffic
- AdSense

Phase 2:

- Premium plan
- Batch processing
- History
- Saved presets

Phase 3:

- API access
- Browser extension
- Desktop application

---

# Non-Negotiables

Always use shadcn/ui components before creating custom components.

Always optimize for simplicity.

Always prioritize user goals over technical controls.

Always think in terms of scalable SEO.

Always generate production-grade code.

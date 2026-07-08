import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGoal } from '@/registry/goals'
import { getImagePreset } from '@/registry/presets'
import { getResizePresetsByCategory } from '@/registry/resize-presets'
import {
  buildGoalHref,
  getImageResizerResultRecommendations,
} from '@/lib/recommendations/engine'
import type { GoalDefinition } from '@/types/registry'
import { ResizerToolSection } from './_components/ResizerToolSection'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'
const CANONICAL_URL = `${BASE_URL}/image-resizer`

// ─── Metadata ─────────────────────────────────────────────────────────────────

const PAGE_TITLE = 'Image Resizer - Resize Images Online Free | Presetly'
const PAGE_DESCRIPTION =
  'Resize JPG, PNG and WEBP images to any dimensions directly in your browser without uploading to a server.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      'Resize any image to exact pixel dimensions, by percentage, or with presets for Instagram, YouTube, passport photos, and favicons. Browser-based, free, no upload.',
    url: CANONICAL_URL,
    type: 'website',
    siteName: 'Presetly',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        type: 'image/png' as const,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Resizer — resize images online free | Presetly',
    description:
      'Resize JPG, PNG, WEBP to any dimensions in your browser. Presets for Instagram, YouTube, passport, favicons. Free, no upload.',
    images: [`${BASE_URL}/opengraph-image`],
  },
}

// ─── Page content data ────────────────────────────────────────────────────────

const QUICK_STEPS = [
  {
    title: 'Upload your image',
    body: 'Drop a JPEG, PNG, or WebP image onto the upload area, click to browse, or paste from your clipboard. Camera capture works on mobile.',
  },
  {
    title: 'Set your dimensions',
    body: 'Type exact width and height in pixels, scale by percentage, or tap a preset — Instagram, YouTube, passport photo, favicon, and more.',
  },
  {
    title: 'Download the resized image',
    body: 'Pick PNG, JPEG, or WEBP output and download instantly. Everything runs in your browser — nothing is uploaded to any server.',
  },
]

const FAQS = [
  {
    question: 'How do I resize an image without losing quality?',
    answer:
      'Shrinking an image (downscaling) keeps it sharp — reducing pixels rarely produces visible quality loss. Enlarging beyond the original size is where quality suffers, because new pixels have to be invented. The tool warns you whenever your target size is larger than the original. For JPEG and WEBP output, keep the quality slider at 80–95% for the best balance of sharpness and file size.',
  },
  {
    question: 'What is the difference between resizing and compressing an image?',
    answer:
      'Resizing changes the pixel dimensions of an image — for example 4000 × 3000 down to 1920 × 1440. Compressing reduces the file size in KB or MB without necessarily changing dimensions. If a portal asks for "under 50 KB", you need compression; if it asks for "413 × 531 pixels", you need resizing. Presetly has dedicated tools for both.',
  },
  {
    question: 'What do the Stretch, Fit, and Fill modes mean?',
    answer:
      'Fit scales your image to fit inside the target dimensions while keeping its proportions — nothing is cropped or distorted. Fill produces exactly the target dimensions by cropping the edges that do not fit. Stretch forces the image to the exact target dimensions, which distorts it when the aspect ratio differs. Fit is the safe default; Fill is best for social media covers; Stretch only when you genuinely need exact dimensions regardless of distortion.',
  },
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. All resizing happens locally in your browser using a Web Worker and the Canvas API. Your image never leaves your device — nothing is uploaded, stored, or logged. This also makes the tool fast: there is no upload or download wait.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'You can upload JPEG, PNG, and WebP files up to 20 MB, and export to any of the three formats. PNG output is lossless; JPEG and WEBP offer a quality slider. Transparent PNG areas are filled with white when exporting to JPEG, since JPEG has no transparency support.',
  },
  {
    question: 'Can I resize an image for Instagram, YouTube, or a passport photo?',
    answer:
      'Yes. The preset picker includes Instagram post, portrait, and story sizes, YouTube thumbnails (1280 × 720), Facebook covers, LinkedIn banners, TikTok, favicons from 16 × 16 to 1024 × 1024, plus Indian government document sizes like UPSC (413 × 531) and Passport (413 × 531 at 3.5 × 4.5 cm). One tap fills in the exact dimensions.',
  },
  {
    question: 'Is this image resizer completely free?',
    answer:
      'Yes — 100% free with no sign-up, no watermarks, and no daily limits. It works on any device with a modern browser, including phones.',
  },
]

// Standard dimensions shown in the "Common image dimensions" table.
const COMMON_DIMENSIONS = [
  { label: 'HD (720p)', dims: '1280 × 720', use: 'Web videos, blog headers, presentations' },
  { label: 'Full HD (1080p)', dims: '1920 × 1080', use: 'Desktop wallpapers, YouTube videos, screens' },
  { label: '2K (1440p)', dims: '2560 × 1440', use: 'High-resolution monitors, detailed artwork' },
  { label: '4K (2160p)', dims: '3840 × 2160', use: 'UHD displays, print-quality exports' },
  { label: 'Square thumbnail', dims: '512 × 512', use: 'App icons, profile pictures, avatars' },
  { label: 'Favicon', dims: '32 × 32', use: 'Browser tab icons, bookmark icons' },
]

// Government table rows — dimensions come from the image-preset registry so
// this table can never drift from what the dedicated tools actually produce.
const GOVERNMENT_TOOL_SLUGS = [
  'upsc-photo-resizer',
  'gpsc-photo-resizer',
  'ssc-photo-resizer',
  'passport-photo-maker',
  'aadhaar-photo-resizer',
  'pan-card-photo-resizer',
  'signature-resize-20kb',
] as const

function getGovernmentRows() {
  return GOVERNMENT_TOOL_SLUGS
    .map(slug => {
      const goal = getGoal(slug)
      if (!goal) return null
      try {
        const preset = getImagePreset(goal.preset)
        return { goal, preset }
      } catch {
        return null
      }
    })
    .filter((row): row is { goal: GoalDefinition; preset: ReturnType<typeof getImagePreset> } => row !== null)
}

// Contextual related tools — the outbound links this page must carry.
const RELATED_TOOL_SLUGS = [
  'compress-image-to-50kb',
  'compress-image-to-100kb',
  'passport-photo-maker',
  'upsc-photo-resizer',
  'signature-resize-20kb',
] as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ImageResizerPage() {
  const recommendations = getImageResizerResultRecommendations()
  const governmentRows = getGovernmentRows()
  const socialPresets = getResizePresetsByCategory('social')
  const relatedTools = RELATED_TOOL_SLUGS
    .map(slug => getGoal(slug))
    .filter((g): g is GoalDefinition => g !== undefined)

  // ─── Structured data ──────────────────────────────────────────────────────

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Image Resizer', item: CANONICAL_URL },
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Presetly Image Resizer',
    description: PAGE_DESCRIPTION,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with Canvas API support',
    url: CANONICAL_URL,
    featureList: [
      'Resize images to exact pixel dimensions with aspect ratio lock',
      'Scale by percentage — 25% to 200%',
      'Stretch, Fit, and Fill resize modes',
      'Presets for Instagram, YouTube, Facebook, LinkedIn, TikTok, favicons, and Indian government documents',
      'Output to PNG, JPEG, or WEBP with quality control',
      'Browser-based processing — no server upload, fully private',
      'Free to use — no sign-up required',
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@type': 'Organization', name: 'Presetly', url: BASE_URL },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to resize an image online',
    description: PAGE_DESCRIPTION,
    step: QUICK_STEPS.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.body,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article>
        {/* ── Page header ─────────────────────────────────────────────────── */}
        <header className="border-b border-border/50 bg-linear-to-b from-background to-muted/30 px-4 py-5 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Free · No upload · Browser-based
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Image Resizer
            </h1>
            <p className="sr-only sm:not-sr-only sm:block sm:mx-auto sm:mt-4 sm:max-w-xl sm:text-lg sm:leading-8 sm:text-muted-foreground">
              Resize JPG, PNG, and WEBP images to any dimensions — by pixels,
              percentage, or one-tap presets. Everything runs in your browser.
            </p>
          </div>
        </header>

        {/* ── Tool ────────────────────────────────────────────────────────── */}
        <ResizerToolSection recommendations={recommendations} />

        {/* ── Quick steps ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="steps-heading"
          className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Quick start
              </p>
              <h2
                id="steps-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-foreground"
              >
                Done in {QUICK_STEPS.length} steps
              </h2>
            </div>
            <ol
              className="grid grid-cols-1 gap-6 sm:grid-cols-3"
              role="list"
              aria-label="Step-by-step workflow"
            >
              {QUICK_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── How image resizing works ────────────────────────────────────── */}
        <section
          aria-labelledby="how-heading"
          className="bg-background px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Understanding the basics
            </p>
            <h2
              id="how-heading"
              className="mt-1 text-xl font-semibold tracking-tight text-foreground"
            >
              How image resizing works
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Every digital image is a grid of pixels. Resizing changes how many
                pixels the grid contains — a 4000 × 3000 photo from your phone has
                12 million pixels, while a 1920 × 1080 desktop wallpaper needs just
                2 million. When you shrink an image, the browser samples groups of
                original pixels into each new pixel, which is why downscaled images
                stay sharp.
              </p>
              <p>
                Enlarging works the other way: the browser has to invent new pixels
                by interpolating between existing ones, so an image scaled far
                beyond its original size looks soft or blocky. That is why this
                tool warns you before upscaling.
              </p>
              <p>
                When the target shape differs from the original — say a square photo
                going to a 16:9 thumbnail — something has to give. <strong className="font-semibold text-foreground">Fit</strong>{' '}
                keeps the whole image and simply stops at the smaller edge,{' '}
                <strong className="font-semibold text-foreground">Fill</strong> crops
                the overflow to hit the exact size, and{' '}
                <strong className="font-semibold text-foreground">Stretch</strong>{' '}
                distorts the image to force it. Presetly processes all of this with
                the Canvas API inside a Web Worker, so even large photos resize in
                under a second without freezing the page.
              </p>
            </div>
          </div>
        </section>

        {/* ── Resize vs compress ──────────────────────────────────────────── */}
        <section
          aria-labelledby="vs-heading"
          className="bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Two different jobs
            </p>
            <h2
              id="vs-heading"
              className="mt-1 text-xl font-semibold tracking-tight text-foreground"
            >
              Resize vs. compress — which one do you need?
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                <strong className="font-semibold text-foreground">Resizing changes dimensions</strong> —
                the width and height in pixels. Use it when a form or platform asks
                for a specific size like &ldquo;1080 × 1080&rdquo; or &ldquo;413 × 531 pixels&rdquo;.
              </p>
              <p>
                <strong className="font-semibold text-foreground">Compressing changes file size</strong> —
                the KB or MB the file occupies. Use it when an upload field says
                &ldquo;maximum 50 KB&rdquo; or &ldquo;under 1 MB&rdquo;. Resizing usually reduces file
                size as a side effect, but it cannot hit an exact byte target — for
                that, use a dedicated tool like{' '}
                <Link href="/compress-image-under-50kb" className="font-medium text-primary underline-offset-4 hover:underline">
                  Compress Image Under 50KB
                </Link>{' '}
                or{' '}
                <Link href="/compress-image-under-100kb" className="font-medium text-primary underline-offset-4 hover:underline">
                  Compress Image Under 100KB
                </Link>
                , which find the best quality that fits your limit automatically.
              </p>
              <p>
                Many government portals need both: exact dimensions <em>and</em> a
                file-size cap. Resize here first, then run the result through the{' '}
                <Link href="/categories/compress" className="font-medium text-primary underline-offset-4 hover:underline">
                  compression tools
                </Link>
                {' '}— or use a dedicated document preset like the{' '}
                <Link href="/upsc-photo-resizer" className="font-medium text-primary underline-offset-4 hover:underline">
                  UPSC Photo Resizer
                </Link>
                , which applies both requirements in one step.
              </p>
            </div>
          </div>
        </section>

        {/* ── Common dimensions ───────────────────────────────────────────── */}
        <section
          aria-labelledby="dimensions-heading"
          className="bg-background px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Reference
            </p>
            <h2
              id="dimensions-heading"
              className="mt-1 text-xl font-semibold tracking-tight text-foreground"
            >
              Common image dimensions
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Pixels</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Typical use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COMMON_DIMENSIONS.map(row => (
                    <tr key={row.label}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.dims}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Social media sizes (registry-driven) ────────────────────────── */}
        <section
          aria-labelledby="social-heading"
          className="bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Social media
            </p>
            <h2
              id="social-heading"
              className="mt-1 text-xl font-semibold tracking-tight text-foreground"
            >
              Social media image sizes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every size below is available as a one-tap preset in the tool above.
            </p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Platform</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Pixels</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {socialPresets.map(preset => (
                    <tr key={preset.id}>
                      <td className="px-4 py-3 font-medium text-foreground">{preset.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {preset.width} × {preset.height}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{preset.hint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Government photo sizes (registry-driven, links to goal pages) ── */}
        <section
          aria-labelledby="government-heading"
          className="bg-background px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Indian government portals
            </p>
            <h2
              id="government-heading"
              className="mt-1 text-xl font-semibold tracking-tight text-foreground"
            >
              Government photo sizes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For portal uploads with a file-size cap as well, use the dedicated
              tool — it applies dimensions, format, and size limit in one step.
            </p>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Document</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Pixels</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">Max size</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                      <span className="sr-only">Dedicated tool</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {governmentRows.map(({ goal, preset }) => (
                    <tr key={goal.slug}>
                      <td className="px-4 py-3 font-medium text-foreground">{goal.shortTitle}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {preset.widthPx} × {preset.heightPx}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {preset.displayMaxSize ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={buildGoalHref(goal)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          Open tool
                          <ArrowRight size={11} aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ (server-rendered, crawlable) ────────────────────────────── */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                FAQ
              </p>
              <h2
                id="faq-heading"
                className="mt-1 text-xl font-semibold tracking-tight text-foreground"
              >
                Frequently asked questions
              </h2>
            </div>
            <dl className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
              {FAQS.map(faq => (
                <details key={faq.question} className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                    <dt>{faq.question}</dt>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Related tools ───────────────────────────────────────────────── */}
        {relatedTools.length > 0 && (
          <section
            aria-labelledby="related-tools-heading"
            className="border-t border-border bg-muted/20 px-4 py-12 sm:px-6 sm:py-16"
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Keep going
                </p>
                <h2
                  id="related-tools-heading"
                  className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                >
                  Related tools
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hit a file-size limit or need a portal-ready document photo?
                  These tools handle the specs automatically.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {relatedTools.map(goal => (
                  <li key={goal.slug}>
                    <Link
                      href={buildGoalHref(goal)}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="block text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {goal.title}
                      </span>
                      <span className="mt-1 block flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {goal.description}
                      </span>
                      <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                        Use tool
                        <ArrowRight
                          size={10}
                          className="transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  )
}

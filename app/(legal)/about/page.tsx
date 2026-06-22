import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

export const metadata: Metadata = {
  title: 'About Presetly — Free Image Resizer for Indian Government Documents',
  description:
    'Presetly is a free browser-based tool that resizes and compresses photos for Indian government portals — UPSC, Aadhaar, PAN card, Passport, and more. No uploads. No sign-up.',
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: 'About Presetly',
    description:
      'Free browser-based image resizer for Indian government portal applications. No uploads, no sign-up, completely private.',
    url: `${BASE_URL}/about`,
    type: 'website',
    siteName: 'Presetly',
  },
}

const TOOLS = [
  { label: 'UPSC Photo Resizer', href: '/goals/upsc-photo-resizer' },
  { label: 'Aadhaar Photo Resizer', href: '/goals/aadhaar-photo-resizer' },
  { label: 'PAN Card Photo Resizer', href: '/goals/pan-card-photo-resizer' },
  { label: 'Passport Photo Maker', href: '/goals/passport-photo-maker' },
  { label: 'Compress Image to 50 KB', href: '/goals/compress-image-to-50kb' },
  { label: 'Signature Resize to 20 KB', href: '/goals/signature-resize-20kb' },
]

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">

      {/* Header */}
      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
          About
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Presetly
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A free browser-based tool that prepares photos and signature images
          for Indian government portal applications — without uploading anything
          to a server.
        </p>
      </header>

      <div className="prose prose-gray max-w-none space-y-10 text-foreground">

        {/* Mission */}
        <section aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Why Presetly exists
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Indian government portal applications — UPSC, Aadhaar, PAN card,
            Passport, Voter ID, NDA — require photos and signature images in
            very specific formats. The dimensions, file size, and format must
            match exactly, or the upload is rejected.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Getting this right used to mean hunting for software, guessing at
            settings, or paying for a service. Presetly removes all of that.
            Tell it your goal — the portal you are applying to — and it
            automatically applies the correct width, height, compression, and
            format. One click. Done.
          </p>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-xl font-semibold tracking-tight text-foreground">
            How it works
          </h2>
          <ol className="mt-4 space-y-3">
            {[
              { step: '1', text: 'Choose your goal — the portal or document you are applying to.' },
              { step: '2', text: 'Upload your image. It never leaves your device.' },
              { step: '3', text: 'Download the correctly sized and compressed file.' },
            ].map(({ step, text }) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step}
                </span>
                <p className="pt-0.5 text-base leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            All image processing happens in your browser using the Web Canvas
            API. No image data is transmitted to any server.
          </p>
        </section>

        {/* Privacy */}
        <section aria-labelledby="privacy-heading" className="rounded-xl border border-border bg-muted/30 p-6">
          <h2 id="privacy-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Privacy by design
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Your photos are sensitive. We process everything locally in your
            browser. No accounts, no uploads, no servers. Your images are
            loaded into browser memory, transformed, and handed back — they
            never travel anywhere.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="text-primary underline-offset-4 hover:underline">
              Read our full Privacy Policy →
            </Link>
          </p>
        </section>

        {/* Tools */}
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-xl font-semibold tracking-tight text-foreground">
            What Presetly supports
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
            {TOOLS.map(tool => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <span aria-hidden="true" className="text-primary">→</span>
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <section aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Not affiliated with any government body
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Presetly is an independent tool. It is not affiliated with, endorsed
            by, or connected to UPSC, UIDAI, NSDL, the Ministry of External
            Affairs, the Election Commission of India, or any other government
            authority. Specifications are based on publicly available portal
            guidelines — always verify against the official portal before
            submitting your application.
          </p>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Contact
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Have a question or found a bug?{' '}
            <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
              Contact us
            </Link>
            . For privacy-related requests, see our{' '}
            <Link href="/privacy-policy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

export const metadata: Metadata = {
  title: 'Contact — Presetly',
  description:
    'Contact Presetly with questions, bug reports, or feedback about the free image resizer for Indian government portal applications.',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact Presetly',
    description: 'Get in touch with questions, bug reports, or feedback.',
    url: `${BASE_URL}/contact`,
    type: 'website',
    siteName: 'Presetly',
  },
}

const COMMON_QUESTIONS = [
  {
    question: 'My compressed image is still being rejected by the portal.',
    answer: 'Portal requirements change without notice. Double-check the official portal for current specifications, then re-process your image using the correct goal tool.',
    href: '/goals/upsc-photo-resizer',
  },
  {
    question: 'Which tool should I use for my application?',
    answer: 'Browse tools by category or use the search bar on the homepage to find the right tool for your specific portal.',
    href: '/#categories',
  },
  {
    question: 'Is Presetly really free? Are there hidden charges?',
    answer: 'Yes, completely free. All processing happens in your browser — there is no backend cost to us, which is why we can offer it at no charge.',
    href: '/about',
  },
]

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">

      {/* Header */}
      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Contact
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Presetly is maintained by a small independent team. We read every
          message and respond as quickly as we can.
        </p>
      </header>

      <div className="space-y-12">

        {/* Email section */}
        <section aria-labelledby="email-heading">
          <h2 id="email-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Email us
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For bug reports, feature suggestions, or any other questions:
          </p>
          <a
            href="mailto:contact@presetly.app"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 text-primary"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            contact@presetly.app
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            We aim to respond within 2–3 business days. Presetly is a free tool
            maintained by a small team, so we appreciate your patience.
          </p>
        </section>

        {/* Common questions */}
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Before you write — common questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            These questions are answered in the tool FAQs:
          </p>
          <ul className="mt-5 space-y-4" role="list">
            {COMMON_QUESTIONS.map(item => (
              <li key={item.question} className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground">{item.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                <Link
                  href={item.href}
                  className="mt-2 inline-block text-xs font-medium text-primary transition-colors hover:underline underline-offset-4"
                >
                  View tool →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* What to include */}
        <section aria-labelledby="bug-heading">
          <h2 id="bug-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Reporting a bug
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If Presetly is not working correctly, please include:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground" role="list">
            {[
              'The goal or tool you were using (e.g., "UPSC Photo Resizer")',
              'Your browser name and version (e.g., Chrome 124 on Android)',
              'What you expected to happen and what happened instead',
              'Whether the issue happens every time or occasionally',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-primary">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Privacy note */}
        <section className="rounded-xl border border-border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">Privacy note:</strong>{' '}
            Do not attach any personal photos or government documents in your
            message. Describe the issue in words — we can reproduce it locally.
            See our{' '}
            <Link href="/privacy-policy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>{' '}
            for details on how we handle contact data.
          </p>
        </section>

      </div>
    </article>
  )
}

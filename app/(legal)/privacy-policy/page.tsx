import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

export const metadata: Metadata = {
  title: 'Privacy Policy — Presetly',
  description:
    'Presetly Privacy Policy. Learn how we handle your data — spoiler: your images are never uploaded, and we collect no personal information.',
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
  openGraph: {
    title: 'Privacy Policy — Presetly',
    description: 'Your images are never uploaded. We collect no personal information.',
    url: `${BASE_URL}/privacy-policy`,
    type: 'website',
    siteName: 'Presetly',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">

      {/* Header */}
      <header className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Legal
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Effective date: 22 June 2026</span>
          <span>Last updated: 22 June 2026</span>
        </div>
      </header>

      {/* TL;DR summary */}
      <div className="mb-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-sm font-semibold text-foreground">Short version</p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground" role="list">
          {[
            'Your images are processed 100% in your browser — they are never uploaded to any server.',
            'We do not collect your name, email, or any personal information.',
            'We use anonymous analytics (PostHog) to understand how the tool is used.',
            'We use Sentry for error monitoring — no personal data is included.',
            'No account required. No sign-up. No cookies beyond what is strictly necessary.',
          ].map(point => (
            <li key={point} className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-10 text-base leading-relaxed">

        <section aria-labelledby="what-is-presetly">
          <h2 id="what-is-presetly" className="text-xl font-semibold tracking-tight text-foreground">
            1. What is Presetly?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;) is a free,
            browser-based image resizing and compression tool available at{' '}
            <Link href="/" className="text-primary underline-offset-4 hover:underline">
              presetly.app
            </Link>
            . The Service helps users prepare photos and signature images for
            Indian government portal applications.
          </p>
        </section>

        <section aria-labelledby="data-we-dont-collect">
          <h2 id="data-we-dont-collect" className="text-xl font-semibold tracking-tight text-foreground">
            2. What we do not collect
          </h2>
          <ul className="mt-3 space-y-3 text-muted-foreground" role="list">
            <li>
              <strong className="font-semibold text-foreground">Your images:</strong>{' '}
              All image processing happens in your browser using the Web Canvas
              API. Your photos, documents, and signature files are never
              transmitted to any server, never stored, and never seen by us.
            </li>
            <li>
              <strong className="font-semibold text-foreground">Personal information:</strong>{' '}
              We do not require you to provide your name, email address, phone
              number, Aadhaar number, or any other identifying information to
              use Presetly.
            </li>
            <li>
              <strong className="font-semibold text-foreground">Payment data:</strong>{' '}
              Presetly is completely free. We do not process payments or store
              any financial information.
            </li>
          </ul>
        </section>

        <section aria-labelledby="data-we-collect">
          <h2 id="data-we-collect" className="text-xl font-semibold tracking-tight text-foreground">
            3. What we do collect
          </h2>

          <h3 className="mt-5 text-base font-semibold text-foreground">
            3.1 Analytics — PostHog
          </h3>
          <p className="mt-2 text-muted-foreground">
            We use PostHog, a privacy-focused analytics platform, to understand
            how the tool is used. PostHog collects:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground" role="list">
            {[
              'Pages you visit and the tools you interact with',
              'Browser type, device category (mobile vs. desktop), and operating system',
              'Country-level location (no city or precise location)',
              'Session duration and navigation patterns',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-primary">·</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            PostHog does not receive your images or any personally identifiable
            information. You can opt out of analytics by enabling &quot;Do Not
            Track&quot; in your browser settings.
          </p>

          <h3 className="mt-6 text-base font-semibold text-foreground">
            3.2 Error monitoring — Sentry
          </h3>
          <p className="mt-2 text-muted-foreground">
            We use Sentry to capture technical error reports when the tool
            encounters a problem. Sentry receives:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground" role="list">
            {[
              'The type of error and the browser function where it occurred',
              'Browser and device information',
              'The page URL where the error occurred',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-primary">·</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Sentry does not receive your images or any personal information you
            have not deliberately shared.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies" className="text-xl font-semibold tracking-tight text-foreground">
            4. Cookies
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly uses minimal cookies required for essential website
            functionality and analytics session identification. We do not use
            advertising cookies or sell cookie data to third parties.
          </p>
        </section>

        <section aria-labelledby="third-party">
          <h2 id="third-party" className="text-xl font-semibold tracking-tight text-foreground">
            5. Third-party services
          </h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Service</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Data shared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { service: 'PostHog', purpose: 'Analytics', data: 'Anonymous usage events' },
                  { service: 'Sentry', purpose: 'Error monitoring', data: 'Error reports, browser info' },
                  { service: 'Vercel', purpose: 'Hosting', data: 'Server request logs' },
                  { service: 'Google Fonts', purpose: 'Typography', data: 'Font request logs' },
                ].map(row => (
                  <tr key={row.service}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.service}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="data-retention">
          <h2 id="data-retention" className="text-xl font-semibold tracking-tight text-foreground">
            6. Data retention
          </h2>
          <p className="mt-3 text-muted-foreground">
            Since we do not store your images or personal information, there is
            nothing to retain or delete on our end. Anonymous analytics events
            are retained by PostHog for 12 months. Sentry error reports are
            retained for 90 days.
          </p>
        </section>

        <section aria-labelledby="your-rights">
          <h2 id="your-rights" className="text-xl font-semibold tracking-tight text-foreground">
            7. Your rights
          </h2>
          <p className="mt-3 text-muted-foreground">
            Under the Information Technology Act, 2000 and applicable data
            protection principles, you have the right to:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground" role="list">
            {[
              'Know what information is collected about you (this policy covers that).',
              'Request deletion of any analytics data associated with your session — contact us with your approximate usage date.',
              'Opt out of analytics by enabling "Do Not Track" in your browser.',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-primary">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="children">
          <h2 id="children" className="text-xl font-semibold tracking-tight text-foreground">
            8. Children&apos;s privacy
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly is not directed to children under 13 years of age. We do
            not knowingly collect any information from children.
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2 id="changes" className="text-xl font-semibold tracking-tight text-foreground">
            9. Changes to this policy
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may update this Privacy Policy from time to time. Changes will
            be reflected by the &quot;Last updated&quot; date at the top. Continued use
            of Presetly after changes are posted constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section aria-labelledby="contact-privacy">
          <h2 id="contact-privacy" className="text-xl font-semibold tracking-tight text-foreground">
            10. Contact
          </h2>
          <p className="mt-3 text-muted-foreground">
            If you have questions or requests related to this Privacy Policy,
            contact us at:{' '}
            <a
              href="mailto:contact@presetly.app"
              className="text-primary underline-offset-4 hover:underline"
            >
              contact@presetly.app
            </a>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Or visit our{' '}
            <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
              Contact page
            </Link>
            .
          </p>
        </section>

      </div>
    </article>
  )
}

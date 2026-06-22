import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

export const metadata: Metadata = {
  title: 'Terms of Service — Presetly',
  description:
    'Terms of Service for Presetly, the free browser-based image resizer for Indian government portal applications.',
  alternates: { canonical: `${BASE_URL}/terms` },
  openGraph: {
    title: 'Terms of Service — Presetly',
    description: 'Terms governing your use of Presetly, a free browser-based image resizer.',
    url: `${BASE_URL}/terms`,
    type: 'website',
    siteName: 'Presetly',
  },
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">

      {/* Header */}
      <header className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Legal
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms of Service
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Effective date: 22 June 2026</span>
          <span>Last updated: 22 June 2026</span>
        </div>
      </header>

      <div className="space-y-10 text-base leading-relaxed">

        <section aria-labelledby="acceptance">
          <h2 id="acceptance" className="text-xl font-semibold tracking-tight text-foreground">
            1. Acceptance of terms
          </h2>
          <p className="mt-3 text-muted-foreground">
            By accessing or using Presetly at{' '}
            <Link href="/" className="text-primary underline-offset-4 hover:underline">
              presetly.app
            </Link>{' '}
            (the &quot;Service&quot;), you agree to be bound by these Terms of Service
            (&quot;Terms&quot;). If you do not agree, please do not use the Service.
          </p>
        </section>

        <section aria-labelledby="description">
          <h2 id="description" className="text-xl font-semibold tracking-tight text-foreground">
            2. Description of the Service
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly provides free browser-based tools for resizing, compressing,
            and formatting images for use in Indian government portal
            applications. All image processing happens entirely in your browser —
            no images are uploaded to any server.
          </p>
        </section>

        <section aria-labelledby="free-service">
          <h2 id="free-service" className="text-xl font-semibold tracking-tight text-foreground">
            3. Free service
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly is currently provided free of charge. We reserve the right
            to introduce optional premium features in the future. Any such
            features will be clearly disclosed, and the core free functionality
            will continue to be available.
          </p>
        </section>

        <section aria-labelledby="accuracy">
          <h2 id="accuracy" className="text-xl font-semibold tracking-tight text-foreground">
            4. Accuracy of output
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly applies image specifications based on publicly available
            government portal guidelines. However:
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground" role="list">
            {[
              'Portal requirements may change at any time without notice.',
              'The tool may not reflect the most recent specifications for every portal.',
              'Always verify your processed image against the official portal requirements before submitting your application.',
              'We are not responsible for application rejections due to format mismatches.',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ip">
          <h2 id="ip" className="text-xl font-semibold tracking-tight text-foreground">
            5. Intellectual property
          </h2>
          <ul className="mt-3 space-y-2 text-muted-foreground" role="list">
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">·</span>
              <span>
                <strong className="font-semibold text-foreground">Your images:</strong>{' '}
                You retain full ownership of any images you process using
                Presetly. We claim no rights whatsoever over your content.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">·</span>
              <span>
                <strong className="font-semibold text-foreground">Presetly:</strong>{' '}
                The Presetly name, logo, website design, and software code are
                our intellectual property. You may not copy, reproduce, or
                distribute them without written permission.
              </span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="prohibited">
          <h2 id="prohibited" className="text-xl font-semibold tracking-tight text-foreground">
            6. Prohibited use
          </h2>
          <p className="mt-3 text-muted-foreground">You agree not to:</p>
          <ul className="mt-3 space-y-1.5 text-muted-foreground" role="list">
            {[
              'Use the Service for any unlawful purpose or in violation of any applicable law.',
              'Process images that contain illegal content, including content that violates the rights of others.',
              'Attempt to reverse-engineer, disassemble, or interfere with the Service.',
              'Use automated tools, bots, or scrapers to access or use the Service at scale.',
              'Attempt to circumvent any security measures of the Service.',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="disclaimer">
          <h2 id="disclaimer" className="text-xl font-semibold tracking-tight text-foreground">
            7. Disclaimer of warranties
          </h2>
          <p className="mt-3 text-muted-foreground">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, express or implied, including but not
            limited to warranties of merchantability, fitness for a particular
            purpose, or non-infringement. We do not guarantee that the Service
            will be error-free, uninterrupted, or that the output will be
            accepted by any specific government portal.
          </p>
        </section>

        <section aria-labelledby="liability">
          <h2 id="liability" className="text-xl font-semibold tracking-tight text-foreground">
            8. Limitation of liability
          </h2>
          <p className="mt-3 text-muted-foreground">
            To the maximum extent permitted by applicable law, Presetly and its
            operators shall not be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages arising from your use
            of, or inability to use, the Service. This includes but is not
            limited to application rejections, missed deadlines, or loss of
            data.
          </p>
        </section>

        <section aria-labelledby="affiliation">
          <h2 id="affiliation" className="text-xl font-semibold tracking-tight text-foreground">
            9. Government affiliation disclaimer
          </h2>
          <p className="mt-3 text-muted-foreground">
            Presetly is an independent tool and is not affiliated with, endorsed
            by, or connected to UPSC, UIDAI (Aadhaar), NSDL (PAN), the
            Ministry of External Affairs (Passport), the Election Commission of
            India (Voter ID), or any other government authority or body.
          </p>
        </section>

        <section aria-labelledby="changes-terms">
          <h2 id="changes-terms" className="text-xl font-semibold tracking-tight text-foreground">
            10. Changes to these Terms
          </h2>
          <p className="mt-3 text-muted-foreground">
            We reserve the right to modify these Terms at any time. Changes
            will be reflected by the &quot;Last updated&quot; date above. Continued
            use of the Service after changes constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section aria-labelledby="governing-law">
          <h2 id="governing-law" className="text-xl font-semibold tracking-tight text-foreground">
            11. Governing law
          </h2>
          <p className="mt-3 text-muted-foreground">
            These Terms are governed by and construed in accordance with the
            laws of India, including the Information Technology Act, 2000 and
            its amendments. Any disputes shall be subject to the exclusive
            jurisdiction of courts in India.
          </p>
        </section>

        <section aria-labelledby="contact-terms">
          <h2 id="contact-terms" className="text-xl font-semibold tracking-tight text-foreground">
            12. Contact
          </h2>
          <p className="mt-3 text-muted-foreground">
            For questions about these Terms, contact us at:{' '}
            <a
              href="mailto:contact@presetly.app"
              className="text-primary underline-offset-4 hover:underline"
            >
              contact@presetly.app
            </a>
          </p>
        </section>

      </div>
    </article>
  )
}

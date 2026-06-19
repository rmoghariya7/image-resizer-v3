const HOME_FAQS = [
  {
    question: 'What is Presetly?',
    answer:
      'Presetly is a free browser-based image compression and resizing platform. You pick a target file size — 15 KB, 50 KB, 100 KB, or any other limit — upload your image, and download the compressed file in seconds. No sign-up, no server uploads, no watermarks.',
  },
  {
    question: 'Does my image get uploaded to a server?',
    answer:
      'No. All processing happens locally in your browser using Web Workers and the Canvas API. Your image never leaves your device. Nothing is stored, logged, or transmitted.',
  },
  {
    question: 'What is the smallest file size I can compress to?',
    answer:
      'The smallest supported target is 15 KB. For very small targets, the tool converts PNG images to JPEG — the most efficient format for photos at small sizes. Most images can reach 15 KB with acceptable visual quality.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'JPEG, PNG, and WebP. Files up to 20 MB can be uploaded. The tool outputs JPEG for small size targets (under 40 KB) and preserves the original format for larger targets.',
  },
  {
    question: 'Can I use this for government portal photo requirements?',
    answer:
      'Yes. Presetly also supports photo resizing presets for UPSC, GPSC, NDA, Aadhaar, PAN card, Passport, and Voter ID — automatically setting the correct dimensions, DPI, and format for each portal.',
  },
  {
    question: 'Are all tools completely free?',
    answer:
      'Yes, every tool is free with no restrictions — no sign-up, no credit card, no watermarks, no daily limits.',
  },
]

export function HomeFaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about Presetly.
          </p>
        </div>

        {/* Server-rendered details/summary — fully crawlable, no client JS required */}
        <dl className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
          {HOME_FAQS.map(faq => (
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
  )
}

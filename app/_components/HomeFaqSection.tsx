const HOME_FAQS = [
  {
    question: 'What is Presetly?',
    answer:
      'Presetly is a free browser-based toolkit for preparing images, video and documents. Compress, resize, crop and convert images, extract audio from video, or generate exact-spec photos for Indian government portals — all without uploading anything to a server.',
  },
  {
    question: 'Does my file get uploaded to a server?',
    answer:
      'No. Every tool processes your file locally in your browser using Web Workers, WebAssembly, and the Canvas API. Your file never leaves your device. Nothing is stored, logged, or transmitted.',
  },
  {
    question: 'What can I do on Presetly?',
    answer:
      'Compress images to an exact file size, resize to custom dimensions, crop for social media or government photo requirements, convert between JPEG/PNG/WebP, and extract audio from video files — with more tools on the way.',
  },
  {
    question: 'Which formats are supported?',
    answer:
      'Images: JPEG, PNG, and WebP, up to 20 MB. Video: MP4, MOV, AVI, MKV, WEBM and M4V, up to 512 MB. Every tool page lists its exact supported formats.',
  },
  {
    question: 'Can I use this for government portal photo requirements?',
    answer:
      'Yes. Presetly supports photo presets for UPSC, GPSC, SSC, NDA, Aadhaar, PAN card, Passport, and Voter ID — automatically setting the correct dimensions, DPI, and file size for each portal.',
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

export { HOME_FAQS }

import type { FAQ } from '@/types/registry'
import { resolveGoalLinks } from '@/lib/linking/resolver'

interface Props {
  faqs: FAQ[]
}

export function FaqSection({ faqs }: Props) {
  return (
    <section aria-labelledby="faq-heading" className="bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h2
          id="faq-heading"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          Frequently asked questions
        </h2>

        <dl className="mt-8 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group py-5 marker:content-none"
              // Open first FAQ by default for engagement
              {...(faqs.indexOf(faq) === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <dt className="text-sm font-medium text-gray-900 group-open:text-indigo-600">
                  {faq.question}
                </dt>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <dd className="mt-3 text-sm leading-relaxed text-gray-600">
                {resolveGoalLinks(faq.answer)}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  )
}

import type { HowItWorksStep } from '@/types/registry'

interface Props {
  steps: HowItWorksStep[]
}

export function HowItWorksSection({ steps }: Props) {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h2
          id="how-it-works-heading"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          How it works
        </h2>

        <ol className="mt-8 space-y-8" role="list">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white tabular-nums"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="pt-0.5">
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

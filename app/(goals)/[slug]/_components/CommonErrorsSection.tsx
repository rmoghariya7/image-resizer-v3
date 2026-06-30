import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { CommonError } from '@/content/types'

interface ErrorCardProps {
  error: CommonError
}

function ErrorCard({ error }: ErrorCardProps) {
  return (
    <li className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-border/60 bg-amber-50/60 px-5 py-3.5 dark:bg-amber-950/20">
        <AlertTriangle
          className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
          aria-hidden="true"
        />
        <h3 className="text-sm font-semibold text-foreground">{error.title}</h3>
      </div>

      {/* Body */}
      <div className="space-y-4 px-5 py-4">
        {/* Symptom */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            What you see
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {error.symptom}
          </p>
        </div>

        {/* Fix */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            How to fix it
          </p>
          <div className="flex items-start gap-2">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-foreground">{error.fix}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

interface Props {
  errors: readonly CommonError[]
}

export function CommonErrorsSection({ errors }: Props) {
  if (errors.length === 0) return null

  return (
    <section
      aria-labelledby="common-errors-heading"
      className="bg-background px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Troubleshooting
          </p>
          <h2
            id="common-errors-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground"
          >
            Common issues &amp; fixes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If your upload is rejected, one of these is usually the reason.
          </p>
        </div>

        {/* Error grid */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {errors.map((error) => (
            <ErrorCard key={error.id} error={error} />
          ))}
        </ul>
      </div>
    </section>
  )
}

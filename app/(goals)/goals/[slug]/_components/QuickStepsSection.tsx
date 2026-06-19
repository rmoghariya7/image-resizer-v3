import { ImagePlus, Zap, Download, CheckCircle, Share2 } from 'lucide-react'
import type { HowItWorksStep } from '@/types/registry'
import type { ElementType } from 'react'

// ─── Step icon set ────────────────────────────────────────────────────────────
// Mapped by index; falls back to CheckCircle for any step beyond index 4.

const STEP_ICONS: readonly ElementType[] = [
  ImagePlus,
  Zap,
  Download,
  CheckCircle,
  Share2,
]

function getStepIcon(index: number): ElementType {
  return STEP_ICONS[index] ?? CheckCircle
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StepCardProps {
  step: HowItWorksStep
  index: number
  total: number
}

function StepCard({ step, index, total }: StepCardProps) {
  const Icon = getStepIcon(index)
  const stepNum = index + 1
  const isLast = index === total - 1

  return (
    <li className="relative flex flex-1 flex-col">
      {/* Desktop connector line — shown between cards, not after the last */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute top-7 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-border via-border/60 to-transparent lg:block"
        />
      )}

      {/* Card */}
      <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
        {/* Step badge + icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold tabular-nums text-primary-foreground">
            {stepNum}
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-4 text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Text */}
        <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {step.body}
        </p>
      </div>
    </li>
  )
}

// ─── Mobile step row ──────────────────────────────────────────────────────────

interface MobileStepProps {
  step: HowItWorksStep
  index: number
  isLast: boolean
}

function MobileStep({ step, index, isLast }: MobileStepProps) {
  const Icon = getStepIcon(index)
  const stepNum = index + 1

  return (
    <li className="flex gap-4">
      {/* Left: number + vertical connector */}
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold tabular-nums text-primary-foreground">
          {stepNum}
        </div>
        {!isLast && (
          <div
            aria-hidden="true"
            className="mt-2 w-px flex-1 bg-gradient-to-b from-border to-transparent"
          />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-8 pt-1">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Icon className="size-3.5 text-primary" aria-hidden="true" />
          </div>
        </div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {step.body}
        </p>
      </div>
    </li>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface Props {
  steps: HowItWorksStep[]
}

export function QuickStepsSection({ steps }: Props) {
  if (steps.length === 0) return null

  return (
    <section
      aria-labelledby="quick-steps-heading"
      className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Quick start
          </p>
          <h2
            id="quick-steps-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground"
          >
            Done in {steps.length} steps
          </h2>
        </div>

        {/* Desktop: horizontal cards */}
        <ol
          role="list"
          className="hidden gap-4 lg:flex"
          aria-label="Step-by-step workflow"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              total={steps.length}
            />
          ))}
        </ol>

        {/* Mobile / tablet: vertical timeline */}
        <ol
          role="list"
          className="lg:hidden"
          aria-label="Step-by-step workflow"
        >
          {steps.map((step, index) => (
            <MobileStep
              key={step.title}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

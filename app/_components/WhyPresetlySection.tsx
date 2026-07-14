import { Cpu, CloudOff, ShieldCheck, Zap, Smartphone, Landmark } from 'lucide-react'
import type { ElementType } from 'react'

const REASONS: { title: string; description: string; Icon: ElementType }[] = [
  {
    title: 'Browser processing',
    description: 'Every tool runs on Web Workers and the Canvas API right inside your browser tab — no server ever touches your file.',
    Icon: Cpu,
  },
  {
    title: 'No uploads',
    description: 'Files are read from your device into memory and written straight back out. Nothing is transmitted anywhere.',
    Icon: CloudOff,
  },
  {
    title: 'Privacy first',
    description: 'No accounts, no tracking of file contents, no storage. What you process is never seen by anyone but you.',
    Icon: ShieldCheck,
  },
  {
    title: 'Lightning fast',
    description: 'No upload/download round-trip to a server means most operations finish in under a second.',
    Icon: Zap,
  },
  {
    title: 'Mobile friendly',
    description: 'Every tool is built mobile-first — large touch targets, no horizontal scrolling, works great on a 320px phone.',
    Icon: Smartphone,
  },
  {
    title: 'Indian government presets',
    description: 'UPSC, GPSC, SSC, Aadhaar, PAN card, Passport and more — exact dimensions and file sizes, pre-configured.',
    Icon: Landmark,
  },
]

export function WhyPresetlySection() {
  return (
    <section aria-labelledby="why-presetly-heading" className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Why Presetly</p>
          <h2 id="why-presetly-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Built for trust, not just speed
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {REASONS.map(({ title, description, Icon }) => (
            <li key={title} className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-foreground/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                <Icon className="size-5 text-primary" />
              </div>
              <span className="mt-4 block text-base font-semibold tracking-tight text-foreground">{title}</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

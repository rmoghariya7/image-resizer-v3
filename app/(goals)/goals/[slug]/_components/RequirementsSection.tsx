import { AlertTriangle, CalendarDays } from 'lucide-react'
import type { Preset } from '@/types/registry'
import { isImagePreset, isCompressPreset } from '@/types/registry'
import type { RequirementsContent, RequirementNote } from '@/content/types'

// ─── Spec extraction ─────────────────────────────────────────────────────────

type SpecItem = {
  label: string
  value: string
}

function getSpecItems(preset: Preset): SpecItem[] {
  if (isImagePreset(preset)) {
    const items: SpecItem[] = [
      { label: 'Dimensions', value: preset.displayDimensions },
      { label: 'Format', value: preset.displayFormat },
    ]
    if (preset.displayMaxSize) {
      items.push({ label: 'Max file size', value: preset.displayMaxSize })
    }
    items.push({ label: 'Resolution', value: `${preset.dpi} DPI` })
    return items
  }

  if (isCompressPreset(preset)) {
    return [
      { label: 'Target size', value: preset.displayMaxSize },
      { label: 'Min quality', value: `${preset.minQuality}%` },
      { label: 'Format', value: preset.preserveFormat ? 'Preserved' : 'Converted to JPEG' },
    ]
  }

  return []
}

// ─── Note list ────────────────────────────────────────────────────────────────

function NoteList({ notes }: { notes: RequirementNote[] }) {
  return (
    <ul className="mt-4 space-y-2" role="list">
      {notes.map((note) => (
        <li key={note.text} className="flex items-start gap-2">
          {note.critical ? (
            <AlertTriangle
              className="mt-0.5 size-3.5 shrink-0 text-amber-600"
              aria-label="Important"
            />
          ) : (
            <span
              aria-hidden="true"
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
            />
          )}
          <span className="text-sm leading-relaxed text-muted-foreground">
            {note.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface Props {
  preset: Preset
  content?: RequirementsContent
}

export function RequirementsSection({ preset, content }: Props) {
  const specs = getSpecItems(preset)

  // Merge additional specs from content layer (background, attire, etc.)
  const enrichedSpecs: SpecItem[] = [...specs]
  if (content?.background) {
    enrichedSpecs.push({ label: 'Background', value: content.background })
  }
  if (content?.attire) {
    enrichedSpecs.push({ label: 'Attire', value: content.attire })
  }

  const sectionTitle = content?.officialTitle ?? 'Output specifications'
  const intro = content?.introduction ?? 'These settings are applied automatically — no manual configuration needed.'

  return (
    <section
      aria-labelledby="requirements-heading"
      className="bg-background px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Requirements
          </p>
          <h2
            id="requirements-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground"
          >
            {sectionTitle}
          </h2>
          {intro && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>

        {/* Spec grid */}
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {enrichedSpecs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl border border-border/60 bg-muted/40 px-4 py-4"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="mt-1.5 text-base font-semibold tracking-tight text-foreground">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Notes */}
        {content?.notes && content.notes.length > 0 && (
          <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Additional requirements
            </p>
            <NoteList notes={content.notes} />
          </div>
        )}

        {/* Source attribution */}
        {content?.officialSource && (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
            Source: {content.officialSource}
            {content.updatedAt && (
              <span className="ml-1 text-muted-foreground/50">
                · Updated {new Date(content.updatedAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </span>
            )}
          </p>
        )}
      </div>
    </section>
  )
}

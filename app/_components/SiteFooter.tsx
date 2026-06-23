import Link from 'next/link'
import { getGoal } from '@/registry/goals'
import { buildGoalHref } from '@/lib/recommendations/engine'

const FOOTER_SECTIONS = [
  {
    heading: 'Exam Photos',
    links: [
      { label: 'UPSC Photo Resizer', slug: 'upsc-photo-resizer' },
      { label: 'GPSC Photo Resizer', slug: 'gpsc-photo-resizer' },
      { label: 'SSC Photo Resizer', slug: 'ssc-photo-resizer' },
      { label: 'Railway Photo Resizer', slug: 'railway-photo-resizer' },
      { label: 'IBPS Photo Resizer', slug: 'ibps-photo-resizer' },
      { label: 'NDA Photo Resizer', slug: 'nda-photo-resizer' },
    ],
  },
  {
    heading: 'ID Documents',
    links: [
      { label: 'Aadhaar Photo Resizer', slug: 'aadhaar-photo-resizer' },
      { label: 'PAN Card Photo Resizer', slug: 'pan-card-photo-resizer' },
      { label: 'Passport Photo Maker', slug: 'passport-photo-maker' },
      { label: 'Driving Licence Photo', slug: 'driving-licence-photo-resizer' },
      { label: 'Visa Photo Maker', slug: 'visa-photo-maker' },
      { label: 'Voter ID Photo Resizer', slug: 'voter-id-photo-resizer' },
    ],
  },
  {
    heading: 'Compress Image',
    links: [
      { label: 'Compress to 15 KB', slug: 'compress-image-to-15kb' },
      { label: 'Compress to 20 KB', slug: 'compress-image-to-20kb' },
      { label: 'Compress to 25 KB', slug: 'compress-image-to-25kb' },
      { label: 'Compress to 50 KB', slug: 'compress-image-to-50kb' },
      { label: 'Compress to 100 KB', slug: 'compress-image-to-100kb' },
      { label: 'Compress to 200 KB', slug: 'compress-image-to-200kb' },
    ],
  },
  {
    heading: 'Signature',
    links: [
      { label: 'Signature Resize to 10 KB', slug: 'signature-resize-10kb' },
      { label: 'Signature Resize to 20 KB', slug: 'signature-resize-20kb' },
      { label: 'Signature Resize to 30 KB', slug: 'signature-resize-30kb' },
      { label: 'Signature Resize to 50 KB', slug: 'signature-resize-50kb' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_SECTIONS.map(section => (
            <div key={section.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {section.heading}
              </p>
              <ul className="mt-4 space-y-2" role="list">
                {section.links.map(link => {
                  const goal = getGoal(link.slug)
                  return (
                    <li key={link.slug}>
                      <Link
                        href={goal ? buildGoalHref(goal) : `/goals/${link.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Link href="/" className="text-sm font-semibold text-foreground">
            Presetly
          </Link>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/about" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
            <Link href="/privacy-policy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

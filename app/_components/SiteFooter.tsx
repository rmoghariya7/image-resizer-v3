import Link from 'next/link'

const FOOTER_LINKS = [
  {
    heading: 'Exam Photos',
    links: [
      { label: 'UPSC Photo Resizer', href: '/goals/upsc-photo-resizer' },
      { label: 'GPSC Photo Resizer', href: '/goals/gpsc-photo-resizer' },
      { label: 'NDA Photo Resizer', href: '/goals/nda-photo-resizer' },
    ],
  },
  {
    heading: 'ID Documents',
    links: [
      { label: 'Aadhaar Photo Resizer', href: '/goals/aadhaar-photo-resizer' },
      { label: 'PAN Card Photo Resizer', href: '/goals/pan-card-photo-resizer' },
      { label: 'Passport Photo Maker', href: '/goals/passport-photo-maker' },
      { label: 'Voter ID Photo Resizer', href: '/goals/voter-id-photo-resizer' },
    ],
  },
  {
    heading: 'Compress Image',
    links: [
      { label: 'Compress to 20 KB', href: '/goals/compress-image-to-20kb' },
      { label: 'Compress to 50 KB', href: '/goals/compress-image-to-50kb' },
      { label: 'Compress to 100 KB', href: '/goals/compress-image-to-100kb' },
    ],
  },
  {
    heading: 'Signature',
    links: [
      { label: 'Signature Resize to 20 KB', href: '/goals/signature-resize-20kb' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_LINKS.map(section => (
            <div key={section.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {section.heading}
              </p>
              <ul className="mt-4 space-y-2" role="list">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <Link href="/" className="text-sm font-semibold text-foreground">
            Presetly
          </Link>
          <p className="text-xs text-muted-foreground">
            All processing is done in your browser. No uploads. No sign-up. Free.
          </p>
        </div>
      </div>
    </footer>
  )
}

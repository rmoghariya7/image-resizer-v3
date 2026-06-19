import Link from 'next/link'
import { SearchTrigger } from '@/features/search'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          Presetly
        </Link>

        <div className="flex items-center gap-2">
          <nav
            className="hidden items-center gap-1 sm:flex"
            aria-label="Main navigation"
          >
            <Link
              href="#tools"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Tools
            </Link>
            <Link
              href="#categories"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href="#faq"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          <SearchTrigger />
        </div>
      </div>
    </header>
  )
}

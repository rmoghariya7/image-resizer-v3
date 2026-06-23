import type { ReactNode } from 'react'
import Link from 'next/link'
import { SiteFooter } from '@/app/_components/SiteFooter'

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-gray-900 transition-colors hover:text-indigo-600"
          >
            Presetly
          </Link>
          <Link
            href="/goals"
            className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
          >
            All Tools
          </Link>
        </div>
      </header>
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

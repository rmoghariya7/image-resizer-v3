import type { ReactNode } from 'react'
import Link from 'next/link'

export default function GoalsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors"
          >
            Presetly
          </Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  )
}

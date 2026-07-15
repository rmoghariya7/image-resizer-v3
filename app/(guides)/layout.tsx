import type { ReactNode } from 'react'
import { SiteHeader } from '@/app/_components/SiteHeader'
import { SiteFooter } from '@/app/_components/SiteFooter'

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

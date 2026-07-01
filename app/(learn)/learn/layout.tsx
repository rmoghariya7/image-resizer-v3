import { SiteHeader } from '@/app/_components/SiteHeader'
import { SiteFooter } from '@/app/_components/SiteFooter'

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}

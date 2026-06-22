import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SearchProvider } from '@/features/search'
import { GlobalSearch } from '@/features/search'
import { buildSearchIndex } from '@/features/search'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://presetly.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Presetly — Free Photo Resizer for Indian Government Applications',
  description:
    'Resize and compress photos for UPSC, GPSC, Aadhaar, PAN card, Passport, and 10+ Indian government portals. Browser-based, no uploads, no sign-up, completely free.',
  keywords: [
    'photo resizer',
    'image compressor',
    'upsc photo size',
    'aadhaar photo resize',
    'pan card photo size',
    'passport photo maker',
    'government form photo',
    'compress image to 50kb',
    'signature resize',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Presetly',
    title: 'Presetly — Free Photo Resizer for Indian Government Applications',
    description:
      'Resize and compress photos for UPSC, GPSC, Aadhaar, PAN card, Passport, and 10+ Indian government portals. Browser-based, no uploads, completely free.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary',
    title: 'Presetly — Free Photo Resizer for Indian Government Applications',
    description:
      'Resize photos for UPSC, Aadhaar, PAN card, and more — instantly in your browser.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const searchIndex = buildSearchIndex()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <SearchProvider index={searchIndex}>
          {children}
          <GlobalSearch />
        </SearchProvider>
      </body>
    </html>
  )
}

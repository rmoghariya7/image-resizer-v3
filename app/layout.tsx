import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics/analytics";
import { SearchProvider } from "@/features/search";
import { GlobalSearch } from "@/features/search";
import { buildSearchIndex } from "@/features/search";
import {
  BASE_URL,
  LOCALE,
  SITE_DESCRIPTION,
  SITE_NAME,
  THEME_COLOR,
  organizationSchema,
  websiteSchema,
} from "@/lib/metadata/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE = {
  url: `${BASE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  type: "image/png" as const,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // NOTE: intentionally a plain string, not a `{ default, template }` object —
  // every page in the app already sets its own full `metadata.title` string
  // (including the "Presetly" suffix). A root template would double-suffix
  // every one of them (e.g. "... | Presetly | Presetly").
  title: `${SITE_NAME}: Free Online Image, Video & Document Tools`,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: LOCALE,
    siteName: SITE_NAME,
    title: `Free Online Image, Video & Document Tools | ${SITE_NAME}`,
    description:
      "A complete browser-based toolkit: compress, resize, crop, and convert images, remove backgrounds, extract audio from video, and generate exam, ID, and passport photos to exact specs. Nothing is ever uploaded — free forever.",
    url: BASE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Image, Video & Document Tools | ${SITE_NAME}`,
    description:
      "Compress, resize, crop, convert images, remove backgrounds, extract audio from video, and generate exam and ID photos to exact specs. All free, all browser-based.",
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// Compute the search index once at module load time (static registry data — never changes).
// Calling buildSearchIndex() inside RootLayout would re-run it on every SSR request.
const searchIndex = buildSearchIndex();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {/* Sitewide Organization + WebSite schema — rendered once here so no
            page needs to redeclare Presetly's brand identity independently. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
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
      <Analytics />
    </html>
  );
}

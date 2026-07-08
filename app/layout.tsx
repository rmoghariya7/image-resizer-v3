import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics/analytics";
import { SearchProvider } from "@/features/search";
import { GlobalSearch } from "@/features/search";
import { buildSearchIndex } from "@/features/search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://presetly.app";

const OG_IMAGE = {
  url: `${BASE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  type: "image/png" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Presetly: free photo resizer for Indian government portals",
  description:
    "Resize and compress photos for UPSC, GPSC, Aadhaar, PAN card, Passport, and 10+ Indian government portals. Browser-based, no uploads, no sign-up, completely free.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Presetly",
    title:
      "Exam photos, Aadhaar, PAN, Passport, signature resize, all free | Presetly",
    description:
      "Every Indian portal photo tool in one place. Exam photos, Aadhaar, PAN card, Passport Seva, Voter ID, signature resize, and image compression. Runs in your browser, no upload.",
    url: BASE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "All photo tools for Indian portals | Presetly",
    description:
      "Exam photos, Aadhaar, PAN, Passport, signature resize, image compression. All free, all browser-only.",
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
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
      <Analytics />
    </html>
  );
}

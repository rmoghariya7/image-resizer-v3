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
  title: "Presetly: Free Browser-Based Image, Video & Document Tools",
  description:
    "Compress, resize, crop and convert images, extract audio from video, and generate exam and ID photos for UPSC, GPSC, Aadhaar, PAN card, Passport and more. Browser-based, no uploads, no sign-up, completely free.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Presetly",
    title: "Compress, Resize, Crop, Convert & More — All Free | Presetly",
    description:
      "A complete browser-based toolkit: image compression, resizing, cropping, format conversion, video-to-audio, and government ID photo presets for UPSC, Aadhaar, PAN, Passport and more. Runs in your browser, no upload.",
    url: BASE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image, Video & Document Tools, Free | Presetly",
    description:
      "Compress, resize, crop, convert images, extract audio from video, and generate government ID photos. All free, all browser-only.",
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

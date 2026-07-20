import Link from "next/link";
import type { Metadata } from "next";
import { BASE_URL, generateToolMetadata } from "@/lib/metadata/generators";
import { organizationRef, SITE_NAME } from "@/lib/metadata/brand";
import {
  getStandaloneToolPageGoals,
  getStandaloneTools,
} from "@/lib/recommendations/engine";
import { getTool } from "@/registry/tools";
import { FaqSection } from "../[slug]/_components/FaqSection";
import { QuickStepsSection } from "../[slug]/_components/QuickStepsSection";
import { ExploreMoreToolsSection } from "../[slug]/_components/ExploreMoreToolsSection";
import { CropImageSection } from "./_components/CropImageSection";
import {
  DESCRIPTION,
  FAQS,
  GOVERNMENT_GUIDE,
  HOW_IT_WORKS,
  PAGE_TITLE,
  SEO_TITLE,
  SOCIAL_GUIDE,
  WHY_CROP_BEFORE_UPLOADING,
} from "./content";

const CANONICAL = `${BASE_URL}/crop-image`;

export const metadata: Metadata = generateToolMetadata({
  pageTitle: PAGE_TITLE,
  seoTitle: SEO_TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  primaryQuery: "image cropper online free",
  ogBadge: "Image Cropper",
  ogBadges: ["Free", "No uploads", "Passport · Instagram · YouTube · Custom"],
});

// ─── Structured data ──────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: PAGE_TITLE, item: CANONICAL },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: PAGE_TITLE,
  description: DESCRIPTION,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with Canvas support",
  url: CANONICAL,
  featureList: [
    "Government photo presets: Passport, Aadhaar, PAN Card, Signature, UPSC, GPSC, SSC",
    "Social media presets: Instagram, Facebook, LinkedIn, Twitter/X, YouTube, WhatsApp",
    "Developer presets: App Icon, Website Hero, Blog Cover, Open Graph, Favicon",
    "Custom aspect ratios and free-form cropping",
    "Drag, pinch-zoom, mouse-wheel zoom, rotate and flip",
    "Runs entirely in the browser — images are never uploaded",
    "Free with no sign-up or watermarks",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: organizationRef(),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to crop an image with ${SITE_NAME}`,
  step: HOW_IT_WORKS.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.body,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CropImagePage() {
  const tool = getTool("image-cropper");
  const exploreGoals = getStandaloneToolPageGoals(12);
  const otherTools = getStandaloneTools().filter((t) => t.key !== tool.key);

  return (
    <>
      {[breadcrumbSchema, softwareSchema, howToSchema, faqSchema].map(
        (schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ),
      )}

      <article>
        {/* 1. Page header — compact so upload, presets and the Crop button all
               share the first mobile viewport. */}
        <div className="border-b border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-1.5 sm:mb-4">
              <ol
                className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
                role="list"
              >
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-indigo-600"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">
                  /
                </li>
                <li className="font-medium text-gray-900" aria-current="page">
                  Image Cropper
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {PAGE_TITLE}
            </h1>
            <p className="mt-2 hidden text-base leading-relaxed text-gray-600 sm:mt-4 sm:block sm:text-lg">
              Crop images for passport photos, Aadhaar, Instagram, YouTube
              thumbnails and dozens of other goals. Choose a preset, drag to
              frame your shot, and download — nothing is ever uploaded.
            </p>

            <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
              {["passport photo crop", "instagram crop", "youtube thumbnail", "free"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* 2. The tool — primary CTA, above the fold */}
        <CropImageSection />

        {/* 3. How it works */}
        <QuickStepsSection steps={HOW_IT_WORKS} />

        {/* 4. Government photo crop guide */}
        <section
          aria-labelledby="government-guide-heading"
          className="bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="government-guide-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              {GOVERNMENT_GUIDE.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              {GOVERNMENT_GUIDE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Social media crop guide */}
        <section
          aria-labelledby="social-guide-heading"
          className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="social-guide-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              {SOCIAL_GUIDE.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              {SOCIAL_GUIDE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Why crop before uploading */}
        <section
          aria-labelledby="why-crop-heading"
          className="bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="why-crop-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              {WHY_CROP_BEFORE_UPLOADING.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              {WHY_CROP_BEFORE_UPLOADING.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <FaqSection faqs={FAQS} />

        {/* 8. Related tools — broad discovery at page bottom */}
        <ExploreMoreToolsSection goals={exploreGoals} tools={otherTools} />
      </article>
    </>
  );
}

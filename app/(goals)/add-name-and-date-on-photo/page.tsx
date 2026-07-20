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
import { AddNameAndDateSection } from "./_components/AddNameAndDateSection";
import {
  DESCRIPTION,
  FAQS,
  FOOTER_GUIDE,
  HOW_IT_WORKS,
  PAGE_TITLE,
  PRIVACY_GUIDE,
  SEO_TITLE,
  USE_CASES_GUIDE,
} from "./content";

const CANONICAL = `${BASE_URL}/add-name-and-date-on-photo`;

export const metadata: Metadata = generateToolMetadata({
  pageTitle: PAGE_TITLE,
  seoTitle: SEO_TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  primaryQuery: "add name and date to photo",
  ogBadge: "Add Name & Date to Photo",
  ogBadges: ["Free", "No uploads", "Name · Date · Footer"],
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
    "Add your name and/or today's date to any photo online — the photo itself is never touched",
    "Five date formats, defaulting to today's date",
    "Independent left/center/right alignment and font size for Name and Date",
    "Smart layout automatically stacks Name and Date instead of overlapping when they share the same alignment",
    "Adjustable footer height, background color and text color",
    "Runs entirely in the browser — photos are never uploaded",
    "Free with no sign-up or watermarks",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: organizationRef(),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to add name and date to a photo with ${SITE_NAME}`,
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

export default function AddNameAndDateOnPhotoPage() {
  const tool = getTool("add-name-and-date-on-photo");
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
        {/* 1. Page header — compact so the template picker and upload area
               both share the first mobile viewport. */}
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
                  Add Name & Date to Photo
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {PAGE_TITLE}
            </h1>
            <p className="mt-2 hidden text-base leading-relaxed text-gray-600 sm:mt-4 sm:block sm:text-lg">
              Add your name and today&apos;s date to any photo — great for passport photos, ID
              cards, and exam applications like SSC, UPSC and Railways. Nothing is ever uploaded.
            </p>

            <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
              {["add name and date to photo", "passport photo name date", "SSC / UPSC exam photo", "free"].map(
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
        <AddNameAndDateSection />

        {/* 3. How it works */}
        <QuickStepsSection steps={HOW_IT_WORKS} />

        {/* 4. Use cases */}
        <section
          aria-labelledby="use-cases-heading"
          className="bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="use-cases-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              {USE_CASES_GUIDE.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              {USE_CASES_GUIDE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Footer layout guide */}
        <section
          aria-labelledby="footer-guide-heading"
          className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="footer-guide-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              {FOOTER_GUIDE.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              {FOOTER_GUIDE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Privacy */}
        <section
          aria-labelledby="privacy-heading"
          className="bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="privacy-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              {PRIVACY_GUIDE.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              {PRIVACY_GUIDE.paragraphs.map((p, i) => (
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

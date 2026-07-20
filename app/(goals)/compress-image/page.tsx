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
import { CompressImageSection } from "./_components/CompressImageSection";
import { DESCRIPTION, FAQS, HOW_IT_WORKS, PAGE_TITLE, SEO_TITLE } from "./content";

const CANONICAL = `${BASE_URL}/compress-image`;

export const metadata: Metadata = generateToolMetadata({
  pageTitle: PAGE_TITLE,
  seoTitle: SEO_TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  primaryQuery: "compress image online free",
  ogBadge: "Image Compressor",
  ogBadges: ["Free", "No uploads", "15KB – 1MB exact targets"],
});

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
  browserRequirements: "Requires a modern web browser with Web Worker support",
  url: CANONICAL,
  featureList: [
    "Compress to an exact file size target: 15 KB up to 1 MB",
    "Automatic quality optimisation via binary search",
    "Supports JPEG, PNG and WebP",
    "Runs entirely in the browser — images are never uploaded",
    "Free with no sign-up or watermarks",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: organizationRef(),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to compress an image with ${SITE_NAME}`,
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

export default function CompressImagePage() {
  const tool = getTool("image-resizer");
  const exploreGoals = getStandaloneToolPageGoals(12);
  const otherTools = getStandaloneTools().filter((t) => t.key !== tool.key);

  return (
    <>
      {[breadcrumbSchema, softwareSchema, howToSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article>
        <div className="border-b border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-1.5 sm:mb-4">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" role="list">
                <li>
                  <Link href="/" className="transition-colors hover:text-indigo-600">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">/</li>
                <li className="font-medium text-gray-900" aria-current="page">
                  Compress Image
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {PAGE_TITLE}
            </h1>
            <p className="mt-2 hidden text-base leading-relaxed text-gray-600 sm:mt-4 sm:block sm:text-lg">
              Pick a target size, upload your image, download the compressed
              file — all in your browser, nothing uploaded to any server.
            </p>

            <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
              {["exact file size", "15kb to 1mb", "no upload", "free"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <CompressImageSection />

        <QuickStepsSection steps={HOW_IT_WORKS} />

        <FaqSection faqs={FAQS} />

        <ExploreMoreToolsSection goals={exploreGoals} tools={otherTools} />
      </article>
    </>
  );
}

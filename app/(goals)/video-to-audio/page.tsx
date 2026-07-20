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
import { VideoToAudioSection } from "./_components/VideoToAudioSection";
import {
  DESCRIPTION,
  FAQS,
  HOW_IT_WORKS,
  PAGE_TITLE,
  SEO_TITLE,
  SUPPORTED_INPUTS,
  SUPPORTED_OUTPUTS,
} from "./content";

const CANONICAL = `${BASE_URL}/video-to-audio`;

export const metadata: Metadata = generateToolMetadata({
  pageTitle: PAGE_TITLE,
  seoTitle: SEO_TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  primaryQuery: "video to audio converter online",
  ogBadge: "Audio Converter",
  ogBadges: ["Free", "No uploads", "MP3 · WAV · AAC · OGG · FLAC"],
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
  browserRequirements: "Requires a modern web browser with WebAssembly support",
  url: CANONICAL,
  featureList: [
    "Extract MP3, WAV, AAC, OGG and FLAC audio from video",
    "Supports MP4, MOV, AVI, MKV, WEBM and M4V input",
    "Runs entirely in the browser — videos are never uploaded",
    "Adjustable bitrate, sample rate and channels",
    "Free with no sign-up or watermarks",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: organizationRef(),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to extract audio from a video with ${SITE_NAME}`,
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

export default function VideoToAudioPage() {
  const tool = getTool("video-to-audio");
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
        {/* 1. Page header — deliberately compact so upload, format cards and
               the Extract button all share the first mobile viewport. */}
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
                  Video to Audio
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {PAGE_TITLE}
            </h1>
            {/* Description hidden on mobile — the upload area, format cards and
                Extract button must all fit the first viewport (320px rule). */}
            <p className="mt-2 hidden text-base leading-relaxed text-gray-600 sm:mt-4 sm:block sm:text-lg">
              Extract audio from a wide range of video file types, including
              MP4, MOV, MKV, WEBM, AVI and more. Simply upload your video and
              extract the audio as an MP3 file
            </p>

            {/* Tags hidden on mobile to keep the tool above the fold */}
            <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
              {["video to mp3", "extract audio", "no upload", "free"].map(
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
        <VideoToAudioSection />

        {/* 3. How it works */}
        <QuickStepsSection steps={HOW_IT_WORKS} />

        {/* 4. Supported formats */}
        <section
          aria-labelledby="formats-heading"
          className="bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="formats-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              Supported formats
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Video input ({tool.maxFileSizeMB} MB max)
                </h3>
                <dl className="mt-3 space-y-2">
                  {SUPPORTED_INPUTS.map((item) => (
                    <div key={item.format} className="flex gap-3 text-sm">
                      <dt className="w-20 shrink-0 font-mono font-semibold text-indigo-600">
                        {item.format}
                      </dt>
                      <dd className="text-gray-600">{item.note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Audio output
                </h3>
                <dl className="mt-3 space-y-2">
                  {SUPPORTED_OUTPUTS.map((item) => (
                    <div key={item.format} className="flex gap-3 text-sm">
                      <dt className="w-20 shrink-0 font-mono font-semibold text-indigo-600">
                        {item.format}
                      </dt>
                      <dd className="text-gray-600">{item.note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Privacy explainer */}
        <section
          aria-labelledby="privacy-heading"
          className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="privacy-heading"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              Why browser processing is private
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                Most online converters upload your video to their servers,
                convert it there, and let you download the result — which means
                your file sits on someone else&apos;s computer. Presetly works
                differently: the page downloads a WebAssembly build of FFmpeg
                (the same engine professional video software uses) and runs it
                inside your browser, in a background worker.
              </p>
              <p>
                Your video is read directly from your device into the
                browser&apos;s memory, the audio is extracted locally, and the
                result is saved straight back to your device. No upload, no
                server-side copy, no queue — and the extraction even works if
                you disconnect from the internet after the page has loaded.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <FaqSection faqs={FAQS} />

        {/* 7. Related tools — broad discovery at page bottom */}
        <ExploreMoreToolsSection goals={exploreGoals} tools={otherTools} />
      </article>
    </>
  );
}

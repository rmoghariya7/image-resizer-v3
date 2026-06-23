import Link from "next/link";
import { getGoal } from "@/registry/goals";
import { buildGoalHref } from "@/lib/recommendations/engine";
import { SearchCommandPalette } from "@/features/search";

const QUICK_LINK_CONFIGS = [
  { slug: "compress-image-to-15kb", label: "Under 15 KB" },
  { slug: "compress-image-to-20kb", label: "Under 20 KB" },
  { slug: "compress-image-to-50kb", label: "Under 50 KB" },
  { slug: "compress-image-to-100kb", label: "Under 100 KB" },
  { slug: "passport-photo-maker", label: "Passport Photo" },
  { slug: "upsc-photo-resizer", label: "UPSC Photo" },
] as const;

const TRUST_BADGES = [
  "No uploads",
  "No sign-up",
  "Free forever",
  "Mobile-friendly",
];

export function HeroSection() {
  const quickLinks = QUICK_LINK_CONFIGS.map(({ slug, label }) => {
    const goal = getGoal(slug);
    return goal ? { href: buildGoalHref(goal), label } : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <section
      aria-label="Hero"
      className="relative border-b border-border/50 bg-linear-to-b from-background to-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            JPEG &nbsp;·&nbsp; PNG &nbsp;·&nbsp; WebP &nbsp;·&nbsp;
            Browser-based &nbsp;·&nbsp; Free
          </p>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Compress images to{" "}
            <span className="text-primary">the exact size you need</span>
          </h1>

          {/* Subline */}
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Pick a target size. Upload your image. Download the compressed
            file&thinsp;—&thinsp;all in your browser, nothing uploaded to any
            server.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-xl">
            <SearchCommandPalette />
          </div>

          {/* Quick links */}
          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            aria-label="Popular size targets"
          >
            <span className="text-xs text-muted-foreground">Popular:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Trust badges */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label="Trust signals"
          >
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3.5 text-primary"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/registry/goals";
import { SIZE_TARGETS } from "@/registry/size-presets";

// !TODO
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://presetly.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const compressionPages = SIZE_TARGETS.map((target) => ({
    url: `${BASE_URL}/goals/compress-image-to-${target.targetKB}kb`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const goalPages = getSitemapEntries().map((goal) => ({
    url: `${BASE_URL}/goals/${goal.slug}`,
    lastModified: new Date(goal.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...compressionPages, ...goalPages];
}

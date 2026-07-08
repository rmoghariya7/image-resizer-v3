// This file is superseded by app/(compress)/compress-image-under/[size]/opengraph-image.tsx.
// It exists only because the filesystem prohibits deletion in this environment.
//
// NOTE: generateStaticParams is intentionally absent. Next.js App Router prohibits
// combining runtime="edge" with generateStaticParams on the same route.
// This stub generates no OG image -- canonical route handles all traffic.
import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function DeprecatedOgImage() {
  return new ImageResponse(<div style={{ display: "flex" }} />, size)
}

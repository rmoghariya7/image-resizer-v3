// ─── File size formatting ─────────────────────────────────────────────────────
// Shared KB/MB formatter for the image-resizer feature. Sizes flow through the
// app as one-decimal KB values (see ProcessedResult.sizeKB), so KB is the input
// unit everywhere.

/**
 * Human-readable file size from a KB value: "485 KB", "14.7 KB", "2.4 MB".
 * Shows one decimal for fractional KB values and for all MB values.
 */
export function formatKB(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`
  return `${Number.isInteger(kb) ? kb : kb.toFixed(1)} KB`
}

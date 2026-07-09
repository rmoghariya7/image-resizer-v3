"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Briefcase,
  Camera,
  Check,
  CreditCard,
  FileDown,
  Fingerprint,
  Globe,
  Landmark,
  MessageCircle,
  Monitor,
  Music2,
  PenLine,
  Plane,
  Play,
  ThumbsUp,
} from "lucide-react";
import {
  RESIZE_PRESET_CATEGORIES,
  getRelatedResizePresets,
  getResizePresetsByCategory,
  type ResizePreset,
  type ResizePresetCategory,
  type ResizePresetIcon,
} from "@/registry/resize-presets";

interface Props {
  activePresetId: string | null;
  onSelect: (preset: ResizePreset) => void;
  disabled?: boolean;
}

// Registry stores serializable icon ids; the mapping to React components
// lives here so the registry stays a pure data module. Platform ids map to
// neutral lucide equivalents — this lucide version ships no brand icons.
const PRESET_ICONS: Record<ResizePresetIcon, LucideIcon> = {
  landmark: Landmark,
  plane: Plane,
  fingerprint: Fingerprint,
  "credit-card": CreditCard,
  "pen-line": PenLine,
  instagram: Camera,
  facebook: ThumbsUp,
  linkedin: Briefcase,
  twitter: MessageCircle,
  youtube: Play,
  music: Music2,
  globe: Globe,
  "app-window": AppWindow,
  monitor: Monitor,
  "file-down": FileDown,
};

/**
 * The primary interaction of the Image Resizer: goal-first preset cards.
 * Users pick a destination ("YouTube Thumbnail", "Aadhaar Update") and every
 * technical setting is configured automatically — the Presetly USP.
 *
 * Mobile-first: category tabs + a responsive card grid — no horizontal
 * scrolling, every card is a large touch target. After a selection, a
 * "You may also need" strip suggests related presets.
 */
export function ResizePresetPicker({
  activePresetId,
  onSelect,
  disabled = false,
}: Props) {
  const [category, setCategory] = useState<ResizePresetCategory>("compression");
  const presets = getResizePresetsByCategory(category);

  // Related suggestions — only when the selection belongs to the visible
  // category, so switching tabs never shows chips from another world.
  const related =
    activePresetId && presets.some((p) => p.id === activePresetId)
      ? getRelatedResizePresets(activePresetId)
      : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="px-3 py-3 md:px-5 md:py-5">
        <p className="text-sm font-semibold text-foreground">
          What are you resizing for?
        </p>
        <p className="mt-0.5 mb-2 text-xs text-muted-foreground md:mb-3">
          Pick the dimensions or file size you need — everything else is set
          automatically.
        </p>

        {/* Category tabs — wrap to two rows on narrow screens, never scroll */}
        <div
          role="group"
          aria-label="Preset category"
          className="mb-2 grid grid-cols-3 gap-1 rounded-xl border border-border bg-muted/40 p-1 sm:grid-cols-5 md:mb-3"
        >
          {RESIZE_PRESET_CATEGORIES.map((cat) => {
            const isActive = cat.id === category;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                disabled={disabled}
                aria-pressed={isActive}
                className={[
                  "rounded-lg px-1 py-2 text-xs font-semibold transition-colors md:text-sm",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  "disabled:pointer-events-none disabled:opacity-50",
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Preset cards — 2 cols mobile, 3 cols sm+; no horizontal scrolling */}
        <div
          role="group"
          aria-label={`${category} size presets`}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {presets.map((preset) => {
            const isActive = preset.id === activePresetId;
            const Icon = PRESET_ICONS[preset.icon];
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelect(preset)}
                disabled={disabled}
                aria-pressed={isActive}
                aria-label={
                  preset.kind === "dimensions"
                    ? `${preset.label} — ${preset.width} by ${preset.height} pixels, ${preset.description}${isActive ? " (selected)" : ""}`
                    : `${preset.label} — compress to at most ${preset.targetKB} kilobytes, ${preset.description}${isActive ? " (selected)" : ""}`
                }
                className={[
                  // Mobile: compact icon + two-line row. Desktop (md+): the
                  // original column card with helper description — unchanged.
                  "relative flex min-h-11 items-center gap-2.5 rounded-xl border p-2 text-left transition-all",
                  "md:min-h-0 md:flex-col md:items-start md:gap-2 md:p-3",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  "disabled:pointer-events-none disabled:opacity-50",
                  isActive
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-white hover:border-primary/40 hover:shadow-sm",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors md:h-8 md:w-8 md:rounded-lg",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                <span className="min-w-0 pr-4 md:pr-0">
                  <span className="block truncate text-sm font-semibold leading-tight text-foreground md:whitespace-normal">
                    {preset.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] leading-tight text-muted-foreground md:mt-1">
                    {preset.kind === "dimensions"
                      ? `${preset.width} × ${preset.height}px`
                      : "Automatic quality"}
                  </span>
                  <span className="mt-0.5 hidden text-[11px] leading-snug text-muted-foreground md:block">
                    {preset.description}
                  </span>
                </span>

                {/* Checkmark badge — vertically centered on the mobile row */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm md:right-2 md:top-2 md:h-5 md:w-5 md:translate-y-0"
                  >
                    <Check className="h-2.5 w-2.5 md:h-3 md:w-3" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Related presets — one-tap switch to a sibling destination */}
        {related.length > 0 && (
          <div className="mt-3 md:mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              You may also need
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {related.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelect(preset)}
                  disabled={disabled}
                  className={[
                    "min-h-9 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors",
                    "hover:border-primary/50 hover:bg-muted/50",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    "disabled:pointer-events-none disabled:opacity-50",
                  ].join(" ")}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CompressPresetKey } from "@/registry/presets/schema";
import { ACCEPTED_EXTENSIONS } from "../types";
import { useDropZone } from "../hooks/useDropZone";
import { useScrollToToolOnLoad } from "../hooks/useScrollToToolOnLoad";
import { useSizeFirstResizer } from "../hooks/useSizeFirstResizer";
import { DropZone } from "./DropZone";
import { ProcessingOverlay } from "./ProcessingOverlay";
import { ResultPanel } from "./ResultPanel";
import { SizePresetSelector } from "./SizePresetSelector";

// ─── Scroll diagnostic (enabled via ?debug=scroll in the URL) ────────────────
// Logs window.scrollY, document.activeElement, and getBoundingClientRect() for
// the upload section, target-size card, and Quick Start section — before the
// preset-select re-render (captured synchronously in the click handler) and
// after React commits (captured in a useEffect).
//
// To use: open the page with ?debug=scroll appended to the URL, open DevTools,
// select a preset, and read the [ScrollDiag] groups in the console.

interface DiagSnapshot {
  scrollY: number;
  activeEl: string;
  uploadRect: Pick<DOMRect, "top" | "height"> | null;
  targetSizeRect: Pick<DOMRect, "top" | "height"> | null;
  quickStartRect: Pick<DOMRect, "top" | "height"> | null;
}

function rectSummary(el: Element | null): Pick<DOMRect, "top" | "height"> | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: Math.round(r.top), height: Math.round(r.height) };
}

function elLabel(el: Element | null): string {
  if (!el) return "(none)";
  const tag = el.tagName.toLowerCase();
  const label =
    el.getAttribute("aria-label") ??
    el.getAttribute("aria-labelledby") ??
    (el as HTMLElement).innerText?.slice(0, 40) ??
    "";
  return label ? `${tag}[${label}]` : tag;
}

function captureSnapshot(sizeCardEl: HTMLElement | null): DiagSnapshot {
  return {
    scrollY: Math.round(window.scrollY),
    activeEl: elLabel(document.activeElement),
    uploadRect: rectSummary(
      document.querySelector(
        '[aria-label="Image upload"], [aria-label="Compressing image"], [aria-label="Choose compression target"]'
      )
    ),
    targetSizeRect: rectSummary(sizeCardEl),
    quickStartRect: rectSummary(
      document.querySelector('[aria-labelledby="quick-steps-heading"]')
    ),
  };
}

function logDiag(before: DiagSnapshot, after: DiagSnapshot, label: string) {
  // eslint-disable-next-line no-console
  console.group(`[ScrollDiag] ${label}`);
  // eslint-disable-next-line no-console
  console.log(
    `scrollY      before=${before.scrollY}  after=${after.scrollY}  Δ=${after.scrollY - before.scrollY}`
  );
  // eslint-disable-next-line no-console
  console.log(
    `activeElement  before="${before.activeEl}"  after="${after.activeEl}"`
  );
  for (const key of ["uploadRect", "targetSizeRect", "quickStartRect"] as const) {
    const b = before[key];
    const a = after[key];
    if (b && a) {
      // eslint-disable-next-line no-console
      console.log(
        `${key}  top: ${b.top}→${a.top} (Δ${a.top - b.top})  height: ${b.height}→${a.height} (Δ${a.height - b.height})`
      );
    } else {
      // eslint-disable-next-line no-console
      console.log(`${key}  (not found in DOM)`);
    }
  }
  // eslint-disable-next-line no-console
  console.groupEnd();
}

function useScrollDiag(sizeCardRef: React.RefObject<HTMLDivElement | null>) {
  const diagRef = useRef<{ before: DiagSnapshot; label: string } | null>(null);
  const isDebug =
    typeof window !== "undefined" &&
    window.location.search.includes("debug=scroll");

  const capture = useCallback(
    (label: string) => {
      if (!isDebug) return;
      diagRef.current = {
        before: captureSnapshot(sizeCardRef.current),
        label,
      };
    },
    [isDebug, sizeCardRef]
  );

  // Runs after every commit — consumes the pending capture if one exists.
  useEffect(() => {
    if (!diagRef.current) return;
    const { before, label } = diagRef.current;
    diagRef.current = null;
    const after = captureSnapshot(sizeCardRef.current);
    logDiag(before, after, label);
  });

  return { capture };
}

interface Props {
  defaultPresetKey: CompressPresetKey;
}

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

export function SizeFirstTool({ defaultPresetKey }: Props) {
  const { state, loadFile, process, reset } = useSizeFirstResizer();

  // Tracks which preset the user has chosen in the idle-state selector.
  // Initialized to the page's preset; can be changed before upload.
  const [pendingPreset, setPendingPreset] =
    useState<CompressPresetKey>(defaultPresetKey);
  // Ref so the auto-process effect always reads the latest value without
  // making pendingPreset a dep that would re-register the effect on every change.
  const pendingPresetRef = useRef<CompressPresetKey>(pendingPreset);
  // eslint-disable-next-line react-hooks/refs -- intentional latest-ref sync during render
  pendingPresetRef.current = pendingPreset;

  // Auto-process: fires once each time a new file finishes loading.
  // 'ready' → call process() → 'processing' → 'done'. No loop risk because
  // process() only runs from 'ready' or 'done' (guard inside the hook), and
  // the effect condition is only true for 'ready'.
  useEffect(() => {
    if (state.status === "ready") {
      process(pendingPresetRef.current);
    }
  }, [state.status, process]);

  const isDroppable = state.status === "idle" || state.status === "error";
  const isProcessing =
    state.status === "loading" || state.status === "processing";
  // Files are also accepted in the done state — dropping, pasting, or picking
  // a new image replaces the current one immediately (Canva/Figma-style),
  // with no confirmation prompt.
  const canAcceptFile = isDroppable || state.status === "done";

  // Single entry point for every incoming file (drop, paste, picker, camera).
  // When replacing from the done state, the most recently used preset is
  // carried over so the new image is processed with the same target size.
  const handleIncomingFile = (file: File) => {
    if (state.status === "done") {
      setPendingPreset(state.activePresetKey);
    }
    loadFile(file);
  };

  const {
    status: dropStatus,
    validationError,
    fileInputRef,
    cameraInputRef,
    containerProps,
    openFilePicker,
    openCamera,
    onInputChange,
  } = useDropZone({
    onFile: handleIncomingFile,
    disabled: !canAcceptFile,
  });

  // Ref for the SizePresetSelector wrapper — used by the diagnostic hook to
  // measure the card's bounding rect before and after preset selection.
  const sizeCardRef = useRef<HTMLDivElement>(null);
  const { capture } = useScrollDiag(sizeCardRef);

  // ─── Tool-root scroll anchor ─────────────────────────────────────────────────
  // Wraps every state's UI so the container exists across re-renders. The
  // sticky site header (h-14 = 56px) is compensated via `scroll-mt-16` on the
  // wrapper — no hard-coded pixel offsets in JS.
  const toolRootRef = useRef<HTMLDivElement>(null);

  // All viewports: auto-scroll to the tool once per page load so the preset
  // selector is immediately visible. Never re-triggers afterwards — preset
  // changes / uploads / processing update state without remounting.
  useScrollToToolOnLoad(toolRootRef);

  // Scrolls the top of the tool into view. Called ONLY from explicit
  // user-initiated preset changes (never on mount / initial page load), so the
  // page stays stable everywhere else. Runs in rAF so it fires after React has
  // committed the new state — the layout has already settled, avoiding jumps
  // mid-smooth-scroll. Respects prefers-reduced-motion.
  const scrollToToolTop = useCallback(() => {
    requestAnimationFrame(() => {
      const el = toolRootRef.current;
      if (!el) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    });
  }, []);

  const handleReprocess = useCallback(
    (presetKey: CompressPresetKey) => {
      process(presetKey);
    },
    [process],
  );

  // Shared wrapper — attaches the scroll anchor + sticky-header offset to
  // whichever state UI is currently rendered.
  const wrap = (children: React.ReactNode) => (
    <div ref={toolRootRef} className="scroll-mt-16">
      {children}
    </div>
  );

  // ─── Done: before/after + download → size picker → reset ────────────────────

  if (state.status === "done") {
    return wrap(
      // containerProps: dragging a new image anywhere onto the tool replaces
      // the current one immediately — no confirmation (Canva/Figma-style).
      <div {...containerProps}>
        {/* Priority 1 — Download result. The image card carries the × (clear)
            action; "Replace image" sits next to the download button. */}
        <ResultPanel
          original={state.original}
          result={state.result}
          onClear={() => {
            // Back to the upload screen, keeping the current preset selected.
            setPendingPreset(state.activePresetKey);
            reset();
          }}
          onReplace={openFilePicker}
        />

        {/* Priority 2 — Change target size (immediately visible after download) */}
        <section
          aria-label="Choose another target size"
          className="bg-gray-50 px-4 pb-8 sm:px-6 md:pb-12"
        >
          {/* sizeCardRef: measured by useScrollDiag to detect height changes */}
          <div className="mx-auto max-w-2xl" ref={sizeCardRef}>
            <SizePresetSelector
              activePresetKey={state.activePresetKey}
              currentSizeKB={state.result.sizeKB}
              onSelect={(key) => {
                capture("done: handleReprocess");
                handleReprocess(key);
                // Explicit user preset change → bring the tool back into view.
                scrollToToolTop();
              }}
              heading="Choose another target size:"
            />
          </div>
        </section>

        {/* Hidden picker input — the DropZone (which owns the usual inputs)
            isn't mounted in the done state, so "Replace image" needs its own. */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          onChange={onInputChange}
        />
      </div>
    );
  }

  // ─── Ready: file info card → size picker ─────────────────────────────────────

  if (state.status === "ready") {
    return wrap(
      <section
        aria-label="Choose compression target"
        className="bg-gray-50 px-4 py-3 sm:px-6 md:py-16"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          {/* File info */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center gap-4 px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.objectUrl}
                alt="Uploaded image preview"
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {state.file.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {formatSize(state.sizeKB)}{" "}
                  <span className="text-muted-foreground/60">
                    · {state.width} × {state.height}px
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Remove image and start over"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Size picker — shown briefly before auto-process fires */}
          <SizePresetSelector
            activePresetKey={pendingPreset}
            currentSizeKB={state.sizeKB}
            onSelect={(key) => {
              process(key);
              // Explicit user preset change → bring the tool back into view.
              scrollToToolTop();
            }}
            heading="Choose target size:"
          />
        </div>
      </section>
    );
  }

  // ─── Processing ──────────────────────────────────────────────────────────────

  if (state.status === "processing") {
    return wrap(
      <section
        aria-label="Compressing image"
        className="bg-gray-50 px-4 py-3 sm:px-6 md:py-16"
      >
        <div className="mx-auto max-w-2xl">
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-14 shadow-sm">
            <ProcessingOverlay progress={state.progress} />
          </div>
        </div>
      </section>
    );
  }

  // ─── Idle / error — drop zone + preset selector ──────────────────────────────

  return wrap(
    // Mobile-first workflow: Select Preset → Upload. The preset selector comes
    // first in the DOM (matching the mobile visual + tab order); on md+ the
    // CSS `order` utilities restore the original desktop arrangement
    // (drop zone first) so the desktop layout is pixel-identical.
    <div className="flex flex-col">
      {/* Step 1 (mobile) — Preset selector near the top of the tool */}
      <div className="order-1 bg-gray-50 px-4 pt-3 pb-1 sm:px-6 md:order-2 md:pt-0 md:pb-6">
        {/* sizeCardRef: measured by useScrollDiag to detect height changes */}
        <div className="mx-auto max-w-2xl" ref={sizeCardRef}>
          <SizePresetSelector
            activePresetKey={pendingPreset}
            onSelect={(key) => {
              capture("idle: setPendingPreset");
              setPendingPreset(key);
              // Explicit user preset change → keep the tool top in view.
              scrollToToolTop();
            }}
            heading="Target size:"
          />
        </div>
      </div>

      {/* Step 2 (mobile) — Upload */}
      <div className="order-2 md:order-1">
        <DropZone
          status={isProcessing ? "idle" : dropStatus}
          validationError={state.status === "error" ? null : validationError}
          disabled={!isDroppable}
          containerProps={containerProps}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
          onInputChange={onInputChange}
          onOpenFilePicker={openFilePicker}
          onOpenCamera={openCamera}
        >
          {isProcessing && <ProcessingOverlay progress={0} />}
        </DropZone>
      </div>

      {state.status === "error" && (
        <div className="order-3 mx-auto mt-4 max-w-2xl px-4 sm:px-6">
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-700">
                {state.message}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-1 text-xs text-red-600 underline underline-offset-2 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useRef } from "react";
import type { Preset } from "@/types/registry";
import type { ResultScreenRecommendations } from "@/lib/recommendations/engine";
import { ACCEPTED_EXTENSIONS } from "../types";
import { useImageResizer } from "../hooks/useImageResizer";
import { useDropZone } from "../hooks/useDropZone";
import { useScrollToToolOnLoad } from "../hooks/useScrollToToolOnLoad";
import { DropZone } from "./DropZone";
import { ProcessingOverlay } from "./ProcessingOverlay";
import { ResultPanel } from "./ResultPanel";
import { ResultRecommendations } from "./ResultRecommendations";

interface Props {
  preset: Preset;
  /** Pre-computed by the server; determines what links appear after compression. */
  recommendations?: ResultScreenRecommendations;
}

export function ImageResizerTool({ preset, recommendations }: Props) {
  const { state, processFile, reset } = useImageResizer(preset);

  // Tool container — scroll anchor with sticky-header compensation via
  // `scroll-mt-16` (site header is h-14 = 56px). Mirrors SizeFirstTool.
  const toolRootRef = useRef<HTMLDivElement>(null);

  // All viewports: auto-scroll to the tool once per page load so the upload
  // area is immediately visible. Never re-triggers afterwards.
  useScrollToToolOnLoad(toolRootRef);

  const isInteractive = state.status === "idle" || state.status === "error";
  const isProcessing =
    state.status === "loading" || state.status === "processing";
  // Files are also accepted in the done state — dropping, pasting, or picking
  // a new image replaces the current one immediately, no confirmation.
  const canAcceptFile = isInteractive || state.status === "done";

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
    onFile: processFile,
    disabled: !canAcceptFile,
  });

  if (state.status === "done") {
    return (
      // containerProps: dragging a new image anywhere onto the tool replaces
      // the current one immediately — no confirmation (Canva/Figma-style).
      <div ref={toolRootRef} className="scroll-mt-16" {...containerProps}>
        {/* The image card carries the × (clear) action; "Replace image" sits
            next to the download button. */}
        <ResultPanel
          original={state.original}
          result={state.result}
          onClear={reset}
          onReplace={openFilePicker}
        />
        {recommendations && (
          <ResultRecommendations recommendations={recommendations} />
        )}
        {/* Bottom breathing room previously provided by the removed button */}
        <div aria-hidden="true" className="h-8 bg-gray-50 md:h-12" />
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

  return (
    <div ref={toolRootRef} className="scroll-mt-16">
      <DropZone
        status={isProcessing ? "idle" : dropStatus}
        validationError={state.status === "error" ? null : validationError}
        disabled={!isInteractive}
        containerProps={containerProps}
        fileInputRef={fileInputRef}
        cameraInputRef={cameraInputRef}
        onInputChange={onInputChange}
        onOpenFilePicker={openFilePicker}
        onOpenCamera={openCamera}
      >
        {isProcessing && (
          <ProcessingOverlay
            progress={state.status === "loading" ? 0 : state.progress}
          />
        )}
      </DropZone>

      {/* Processing error */}
      {state.status === "error" && (
        <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6">
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
                className="mt-1 text-xs text-red-600 underline underline-offset-2 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

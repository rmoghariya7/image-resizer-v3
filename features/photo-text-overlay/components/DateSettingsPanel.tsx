"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllDateFormats } from "@/registry/text-overlay-presets";
import type { Alignment, DateSettings, DateFormatId } from "../types";

interface Props {
  settings: DateSettings;
  onChange: (partial: Partial<DateSettings>) => void;
  disabled?: boolean;
}

const ALIGN_OPTIONS: { value: Alignment; label: string }[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

function toDateInputValue(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Date settings card. Expanded by default — Date is the primary, top field
 * in the settings order — with the enable/disable switch always visible in
 * the header regardless of the card's open/closed state.
 */
export function DateSettingsPanel({
  settings,
  onChange,
  disabled = false,
}: Props) {
  const fieldsDisabled = disabled || !settings.enabled;
  const dateFormats = getAllDateFormats(settings.date);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <Accordion defaultValue={["date"]}>
        <AccordionItem value="date">
          <div className="flex items-center gap-3 px-4 sm:px-5">
            {/* AccordionTrigger's own flex-1 only stretches within its Header's
                internal flex row, not as a sibling of Switch in *this* row —
                so it needs a real flex-1 wrapper here to fill the remaining
                width the way the canonical shadcn accordion usage does. */}
            <div className="min-w-0 flex-1">
              <AccordionTrigger>
                <span className="text-sm font-semibold text-foreground">
                  Date
                </span>
              </AccordionTrigger>
            </div>
            <Switch
              id="date-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => onChange({ enabled: checked })}
              disabled={disabled}
              aria-label="Add a date to the footer"
            />
          </div>

          <AccordionContent className="space-y-4 px-4 pb-4 sm:px-5 sm:pb-5">
            <div>
              <label
                htmlFor="date-value"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                Date
              </label>
              <Input
                id="date-value"
                type="date"
                value={toDateInputValue(settings.date)}
                disabled={fieldsDisabled}
                onChange={(e) => {
                  const next = e.target.value
                    ? new Date(`${e.target.value}T00:00:00`)
                    : settings.date;
                  onChange({ date: next });
                }}
                className="w-auto"
              />
            </div>

            <div>
              <p className="mb-1.5 text-xs font-medium text-foreground">
                Date format
              </p>
              <div
                role="group"
                aria-label="Date format"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              >
                {dateFormats.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    disabled={fieldsDisabled}
                    aria-pressed={f.id === settings.dateFormat}
                    onClick={() =>
                      onChange({ dateFormat: f.id as DateFormatId })
                    }
                    className={[
                      "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                      "disabled:pointer-events-none disabled:opacity-50",
                      f.id === settings.dateFormat
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    ].join(" ")}
                  >
                    {f.example}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-medium text-foreground">
                Alignment
              </p>
              <div
                role="radiogroup"
                aria-label="Date alignment"
                className="flex gap-2"
              >
                {ALIGN_OPTIONS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    role="radio"
                    aria-checked={settings.alignment === a.value}
                    disabled={fieldsDisabled}
                    onClick={() => onChange({ alignment: a.value })}
                    className={[
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                      settings.alignment === a.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    ].join(" ")}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="date-font-size"
                  className="text-xs font-medium text-foreground"
                >
                  Font size
                </label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {settings.fontSizePx}px
                </span>
              </div>
              <input
                id="date-font-size"
                type="range"
                min={16}
                max={64}
                step={1}
                value={settings.fontSizePx}
                disabled={fieldsDisabled}
                onChange={(e) =>
                  onChange({ fontSizePx: Number(e.target.value) })
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

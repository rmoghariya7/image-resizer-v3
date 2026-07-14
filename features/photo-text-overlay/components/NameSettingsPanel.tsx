"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Alignment, NameSettings } from "../types";

interface Props {
  settings: NameSettings;
  onChange: (partial: Partial<NameSettings>) => void;
  disabled?: boolean;
}

const ALIGN_OPTIONS: { value: Alignment; label: string }[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

/**
 * Name settings card. Collapsed by default (Date is the primary, top field) —
 * the enable/disable switch stays visible in the header regardless of whether
 * the card is expanded, so Name can be toggled on/off without opening it.
 */
export function NameSettingsPanel({
  settings,
  onChange,
  disabled = false,
}: Props) {
  const fieldsDisabled = disabled || !settings.enabled;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <Accordion defaultValue={[]}>
        <AccordionItem value="name">
          <div className="flex items-center gap-3 px-4 sm:px-5">
            {/* AccordionTrigger's own flex-1 only stretches within its Header's
                internal flex row, not as a sibling of Switch in *this* row —
                so it needs a real flex-1 wrapper here to fill the remaining
                width the way the canonical shadcn accordion usage does. */}
            <div className="min-w-0 flex-1">
              <AccordionTrigger>
                <span className="text-sm font-semibold text-foreground">
                  Name
                </span>
              </AccordionTrigger>
            </div>
            <Switch
              id="name-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => onChange({ enabled: checked })}
              disabled={disabled}
              aria-label="Add a name to the footer"
            />
          </div>

          <AccordionContent className="space-y-4 px-4 pb-4 sm:px-5 sm:pb-5">
            <div>
              <label
                htmlFor="name-text"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                Text
              </label>
              <Input
                id="name-text"
                type="text"
                value={settings.text}
                disabled={fieldsDisabled}
                placeholder="e.g. John Doe"
                maxLength={80}
                onChange={(e) => onChange({ text: e.target.value })}
              />
            </div>

            <div>
              <p className="mb-1.5 text-xs font-medium text-foreground">
                Alignment
              </p>
              <div
                role="radiogroup"
                aria-label="Name alignment"
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
                  htmlFor="name-font-size"
                  className="text-xs font-medium text-foreground"
                >
                  Font size
                </label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {settings.fontSizePx}px
                </span>
              </div>
              <input
                id="name-font-size"
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

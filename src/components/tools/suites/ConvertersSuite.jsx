"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Binary, Radio, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import { UnitConverter } from "@/tools/UnitConverter/UnitConverter";
import { BinaryTranslator } from "@/tools/BinaryTranslator/BinaryTranslator";
import { MorseCodeTranslator } from "@/tools/MorseCodeTranslator/MorseCodeTranslator";

const CONVERTER_MODES = [
  {
    id: "unit",
    label: "Unit Converter",
    description: "Length, weight, temperature, and speed",
    helper: "Daily unit conversions",
    icon: Ruler,
  },
  {
    id: "binary",
    label: "Binary Translator",
    description: "Convert text to binary and back",
    helper: "Text and binary fast swap",
    icon: Binary,
  },
  {
    id: "morse",
    label: "Morse Translator",
    description: "Translate between text and Morse code",
    helper: "Code and decode Morse quickly",
    icon: Radio,
  },
];

export function ConvertersSuite() {
  return (
    <Tabs defaultValue="unit" className="space-y-5">
      <section className="rounded-2xl border border-border/60 bg-card/25 p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Converters Suite
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Choose your converter
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Convert units and translate binary or Morse from one easier-to-scan workspace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center sm:w-[13rem]">
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">3</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Modes</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">Live</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Translate</p>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          <span>Select a converter card below, then work in the focused workspace panel.</span>
        </div>
        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 lg:grid-cols-3">
          {CONVERTER_MODES.map((mode) => {
            const Icon = mode.icon;
            const isUnit = mode.id === "unit";
            const isBinary = mode.id === "binary";
            return (
              <TabsTrigger
                key={mode.id}
                value={mode.id}
                className={cn(
                  "h-auto min-h-[7rem] items-start justify-start rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left",
                  "data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]"
                )}
              >
                <div className="w-full space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md border border-border/60 bg-background/60 p-1.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-foreground">{mode.label}</p>
                      <p className="whitespace-normal text-xs font-normal leading-relaxed text-muted-foreground">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-medium text-primary/90">{mode.helper}</p>
                    {isUnit ? (
                      <div className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80" aria-hidden>
                        km mi
                      </div>
                    ) : isBinary ? (
                      <div className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80" aria-hidden>
                        0101
                      </div>
                    ) : (
                      <div className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80" aria-hidden>
                        .- -
                      </div>
                    )}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </section>
      <TabsContent value="unit" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Converters Suite
          </p>
          <p className="text-xs text-muted-foreground">Unit converter workspace</p>
        </div>
        <UnitConverter />
      </TabsContent>
      <TabsContent value="binary" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Converters Suite
          </p>
          <p className="text-xs text-muted-foreground">Binary translator workspace</p>
        </div>
        <BinaryTranslator />
      </TabsContent>
      <TabsContent value="morse" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Converters Suite
          </p>
          <p className="text-xs text-muted-foreground">Morse translator workspace</p>
        </div>
        <MorseCodeTranslator />
      </TabsContent>
    </Tabs>
  );
}

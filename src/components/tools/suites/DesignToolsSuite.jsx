"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColorPicker } from "@/tools/ColorPicker/ColorPicker";
import { GradientGenerator } from "@/tools/GradientGenerator/GradientGenerator";

const DESIGN_MODES = [
  {
    id: "color",
    label: "Color Picker",
    description: "HEX, RGB, HSL values and palette shades",
    helper: "Pick exact brand colors quickly",
    icon: Palette,
  },
  {
    id: "gradient",
    label: "Gradient Generator",
    description: "Build and copy CSS gradient snippets",
    helper: "Create smooth backgrounds in seconds",
    icon: WandSparkles,
  },
];

export function DesignToolsSuite() {
  return (
    <Tabs defaultValue="color" className="space-y-5">
      <section className="rounded-2xl border border-border/60 bg-card/25 p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Design Tools Suite
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Choose your design tool
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything for quick visual work: colors, gradients, and ready-to-copy CSS output.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center sm:w-[13rem]">
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">2</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Tools</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">CSS</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Output</p>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          <span>Start with a tool card below, then use the workspace panel.</span>
        </div>
        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:grid-cols-2">
          {DESIGN_MODES.map((mode) => {
            const Icon = mode.icon;
            const isColor = mode.id === "color";
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
                    {isColor ? (
                      <div className="flex items-center gap-1" aria-hidden>
                        <span className="h-3 w-3 rounded-full bg-[#06b6d4]" />
                        <span className="h-3 w-3 rounded-full bg-[#8b5cf6]" />
                        <span className="h-3 w-3 rounded-full bg-[#f43f5e]" />
                      </div>
                    ) : (
                      <div
                        className="h-3 w-12 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400"
                        aria-hidden
                      />
                    )}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </section>
      <TabsContent value="color" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Design Tools Suite
          </p>
          <p className="text-xs text-muted-foreground">Color picker workspace</p>
        </div>
        <ColorPicker />
      </TabsContent>
      <TabsContent value="gradient" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Design Tools Suite
          </p>
          <p className="text-xs text-muted-foreground">Gradient generator workspace</p>
        </div>
        <GradientGenerator />
      </TabsContent>
    </Tabs>
  );
}

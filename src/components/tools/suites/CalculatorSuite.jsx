"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Percent, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScientificCalculator } from "@/tools/ScientificCalculator/ScientificCalculator";
import { PercentageCalculator } from "@/tools/PercentageCalculator/PercentageCalculator";
import { TipCalculator } from "@/tools/TipCalculator/TipCalculator";

const CALCULATORS = [
  {
    id: "scientific",
    label: "Scientific",
    description: "Trig, logs, powers, and expression solving",
    helper: "Advanced formulas and functions",
    icon: Calculator,
  },
  {
    id: "percentage",
    label: "Percentage",
    description: "Percent-of, reverse percent, and change math",
    helper: "Quick business and discount math",
    icon: Percent,
  },
  {
    id: "tip",
    label: "Tip",
    description: "Bill split and gratuity totals per person",
    helper: "Dining totals in one view",
    icon: ReceiptText,
  },
];

export function CalculatorSuite() {
  return (
    <Tabs defaultValue="scientific" className="space-y-5">
      <section className="rounded-2xl border border-border/60 bg-card/25 p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Calculator Suite
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Choose your calculator
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Handle scientific, percentage, and tip workflows from one clear multi-tool workspace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center sm:w-[13rem]">
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">3</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Modes</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">Fast</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Switch</p>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          <span>Pick a calculator card below, then work in the active panel.</span>
        </div>

        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 lg:grid-cols-3">
          {CALCULATORS.map((item) => {
            const Icon = item.icon;
            const isScientific = item.id === "scientific";
            const isPercentage = item.id === "percentage";
            return (
              <TabsTrigger
                key={item.id}
                value={item.id}
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
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="whitespace-normal text-xs font-normal leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-medium text-primary/90">{item.helper}</p>
                    {isScientific ? (
                      <div className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80" aria-hidden>
                        sin(x)
                      </div>
                    ) : isPercentage ? (
                      <div className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80" aria-hidden>
                        25%
                      </div>
                    ) : (
                      <div className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80" aria-hidden>
                        split $
                      </div>
                    )}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </section>

      <TabsContent value="scientific" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Calculator Suite
          </p>
          <p className="text-xs text-muted-foreground">Scientific workspace</p>
        </div>
        <ScientificCalculator />
      </TabsContent>
      <TabsContent value="percentage" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Calculator Suite
          </p>
          <p className="text-xs text-muted-foreground">Percentage workspace</p>
        </div>
        <PercentageCalculator />
      </TabsContent>
      <TabsContent value="tip" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Calculator Suite
          </p>
          <p className="text-xs text-muted-foreground">Tip workspace</p>
        </div>
        <TipCalculator />
      </TabsContent>
    </Tabs>
  );
}

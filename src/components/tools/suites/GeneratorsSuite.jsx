"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyRound, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { PasswordGenerator } from "@/tools/PasswordGenerator/PasswordGenerator";
import { QRCodeGenerator } from "@/tools/QRCodeGenerator/QRCodeGenerator";

const GENERATOR_MODES = [
  {
    id: "password",
    label: "Password Generator",
    description: "Build strong random passwords quickly",
    helper: "Instant secure credentials",
    icon: KeyRound,
  },
  {
    id: "qr",
    label: "QR Code Generator",
    description: "Encode URLs or text into QR format",
    helper: "Share links in one scan",
    icon: QrCode,
  },
];

export function GeneratorsSuite() {
  return (
    <Tabs defaultValue="password" className="space-y-5">
      <section className="rounded-2xl border border-border/60 bg-card/25 p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Generators Suite
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Choose your generator
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Create passwords and QR codes from one clear workspace with copy-ready output.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center sm:w-[13rem]">
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">2</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Tools</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-2">
              <p className="text-base font-semibold text-foreground">Fast</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Output</p>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          <span>Select a generator card below, then use the active workspace panel.</span>
        </div>
        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:grid-cols-2">
          {GENERATOR_MODES.map((mode) => {
            const Icon = mode.icon;
            const isQr = mode.id === "qr";
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
                    {isQr ? (
                      <div className="grid h-6 w-6 grid-cols-3 gap-[2px] rounded-[4px] border border-border/50 bg-background/70 p-[2px]" aria-hidden>
                        <span className="rounded-[2px] bg-foreground/80" />
                        <span className="rounded-[2px] bg-transparent" />
                        <span className="rounded-[2px] bg-foreground/80" />
                        <span className="rounded-[2px] bg-transparent" />
                        <span className="rounded-[2px] bg-foreground/80" />
                        <span className="rounded-[2px] bg-transparent" />
                        <span className="rounded-[2px] bg-foreground/80" />
                        <span className="rounded-[2px] bg-transparent" />
                        <span className="rounded-[2px] bg-foreground/80" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1" aria-hidden>
                        <span className="h-1.5 w-8 rounded-full bg-emerald-500/80" />
                        <span className="h-1.5 w-3 rounded-full bg-foreground/40" />
                      </div>
                    )}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </section>
      <TabsContent value="password" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Generators Suite
          </p>
          <p className="text-xs text-muted-foreground">Password generator workspace</p>
        </div>
        <PasswordGenerator />
      </TabsContent>
      <TabsContent value="qr" className="mt-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Generators Suite
          </p>
          <p className="text-xs text-muted-foreground">QR generator workspace</p>
        </div>
        <QRCodeGenerator />
      </TabsContent>
    </Tabs>
  );
}

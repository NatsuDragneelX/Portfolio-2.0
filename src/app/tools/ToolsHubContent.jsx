"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  Clock3,
  KeyRound,
  Palette,
  RefreshCcw,
  Sparkles,
  Type,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
  text: Type,
  calculator: Calculator,
  converter: RefreshCcw,
  generator: Sparkles,
  design: Palette,
  pomodoro: Clock3,
  expense: Users,
};

const groupedTools = [
  {
    id: "text",
    title: "Text Tools",
    tags: "Count • Case • Clean",
    href: "/tools/text-tools",
    accent: "from-sky-500/25 to-indigo-500/15",
  },
  {
    id: "calculator",
    title: "Calculator",
    tags: "Scientific • Percent • Tip",
    href: "/tools/calculator-suite",
    accent: "from-orange-500/25 to-amber-500/15",
  },
  {
    id: "converter",
    title: "Converters",
    tags: "Unit • Binary • Morse",
    href: "/tools/converters-suite",
    accent: "from-violet-500/25 to-fuchsia-500/15",
  },
  {
    id: "generator",
    title: "Generators",
    tags: "Password • QR",
    href: "/tools/generators-suite",
    accent: "from-cyan-500/25 to-blue-500/15",
  },
  {
    id: "design",
    title: "Design Tools",
    tags: "Color • Gradient",
    href: "/tools/design-tools",
    accent: "from-pink-500/25 to-purple-500/15",
  },
];

const standaloneTools = [
  {
    id: "pomodoro",
    title: "Pomodoro Timer",
    tags: "Focus • Break • Cycle",
    href: "/tools/pomodoro",
    accent: "from-rose-500/25 to-red-500/15",
  },
];

function GroupedToolCard({ tool }) {
  const Icon = iconMap[tool.id] ?? KeyRound;
  return (
    <Link
      href={tool.href}
      className="group flex h-full w-full min-h-[10.75rem] flex-col rounded-2xl border border-border/60 bg-card/30 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_16px_40px_-20px_hsl(var(--primary)/0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={cn(
          "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
          tool.accent
        )}
        aria-hidden
      >
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-base font-semibold text-foreground">{tool.title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{tool.tags}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary/90">
        Open page
      </p>
    </Link>
  );
}

function StandaloneToolCard({ tool }) {
  const Icon = iconMap[tool.id] ?? KeyRound;
  return (
    <Link
      href={tool.href}
      className="group flex h-full w-full min-h-[10.75rem] flex-col rounded-2xl border border-border/60 bg-card/30 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_16px_40px_-20px_hsl(var(--primary)/0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className={cn("mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br", tool.accent)} aria-hidden>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-base font-semibold text-foreground">{tool.title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{tool.tags}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary/90">
        Open tool
      </p>
    </Link>
  );
}

export function ToolsHubContent() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit gap-1 text-muted-foreground hover:text-primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tools</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Toolbox</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Grouped into focused mini-products so you can scan quickly and jump straight into dedicated pages.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              5 suites + 1 standalone tool
            </div>
          </header>
        </div>

        <section className="mt-10">
          <ul className="grid list-none grid-cols-1 gap-4 p-0 min-[560px]:grid-cols-2 lg:grid-cols-3">
            {groupedTools.map((tool) => (
              <li key={tool.id} className="w-full">
                <GroupedToolCard tool={tool} />
              </li>
            ))}
            {standaloneTools.map((tool) => (
              <li key={tool.id} className="w-full">
                <StandaloneToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

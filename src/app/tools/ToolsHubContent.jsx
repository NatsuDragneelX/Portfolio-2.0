"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  KeyRound,
  QrCode,
  Ruler,
  Timer,
  Users,
  Type,
  Receipt,
  Palette,
  Layers,
  Globe,
  Calculator,
  Percent,
  Equal,
  FileText,
  Code2,
  Radio,
  ArrowLeft,
  ChevronRight,
  LayoutGrid,
  List,
  LayoutTemplate,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toolCategories } from "@/config/tools";

const LAYOUT_STORAGE_KEY = "toolsHubLayout";
const BROWSE_STORAGE_KEY = "toolsHubBrowse";

const iconMap = {
  KeyRound,
  QrCode,
  Ruler,
  Timer,
  Users,
  Type,
  Receipt,
  Palette,
  Layers,
  Globe,
  Calculator,
  Percent,
  Equal,
  FileText,
  Code2,
  Radio,
};

function ToolRow({ t }) {
  const Icon = iconMap[t.icon] ?? KeyRound;
  return (
    <li>
      <Link
        href={t.href}
        className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:gap-4 sm:px-5 sm:py-4"
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br sm:h-11 sm:w-11",
            t.accent
          )}
          aria-hidden
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 bg-card/95 text-primary shadow-sm backdrop-blur-sm dark:border-white/15">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-snug text-foreground">{t.title}</p>
          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {t.tagline}
          </p>
        </div>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none"
          aria-hidden
        />
      </Link>
    </li>
  );
}

/** Big icon + title + tagline — scan and pick without opening */
function ToolTile({ t }) {
  const Icon = iconMap[t.icon] ?? KeyRound;
  return (
    <li>
      <Link
        href={t.href}
        className="group flex h-full min-h-[12.5rem] flex-col items-center rounded-2xl border border-border/60 bg-card/30 p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[13.5rem] sm:p-6 motion-reduce:hover:translate-y-0"
      >
        <div
          className={cn(
            "mb-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br shadow-inner transition-transform duration-200 ease-out group-hover:scale-[1.04] sm:h-[5rem] sm:w-[5rem]",
            t.accent
          )}
          aria-hidden
        >
          <div
            className={cn(
              "flex h-[3.65rem] w-[3.65rem] items-center justify-center rounded-2xl border-2 border-white/35 bg-card/95 text-primary shadow-md backdrop-blur-sm transition-[box-shadow,transform] duration-200 dark:border-white/20 sm:h-16 sm:w-16",
              "group-hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_12px_40px_-12px_hsl(var(--primary)/0.55)] group-hover:ring-2 group-hover:ring-primary/30"
            )}
          >
            <Icon
              className="h-7 w-7 drop-shadow-[0_2px_8px_hsl(var(--primary)/0.35)] sm:h-8 sm:w-8"
              strokeWidth={2.15}
            />
          </div>
        </div>
        <p className="text-[15px] font-semibold leading-snug text-foreground sm:text-base">
          {t.title}
        </p>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px] sm:leading-relaxed">
          {t.tagline}
        </p>
        <span className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:text-xs">
          Open →
        </span>
      </Link>
    </li>
  );
}

export function ToolsHubContent({ sections }) {
  const [filter, setFilter] = React.useState("all");
  const [layout, setLayout] = React.useState("grid");
  const [browseMode, setBrowseMode] = React.useState("grouped");

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (v === "list" || v === "grid") setLayout(v);
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(BROWSE_STORAGE_KEY);
      if (v === "grouped" || v === "flat") setBrowseMode(v);
    } catch {
      /* ignore */
    }
  }, []);

  const setLayoutPersist = React.useCallback((next) => {
    setLayout(next);
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setBrowsePersist = React.useCallback((next) => {
    setBrowseMode(next);
    try {
      localStorage.setItem(BROWSE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const visible =
    filter === "all" ? sections : sections.filter((s) => s.id === filter);

  const flatTools = React.useMemo(
    () => sections.flatMap((s) => s.tools),
    [sections]
  );

  const flatToolsFiltered = React.useMemo(() => {
    if (filter === "all") return flatTools;
    return flatTools.filter((t) => t.category === filter);
  }, [flatTools, filter]);

  const flatMeta = React.useMemo(() => {
    if (filter === "all") {
      return {
        title: "All tools",
        subtitle: "Every utility on one page—use category chips to narrow the list.",
      };
    }
    const cat = toolCategories.find((c) => c.id === filter);
    return {
      title: cat?.title ?? "Tools",
      subtitle: cat?.subtitle ?? "",
    };
  }, [filter]);

  const wideGrid = layout === "grid";

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div
        className={cn(
          "mx-auto transition-[max-width] duration-300 ease-out",
          wideGrid ? "max-w-7xl" : "max-w-2xl"
        )}
      >
        <div className="space-y-6">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 w-fit gap-1 text-muted-foreground hover:text-primary"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Tools
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Utilities
            </h1>
            <p className="text-sm leading-relaxed text-foreground/85">
              Lightweight helpers for everyday tasks—passwords, math, colors, text, and
              more. Everything runs in your browser; nothing to install.
            </p>
          </header>

          <div className="flex flex-col gap-4 pt-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div
                className="flex w-fit rounded-xl border border-border/70 bg-muted/20 p-1"
                role="group"
                aria-label="Browse tools"
              >
                <button
                  type="button"
                  onClick={() => setBrowsePersist("grouped")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                    browseMode === "grouped"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Layers className="h-4 w-4" aria-hidden />
                  By section
                </button>
                <button
                  type="button"
                  onClick={() => setBrowsePersist("flat")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                    browseMode === "flat"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutTemplate className="h-4 w-4" aria-hidden />
                  One page
                </button>
              </div>

              <div
                className="flex w-fit rounded-xl border border-border/70 bg-muted/20 p-1"
                role="group"
                aria-label="Choose layout"
              >
                <button
                  type="button"
                  onClick={() => setLayoutPersist("grid")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                    layout === "grid"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden />
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutPersist("list")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                    layout === "list"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="h-4 w-4" aria-hidden />
                  List
                </button>
              </div>

              <p
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/30 sm:text-[11px] sm:tracking-[0.16em] lg:pl-2"
                title="Built with human direction and AI assistance—design, code, and polish."
              >
                Human &amp; AI
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter tools by category"
            >
              <button
                type="button"
                role="tab"
                aria-selected={filter === "all"}
                onClick={() => setFilter("all")}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  filter === "all"
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border/80 bg-background/50 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
                )}
              >
                All
              </button>
              {toolCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                    filter === cat.id
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-border/80 bg-background/50 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  {cat.filterLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-12">
          {browseMode === "flat" ? (
            <section
              className="scroll-mt-24"
              aria-labelledby="tools-flat-heading"
            >
              <div className="mb-4 px-0.5">
                <h2
                  id="tools-flat-heading"
                  className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
                >
                  {flatMeta.title}
                </h2>
                {flatMeta.subtitle ? (
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {flatMeta.subtitle}
                  </p>
                ) : null}
              </div>
              {layout === "grid" ? (
                <ul
                  className={cn(
                    "grid list-none gap-4 p-0 sm:gap-5",
                    "grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  )}
                >
                  {flatToolsFiltered.map((t) => (
                    <ToolTile key={t.slug} t={t} />
                  ))}
                </ul>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/20 shadow-sm backdrop-blur-sm">
                  <ul className="divide-y divide-border/50 p-0">
                    {flatToolsFiltered.map((t) => (
                      <ToolRow key={t.slug} t={t} />
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ) : (
            visible.map((section) => (
              <section
                key={section.id}
                className="scroll-mt-24"
                aria-labelledby={`tools-cat-${section.id}`}
              >
                <div className="mb-4 px-0.5">
                  <h2
                    id={`tools-cat-${section.id}`}
                    className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
                  >
                    {section.title}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {section.subtitle}
                  </p>
                </div>

                {layout === "grid" ? (
                  <ul className="grid list-none grid-cols-1 gap-4 p-0 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    {section.tools.map((t) => (
                      <ToolTile key={t.slug} t={t} />
                    ))}
                  </ul>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/20 shadow-sm backdrop-blur-sm">
                    <ul className="divide-y divide-border/50 p-0">
                      {section.tools.map((t) => (
                        <ToolRow key={t.slug} t={t} />
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

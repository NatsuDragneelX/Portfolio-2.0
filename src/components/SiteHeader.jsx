"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function SiteHeader() {
  const pathname = usePathname();

  const linkClass = (href) =>
    cn(
      "rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:text-primary md:py-1.5",
      pathname === href
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted/50"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-glass">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            {site.name}
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </div>
        <nav className="md:hidden pb-2" aria-label="Primary mobile">
          <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(linkClass(item.href), "whitespace-nowrap text-xs")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

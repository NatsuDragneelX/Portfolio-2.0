"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PALETTES, usePalette } from "@/components/providers/palette-provider";

const paletteLabels = {
  "blue-purple": "Blue + Purple Neon",
  "emerald-slate": "Emerald + Slate",
  "indigo-cyan": "Indigo + Cyan",
  "black-gold": "Black + Gold",
  "red-charcoal": "Red + Charcoal",
  neutral: "Neutral (default)",
};

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { palette, setPalette } = usePalette();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0 border-border/60 bg-background/40"
          aria-label="Theme and appearance"
          disabled={!mounted}
        >
          {!mounted ? (
            <Sun className="h-4 w-4 opacity-50" />
          ) : isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
          {theme === "system" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-3.5 w-3.5" />
          Color theme
        </DropdownMenuLabel>
        {PALETTES.map((p) => (
          <DropdownMenuItem key={p} onClick={() => setPalette(p)}>
            {paletteLabels[p] || p}
            {palette === p && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

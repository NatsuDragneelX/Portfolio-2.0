"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Shuffle } from "lucide-react";
import styles from "./GradientGenerator.module.css";

const DIRECTIONS = [
  { id: "to-r", label: "→ Right", css: "to right" },
  { id: "to-l", label: "← Left", css: "to left" },
  { id: "to-b", label: "↓ Down", css: "to bottom" },
  { id: "to-t", label: "↑ Up", css: "to top" },
  { id: "to-br", label: "↘ Corner", css: "to bottom right" },
  { id: "to-tr", label: "↗ Corner", css: "to top right" },
  { id: "135deg", label: "135°", css: "135deg" },
  { id: "45deg", label: "45°", css: "45deg" },
];

function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

export function GradientGenerator() {
  const [c1, setC1] = React.useState("#6366f1");
  const [c2, setC2] = React.useState("#ec4899");
  const [dirId, setDirId] = React.useState("to-br");
  const [copied, setCopied] = React.useState(false);

  const dir = DIRECTIONS.find((d) => d.id === dirId) ?? DIRECTIONS[4];
  const cssValue = `linear-gradient(${dir.css}, ${c1}, ${c2})`;
  const cssSnippet = `background: ${cssValue};`;

  const randomize = () => {
    setC1(randomHex());
    setC2(randomHex());
    setDirId(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)].id);
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssSnippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div
        className={styles.preview}
        style={{ background: cssValue }}
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Color A
          <input
            type="color"
            value={c1}
            onChange={(e) => setC1(e.target.value)}
            className="h-11 w-full cursor-pointer rounded-md border border-input bg-background"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Color B
          <input
            type="color"
            value={c2}
            onChange={(e) => setC2(e.target.value)}
            className="h-11 w-full cursor-pointer rounded-md border border-input bg-background"
          />
        </label>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium">Direction</span>
        <div className="flex flex-wrap gap-2">
          {DIRECTIONS.map((d) => (
            <Button
              key={d.id}
              type="button"
              size="sm"
              variant={dirId === d.id ? "default" : "outline"}
              onClick={() => setDirId(d.id)}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          CSS
        </span>
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/30 p-3 font-mono text-xs">
          {cssSnippet}
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={copyCss} className="gap-2">
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy CSS"}
        </Button>
        <Button type="button" variant="secondary" onClick={randomize} className="gap-2">
          <Shuffle className="h-4 w-4" />
          Random gradient
        </Button>
      </div>
    </div>
  );
}

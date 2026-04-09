"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import styles from "./ColorPicker.module.css";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  const n = parseInt(h, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/** Returns normalized #rrggbb or null if incomplete / invalid */
function parseFullHex(input) {
  let h = input.trim().replace("#", "");
  if (h.length === 3 && /^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return `#${h.toLowerCase()}`;
}

export function ColorPicker() {
  const [hexInput, setHexInput] = React.useState("#6366f1");
  const [committedHex, setCommittedHex] = React.useState("#6366f1");
  const [copiedKey, setCopiedKey] = React.useState("");

  const parsed = parseFullHex(hexInput);
  React.useEffect(() => {
    if (parsed) setCommittedHex(parsed);
  }, [parsed]);

  const safeHex = parsed ?? committedHex;
  const rgb = hexToRgb(safeHex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };

  const palette = React.useMemo(() => {
    const r = hexToRgb(safeHex);
    if (!r) return [];
    const base = rgbToHsl(r.r, r.g, r.b);
    const steps = [-40, -28, -16, -8, 0, 8, 16, 28, 40];
    return steps.map((dl) => {
      const L = Math.max(4, Math.min(96, base.l + dl));
      const rgb1 = hslToRgb(base.h, base.s, L);
      return rgbToHex(rgb1.r, rgb1.g, rgb1.b);
    });
  }, [safeHex]);

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(label);
      window.setTimeout(() => setCopiedKey(""), 1500);
    } catch {
      /* ignore */
    }
  };

  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hexInvalid = hexInput.trim().length > 1 && !parsed;

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <label className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 border-border shadow-md ring-offset-2 ring-offset-background transition-shadow hover:ring-2 hover:ring-ring/40">
            <span className="sr-only">Open color picker</span>
            <span
              className="absolute inset-0 block"
              style={{ backgroundColor: safeHex }}
              aria-hidden
            />
            <input
              type="color"
              value={safeHex}
              onChange={(e) => setHexInput(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
          <span className="text-center text-[11px] text-muted-foreground sm:text-left">
            Tap to pick
          </span>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <label htmlFor="cp-hex" className="text-sm font-medium">
            Hex value
          </label>
          <Input
            id="cp-hex"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            placeholder="#6366f1"
            className="font-mono uppercase"
            spellCheck={false}
            autoComplete="off"
          />
          {hexInvalid ? (
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Finish a 6-digit hex (or 3-digit shorthand). Preview uses your last valid
              color until then.
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "HEX", value: safeHex },
          { label: "RGB", value: rgbStr },
          { label: "HSL", value: hslStr },
        ].map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 rounded-lg border border-border/60 bg-card/40 p-3"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {row.label}
            </span>
            <span className="break-all font-mono text-sm text-foreground">
              {row.value || "—"}
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="mt-auto w-full gap-1"
              onClick={() => copy(row.label, row.value)}
            >
              <Copy className="h-3.5 w-3.5" />
              {copiedKey === row.label ? "Copied" : "Copy"}
            </Button>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Shade palette</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
          {palette.map((c, i) => (
            <button
              key={`${c}-${i}`}
              type="button"
              title={c}
              className={styles.swatch}
              style={{ backgroundColor: c }}
              onClick={() => {
                setHexInput(c);
                copy("swatch", c);
              }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Swatches share the same hue and saturation; only lightness changes. Tap one to
          make it active and copy its hex.
        </p>
      </div>
    </div>
  );
}

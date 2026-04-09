"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./PasswordGenerator.module.css";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUM = "0123456789";
const SYM = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function randomInt(max) {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function pickFrom(set) {
  return set[randomInt(set.length)];
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generatePassword(length, opts) {
  const sets = [];
  if (opts.lower) sets.push(LOWER);
  if (opts.upper) sets.push(UPPER);
  if (opts.number) sets.push(NUM);
  if (opts.symbol) sets.push(SYM);
  const pool =
    sets.length > 0 ? sets.join("") : LOWER;
  const useSets = sets.length > 0 ? sets : [LOWER];

  const n = Math.max(6, Math.min(50, length));
  const requiredCount = Math.min(n, useSets.length);
  const chars = [];

  const order = shuffleInPlace([...useSets.map((_, i) => i)]).slice(
    0,
    requiredCount
  );
  for (let k = 0; k < requiredCount; k++) {
    chars.push(pickFrom(useSets[order[k]]));
  }
  while (chars.length < n) {
    chars.push(pickFrom(pool));
  }
  shuffleInPlace(chars);
  return chars.join("");
}

function passwordStrength(password, poolSizeEstimate) {
  if (!password.length) return { score: 0, label: "—", width: 0, color: "" };
  const variety = new Set(password.split("")).size / password.length;
  const bits =
    password.length * Math.log2(Math.max(2, poolSizeEstimate)) * (0.5 + variety * 0.5);
  let score = Math.min(100, Math.round((bits / 80) * 100));
  let label = "Weak";
  let color = "hsl(0 72% 45%)";
  if (score >= 85) {
    label = "Very strong";
    color = "hsl(158 72% 40%)";
  } else if (score >= 65) {
    label = "Strong";
    color = "hsl(142 55% 40%)";
  } else if (score >= 40) {
    label = "Medium";
    color = "hsl(43 90% 45%)";
  } else if (score >= 20) {
    label = "Fair";
    color = "hsl(35 90% 45%)";
  }
  return { score, label, width: score, color };
}

function estimatePoolSize(opts) {
  let s = 0;
  if (opts.lower) s += 26;
  if (opts.upper) s += 26;
  if (opts.number) s += 10;
  if (opts.symbol) s += SYM.length;
  return s || 26;
}

export function PasswordGenerator() {
  const [length, setLength] = React.useState(16);
  const [upper, setUpper] = React.useState(true);
  const [lower, setLower] = React.useState(true);
  const [number, setNumber] = React.useState(true);
  const [symbol, setSymbol] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const opts = React.useMemo(
    () => ({ upper, lower, number, symbol }),
    [upper, lower, number, symbol]
  );

  const regen = React.useCallback(() => {
    setPassword(generatePassword(length, opts));
  }, [length, opts]);

  React.useEffect(() => {
    regen();
  }, [length, upper, lower, number, symbol, regen]);

  const poolSize = estimatePoolSize(opts);
  const strength = passwordStrength(password, poolSize);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const toggleRow = (id, checked, setChecked) => (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 transition-colors hover:bg-muted/30">
      <span className="text-sm font-medium capitalize">{id}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="h-4 w-4 rounded border-input accent-primary"
      />
    </label>
  );

  const anyCharset = lower || upper || number || symbol;

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="pw-length" className="text-sm font-medium">
            Length: {length}
          </label>
          <span className="text-xs text-muted-foreground">6–50</span>
        </div>
        <input
          id="pw-length"
          type="range"
          min={6}
          max={50}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary",
            "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm"
          )}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {toggleRow("lowercase", lower, setLower)}
        {toggleRow("uppercase", upper, setUpper)}
        {toggleRow("numbers", number, setNumber)}
        {toggleRow("symbols", symbol, setSymbol)}
      </div>
      {!anyCharset ? (
        <p className="text-xs text-red-600 dark:text-red-400">
          Enable at least one character type (lowercase used if none).
        </p>
      ) : null}

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </p>
        <Input
          readOnly
          value={password}
          className="font-mono text-sm"
          aria-live="polite"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Strength</span>
          <span className="text-muted-foreground">{strength.label}</span>
        </div>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{
              width: `${strength.width}%`,
              backgroundColor: strength.color || "hsl(var(--muted-foreground))",
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={regen} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate
        </Button>
        <Button type="button" variant="secondary" onClick={copy} className="gap-2">
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

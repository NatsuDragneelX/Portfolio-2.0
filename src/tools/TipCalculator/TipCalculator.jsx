"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./TipCalculator.module.css";

const PRESETS = [10, 15, 18, 20, 25];

export function TipCalculator() {
  const [bill, setBill] = React.useState("50");
  const [tipPct, setTipPct] = React.useState(18);
  const [people, setPeople] = React.useState("2");

  const billNum = parseFloat(String(bill).replace(",", "."));
  const n = Math.max(1, parseInt(String(people).replace(/\D/g, ""), 10) || 1);
  const validBill = Number.isFinite(billNum) && billNum >= 0;
  const tipTotal = validBill ? (billNum * tipPct) / 100 : 0;
  const grand = validBill ? billNum + tipTotal : 0;
  const tipEach = tipTotal / n;
  const totalEach = grand / n;

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="tip-bill" className="text-sm font-medium">
            Bill amount
          </label>
          <Input
            id="tip-bill"
            inputMode="decimal"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="0.00"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tip-people" className="text-sm font-medium">
            People
          </label>
          <Input
            id="tip-people"
            inputMode="numeric"
            min={1}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="font-mono"
          />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="tip-slider" className="text-sm font-medium">
            Tip: {tipPct}%
          </label>
          <span className="text-xs text-muted-foreground">0–40%</span>
        </div>
        <input
          id="tip-slider"
          type="range"
          min={0}
          max={40}
          value={tipPct}
          onChange={(e) => setTipPct(Number(e.target.value))}
          className={cn("w-full cursor-pointer accent-primary", styles.track)}
        />
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <Button
              key={p}
              type="button"
              size="sm"
              variant={tipPct === p ? "default" : "outline"}
              onClick={() => setTipPct(p)}
            >
              {p}%
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tip per person
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">
            {validBill ? `$${tipEach.toFixed(2)}` : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total per person
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">
            {validBill ? `$${totalEach.toFixed(2)}` : "—"}
          </p>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Total tip {validBill ? `$${tipTotal.toFixed(2)}` : "—"} · Grand total{" "}
        {validBill ? `$${grand.toFixed(2)}` : "—"}
      </p>
    </div>
  );
}

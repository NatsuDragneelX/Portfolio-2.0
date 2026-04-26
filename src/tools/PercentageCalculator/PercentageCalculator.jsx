"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./PercentageCalculator.module.css";

function num(s) {
  const v = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(v) ? v : NaN;
}

function fmt(v) {
  if (!Number.isFinite(v)) return "—";
  return Number.isInteger(v) ? String(v) : v.toFixed(4).replace(/\.?0+$/, "");
}

export function PercentageCalculator() {
  const [x1, setX1] = React.useState("25");
  const [y1, setY1] = React.useState("200");
  const [x2, setX2] = React.useState("15");
  const [y2, setY2] = React.useState("80");
  const [x3, setX3] = React.useState("100");
  const [p3, setP3] = React.useState("20");
  const [dir3, setDir3] = React.useState("inc");
  const [finalV, setFinalV] = React.useState("120");
  const [pct4, setPct4] = React.useState("20");

  const q1 = y1 ? (num(x1) / num(y1)) * 100 : NaN;
  const q2 = (num(x2) / 100) * num(y2);
  const q3 =
    dir3 === "inc"
      ? num(x3) * (1 + num(p3) / 100)
      : num(x3) * (1 - num(p3) / 100);
  const q4 = num(finalV) / (1 + num(pct4) / 100);

  return (
    <div className="glass-panel space-y-5 rounded-2xl p-4 sm:p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Percentage Workspace
        </p>
        <h3 className="text-lg font-semibold text-foreground">Choose what you want to calculate</h3>
      </div>

      <Tabs defaultValue="ratio" className="space-y-4">
        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 lg:grid-cols-2">
          <TabsTrigger
            value="ratio"
            className="h-auto rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10"
          >
            X is what % of Y?
          </TabsTrigger>
          <TabsTrigger
            value="part"
            className="h-auto rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10"
          >
            What is X% of Y?
          </TabsTrigger>
          <TabsTrigger
            value="change"
            className="h-auto rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10"
          >
            Increase or decrease by %
          </TabsTrigger>
          <TabsTrigger
            value="reverse"
            className="h-auto rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10"
          >
            Reverse percentage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ratio" className="mt-0">
          <div className={styles.block}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">X</label>
                <Input
                  inputMode="decimal"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Y</label>
                <Input
                  inputMode="decimal"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Result</p>
              <p className="font-mono text-2xl font-semibold text-primary">{fmt(q1)}%</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="part" className="mt-0">
          <div className={styles.block}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">X (%)</label>
                <Input
                  inputMode="decimal"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Y</label>
                <Input
                  inputMode="decimal"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Result</p>
              <p className="font-mono text-2xl font-semibold text-primary">{fmt(q2)}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="change" className="mt-0">
          <div className={styles.block}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Original X</label>
                <Input
                  inputMode="decimal"
                  value={x3}
                  onChange={(e) => setX3(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Percent Y</label>
                <Input
                  inputMode="decimal"
                  value={p3}
                  onChange={(e) => setP3(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDir3("inc")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  dir3 === "inc"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Increase
              </button>
              <button
                type="button"
                onClick={() => setDir3("dec")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  dir3 === "dec"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Decrease
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">New value</p>
              <p className="font-mono text-2xl font-semibold text-primary">{fmt(q3)}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reverse" className="mt-0">
          <div className={styles.block}>
            <p className="mb-3 text-xs text-muted-foreground">
              If a value grew by Y% to reach <strong>Final</strong>, what was the original?
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Final value</label>
                <Input
                  inputMode="decimal"
                  value={finalV}
                  onChange={(e) => setFinalV(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Increase Y (%)</label>
                <Input
                  inputMode="decimal"
                  value={pct4}
                  onChange={(e) => setPct4(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Original value</p>
              <p className="font-mono text-2xl font-semibold text-primary">{fmt(q4)}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

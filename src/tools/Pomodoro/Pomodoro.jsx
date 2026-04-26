"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Pomodoro.module.css";

const R = 52;
const C = 2 * Math.PI * R;
const PRESETS = [
  { id: "classic", label: "Classic", focus: 25, rest: 5 },
  { id: "deep", label: "Deep Work", focus: 50, rest: 10 },
  { id: "sprint", label: "Sprint", focus: 15, rest: 3 },
];

function playChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.45);
    ctx.resume?.();
  } catch {
    /* ignore */
  }
}

export function Pomodoro() {
  const [focusMin, setFocusMin] = React.useState(25);
  const [breakMin, setBreakMin] = React.useState(5);
  const [mode, setMode] = React.useState("focus");
  const [running, setRunning] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(25 * 60);
  const [phaseTotal, setPhaseTotal] = React.useState(25 * 60);

  const modeRef = React.useRef(mode);

  React.useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const durationFor = React.useCallback(
    (m) => (m === "focus" ? focusMin : breakMin) * 60,
    [focusMin, breakMin]
  );

  React.useEffect(() => {
    if (running) return;
    const total = durationFor(mode);
    setPhaseTotal(total);
    setSecondsLeft(total);
  }, [focusMin, breakMin, mode, running, durationFor]);

  React.useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 0) return s;
        if (s > 1) return s - 1;
        playChime();
        const current = modeRef.current;
        const next = current === "focus" ? "break" : "focus";
        const nextDur = (next === "focus" ? focusMin : breakMin) * 60;
        modeRef.current = next;
        setMode(next);
        setPhaseTotal(nextDur);
        return nextDur;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, focusMin, breakMin]);

  const progress =
    phaseTotal > 0 ? (phaseTotal - secondsLeft) / phaseTotal : 0;
  const offset = C * (1 - Math.min(1, Math.max(0, progress)));

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const focusPct = Math.round(progress * 100);
  const activePreset =
    PRESETS.find((p) => p.focus === focusMin && p.rest === breakMin)?.id ?? "";

  const reset = () => {
    setRunning(false);
    const t = durationFor(mode);
    setPhaseTotal(t);
    setSecondsLeft(t);
  };

  const applyPreset = (preset) => {
    setRunning(false);
    setFocusMin(preset.focus);
    setBreakMin(preset.rest);
    const t = (mode === "focus" ? preset.focus : preset.rest) * 60;
    setPhaseTotal(t);
    setSecondsLeft(t);
  };

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Session style
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left transition-colors",
                activePreset === preset.id
                  ? "border-primary/50 bg-primary/10"
                  : "border-border/60 bg-card/30 hover:border-border hover:bg-card/50"
              )}
            >
              <p className="text-sm font-semibold text-foreground">{preset.label}</p>
              <p className="text-xs text-muted-foreground">
                {preset.focus}m focus • {preset.rest}m break
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-2xl border border-border/60 bg-card/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
                mode === "focus"
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {mode === "focus" ? "Focus phase" : "Break phase"}
            </div>
            <p className="text-xs text-muted-foreground">{focusPct}% complete</p>
          </div>

          <div className="relative mx-auto mb-4 flex w-fit items-center justify-center">
            <svg className={styles.ring} width="220" height="220" viewBox="0 0 120 120" aria-hidden>
              <circle className={styles.ringTrack} cx="60" cy="60" r={R} />
              <circle
                className={styles.ringProgress}
                cx="60"
                cy="60"
                r={R}
                strokeDasharray={C}
                strokeDashoffset={offset}
              />
            </svg>
            <p
              className="absolute font-mono text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl"
              aria-live="polite"
            >
              {mm}:{ss}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="min-w-[8.5rem] gap-2"
            >
              {running ? (
                <>
                  <Pause className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Start session
                </>
              )}
            </Button>
            <Button type="button" variant="secondary" onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border/60 bg-card/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Custom timing
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="pom-focus" className="text-sm font-medium">
                Focus (minutes)
              </label>
              <Input
                id="pom-focus"
                type="number"
                min={1}
                max={120}
                value={focusMin}
                disabled={running}
                onChange={(e) => setFocusMin(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="pom-break" className="text-sm font-medium">
                Break (minutes)
              </label>
              <Input
                id="pom-break"
                type="number"
                min={1}
                max={60}
                value={breakMin}
                disabled={running}
                onChange={(e) => setBreakMin(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border/60 bg-background/50 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Current cycle</p>
              <p className="text-sm font-semibold text-foreground">{focusMin + breakMin} min total</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Now running</p>
              <p className="text-sm font-semibold text-foreground">
                {running ? (mode === "focus" ? "Focus" : "Break") : "Paused"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Pomodoro.module.css";

const R = 52;
const C = 2 * Math.PI * R;

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

  const reset = () => {
    setRunning(false);
    const t = durationFor(mode);
    setPhaseTotal(t);
    setSecondsLeft(t);
  };

  return (
    <div className="glass-panel space-y-8 rounded-2xl p-4 sm:p-8">
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

      <div className="flex flex-col items-center gap-6">
        <div
          className={cn(
            "text-sm font-medium uppercase tracking-widest",
            mode === "focus" ? "text-primary" : "text-muted-foreground"
          )}
        >
          {mode === "focus" ? "Focus" : "Break"}
        </div>
        <svg
          className={styles.ring}
          width="200"
          height="200"
          viewBox="0 0 120 120"
          aria-hidden
        >
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
          className="font-mono text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl"
          aria-live="polite"
        >
          {mm}:{ss}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="min-w-[7rem] gap-2"
          >
            {running ? (
              <>
                <Pause className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start
              </>
            )}
          </Button>
          <Button type="button" variant="secondary" onClick={reset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

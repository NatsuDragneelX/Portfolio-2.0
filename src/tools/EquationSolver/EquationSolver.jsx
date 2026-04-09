"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./EquationSolver.module.css";

function parseLinearSide(str) {
  let s = str.replace(/\*/g, "").trim();
  if (!s) return { a: 0, b: 0 };
  if (s[0] !== "-" && s[0] !== "+") s = `+${s}`;
  const terms = s.split(/(?=[+-])/g).filter((t) => t.length > 0);
  let a = 0;
  let b = 0;
  for (const term of terms) {
    const t = term.toLowerCase();
    if (t === "+" || t === "-") continue;
    if (t.includes("x")) {
      const coefStr = t.replace(/x/g, "");
      let coef = 1;
      if (coefStr === "" || coefStr === "+") coef = 1;
      else if (coefStr === "-") coef = -1;
      else coef = parseFloat(coefStr);
      if (Number.isNaN(coef)) coef = 1;
      a += coef;
    } else {
      const n = parseFloat(t);
      if (!Number.isNaN(n)) b += n;
    }
  }
  return { a, b };
}

function parseDeg2(side) {
  let s = side.replace(/\s/g, "").toLowerCase().replace(/\*\*2/g, "^2");
  s = s.replace(/x²/g, "x^2");
  s = s.replace(/x\^2/g, "§Q§");
  if (s[0] !== "-" && s[0] !== "+") s = `+${s}`;
  const terms = s.split(/(?=[+-])/g).filter((t) => t.length > 0);
  let A = 0;
  let B = 0;
  let C = 0;
  for (const term of terms) {
    const t = term.toLowerCase();
    if (t === "+" || t === "-") continue;
    if (t.includes("§q§")) {
      const coefStr = t.replace("§q§", "");
      let coef = 1;
      if (coefStr === "" || coefStr === "+") coef = 1;
      else if (coefStr === "-") coef = -1;
      else coef = parseFloat(coefStr);
      if (Number.isNaN(coef)) coef = 1;
      A += coef;
    } else if (t.endsWith("x") && !t.includes("§")) {
      const coefStr = t.slice(0, -1);
      let coef = 1;
      if (coefStr === "" || coefStr === "+") coef = 1;
      else if (coefStr === "-") coef = -1;
      else coef = parseFloat(coefStr);
      if (Number.isNaN(coef)) coef = 1;
      B += coef;
    } else {
      const n = parseFloat(t);
      if (!Number.isNaN(n)) C += n;
    }
  }
  return { a: A, b: B, c: C };
}

function solveEquation(raw) {
  const normalized = raw.replace(/\s+/g, "");
  const isQuad =
    /x\^2/i.test(normalized) ||
    /x²/.test(raw) ||
    /\*\*2/.test(normalized) ||
    /x\*x/i.test(normalized);

  if (!normalized.includes("=")) {
    throw new Error("Include an equals sign, e.g. 2x+3=15");
  }
  const [left, right] = normalized.split("=");
  if (!right.length) throw new Error("Add a right-hand side (e.g. … = 0).");

  if (isQuad) {
    const L = parseDeg2(left);
    const R = parseDeg2(right);
    const A = L.a - R.a;
    const B = L.b - R.b;
    const C = L.c - R.c;
    const steps = [];
    steps.push(
      `Standard form: (${A})x² + (${B})x + (${C}) = 0 after moving everything to one side.`
    );
    if (Math.abs(A) < 1e-12) {
      throw new Error("That simplifies to a linear equation — remove x² or use the linear form.");
    }
    const disc = B * B - 4 * A * C;
    steps.push(`Discriminant D = b² − 4ac = ${disc}.`);
    if (disc < 0) {
      steps.push("D < 0: no real roots (complex solutions only).");
      return { kind: "quad-none", steps, A, B, C, disc };
    }
    if (Math.abs(disc) < 1e-10) {
      const x = (-B) / (2 * A);
      steps.push(`D = 0: one real root x = −b/(2a) = ${x}.`);
      return { kind: "quad-one", steps, roots: [x], A, B, C };
    }
    const s = Math.sqrt(disc);
    const x1 = (-B + s) / (2 * A);
    const x2 = (-B - s) / (2 * A);
    steps.push(`Two roots: x = (−b ± √D) / (2a) → ${x1} and ${x2}.`);
    return { kind: "quad-two", steps, roots: [x1, x2], A, B, C };
  }

  const L = parseLinearSide(left);
  const R = parseLinearSide(right);
  const a = L.a - R.a;
  const b = R.b - L.b;
  const steps = [];
  steps.push(`Collect x on the left: (${L.a}−${R.a})x = (${R.b}−${L.b}) → ${a}x = ${b}.`);
  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) < 1e-12) {
      steps.push("0 = 0: infinitely many solutions (any x works).");
      return { kind: "linear-many", steps };
    }
    steps.push("Contradiction: no solution.");
    return { kind: "linear-none", steps };
  }
  const x = b / a;
  steps.push(`Divide by ${a}: x = ${b}/${a} = ${x}.`);
  return { kind: "linear-one", steps, x };
}

export function EquationSolver() {
  const [input, setInput] = React.useState("2x+3=15");
  const [result, setResult] = React.useState(null);
  const [err, setErr] = React.useState("");

  const run = () => {
    setErr("");
    setResult(null);
    try {
      setResult(solveEquation(input.trim()));
    } catch (e) {
      setErr(e.message || "Could not parse equation.");
    }
  };

  return (
    <div className="glass-panel space-y-4 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <label htmlFor="eq-in" className="text-sm font-medium">
          Equation
        </label>
        <Input
          id="eq-in"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.inputMono}
          placeholder="e.g. 2x+3=15 or x^2+5x+6=0"
          spellCheck={false}
        />
        <p className="text-xs text-muted-foreground">
          Examples: <code className="rounded bg-muted px-1">2x+3=15</code>,{" "}
          <code className="rounded bg-muted px-1">x^2+5x+6=0</code>
        </p>
      </div>
      <Button type="button" onClick={run}>
        Solve
      </Button>

      {err ? (
        <p className="text-sm text-red-600 dark:text-red-400">{err}</p>
      ) : null}

      {result ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">Result</p>
          {result.kind === "linear-one" ? (
            <p className="font-mono text-lg text-primary">x = {result.x}</p>
          ) : null}
          {result.kind === "linear-many" ? (
            <p className="text-sm text-muted-foreground">Infinitely many solutions.</p>
          ) : null}
          {result.kind === "linear-none" ? (
            <p className="text-sm text-muted-foreground">No solution.</p>
          ) : null}
          {result.kind === "quad-two" ? (
            <p className="font-mono text-lg text-primary">
              x = {result.roots[0]} &nbsp;or&nbsp; x = {result.roots[1]}
            </p>
          ) : null}
          {result.kind === "quad-one" ? (
            <p className="font-mono text-lg text-primary">x = {result.roots[0]}</p>
          ) : null}
          {result.kind === "quad-none" ? (
            <p className="text-sm text-muted-foreground">No real roots.</p>
          ) : null}

          <ul className={`${styles.steps} space-y-1`}>
            {result.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

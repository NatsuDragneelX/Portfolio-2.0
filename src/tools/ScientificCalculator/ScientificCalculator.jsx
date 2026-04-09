"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./ScientificCalculator.module.css";

function evaluateExpression(expr) {
  const e = expr
    .replace(/\^/g, "**")
    .replace(/×/g, "*")
    .replace(/÷/g, "/");
  return Function(`"use strict"; return (${e})`)();
}

function CalcKey({ className, ...props }) {
  return (
    <Button
      type="button"
      variant="secondary"
      className={cn(styles.key, className)}
      {...props}
    />
  );
}

export function ScientificCalculator() {
  const [expr, setExpr] = React.useState("");
  const [error, setError] = React.useState("");

  const append = (s) => {
    setError("");
    setExpr((x) => x + s);
  };

  const clearAll = () => {
    setExpr("");
    setError("");
  };

  const clearEntry = () => {
    setError("");
    setExpr("");
  };

  const backspace = () => {
    setError("");
    setExpr((x) => x.slice(0, -1));
  };

  const equals = () => {
    if (!expr.trim()) return;
    try {
      const v = evaluateExpression(expr);
      if (typeof v === "number" && Number.isFinite(v)) {
        setExpr(String(v));
        setError("");
      } else {
        setError("Undefined result");
      }
    } catch {
      setError("Invalid expression");
    }
  };

  return (
    <div className="glass-panel space-y-4 rounded-2xl p-4 sm:p-6">
      <div
        className={styles.display}
        role="status"
        aria-live="polite"
        tabIndex={0}
      >
        {error ? (
          <span className="text-red-600 dark:text-red-400">{error}</span>
        ) : (
          expr || "0"
        )}
      </div>

      <div className={styles.keypad}>
        <CalcKey onClick={clearAll}>AC</CalcKey>
        <CalcKey onClick={clearEntry}>CE</CalcKey>
        <CalcKey onClick={backspace}>⌫</CalcKey>
        <CalcKey onClick={() => append("(")}>(</CalcKey>
        <CalcKey onClick={() => append(")")}>)</CalcKey>

        <CalcKey onClick={() => append("7")}>7</CalcKey>
        <CalcKey onClick={() => append("8")}>8</CalcKey>
        <CalcKey onClick={() => append("9")}>9</CalcKey>
        <CalcKey onClick={() => append("/")}>÷</CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.sqrt(")}>
          √
        </CalcKey>

        <CalcKey onClick={() => append("4")}>4</CalcKey>
        <CalcKey onClick={() => append("5")}>5</CalcKey>
        <CalcKey onClick={() => append("6")}>6</CalcKey>
        <CalcKey onClick={() => append("*")}>×</CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.sin(")}>
          sin
        </CalcKey>

        <CalcKey onClick={() => append("1")}>1</CalcKey>
        <CalcKey onClick={() => append("2")}>2</CalcKey>
        <CalcKey onClick={() => append("3")}>3</CalcKey>
        <CalcKey onClick={() => append("-")}>−</CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.cos(")}>
          cos
        </CalcKey>

        <CalcKey onClick={() => append("0")}>0</CalcKey>
        <CalcKey onClick={() => append(".")}>.</CalcKey>
        <CalcKey onClick={() => append("+")}>+</CalcKey>
        <CalcKey
          onClick={equals}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          =
        </CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.tan(")}>
          tan
        </CalcKey>

        <CalcKey className={styles.keySci} onClick={() => append("^")}>
          x^y
        </CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.log10(")}>
          log
        </CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.log(")}>
          ln
        </CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.PI")}>
          π
        </CalcKey>
        <CalcKey className={styles.keySci} onClick={() => append("Math.E")}>
          e
        </CalcKey>
      </div>

      <p className="text-xs text-muted-foreground">
        Trig functions use radians. Build expressions with the keypad; <code className="rounded bg-muted px-1">^</code> is
        power.
      </p>
    </div>
  );
}

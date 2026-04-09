"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LENGTH = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  ft: 0.3048,
  mi: 1609.344,
};

const LENGTH_LABELS = {
  m: "Meters (m)",
  km: "Kilometers (km)",
  cm: "Centimeters (cm)",
  mm: "Millimeters (mm)",
  in: "Inches (in)",
  ft: "Feet (ft)",
  mi: "Miles (mi)",
};

const WEIGHT = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.028349523125,
};

const WEIGHT_LABELS = {
  kg: "Kilograms (kg)",
  g: "Grams (g)",
  lb: "Pounds (lb)",
  oz: "Ounces (oz)",
};

const SPEED = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  mph: 0.44704,
};

const SPEED_LABELS = {
  "m/s": "Meters / second",
  "km/h": "Kilometers / hour",
  mph: "Miles / hour",
};

function convertLength(value, from, to) {
  const base = value * LENGTH[from];
  return base / LENGTH[to];
}

function convertWeight(value, from, to) {
  const base = value * WEIGHT[from];
  return base / WEIGHT[to];
}

function convertSpeed(value, from, to) {
  const base = value * SPEED[from];
  return base / SPEED[to];
}

/** Store temperature as Celsius internally */
function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

function fromCelsius(c, unit) {
  if (unit === "C") return c;
  if (unit === "F") return (c * 9) / 5 + 32;
  if (unit === "K") return c + 273.15;
  return c;
}

const CATEGORIES = [
  { id: "length", label: "Length" },
  { id: "weight", label: "Weight" },
  { id: "temperature", label: "Temperature" },
  { id: "speed", label: "Speed" },
];

function formatNum(n) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e6 || (abs > 0 && abs < 1e-4))
    return n.toExponential(4);
  return Number(n.toPrecision(8)).toString();
}

export function UnitConverter() {
  const [category, setCategory] = React.useState("length");
  const [fromUnit, setFromUnit] = React.useState("m");
  const [toUnit, setToUnit] = React.useState("ft");
  const [input, setInput] = React.useState("1");

  React.useEffect(() => {
    if (category === "length") {
      setFromUnit("m");
      setToUnit("ft");
    } else if (category === "weight") {
      setFromUnit("kg");
      setToUnit("lb");
    } else if (category === "temperature") {
      setFromUnit("C");
      setToUnit("F");
    } else {
      setFromUnit("km/h");
      setToUnit("mph");
    }
  }, [category]);

  const value = parseFloat(String(input).replace(",", "."));
  const output = React.useMemo(() => {
    if (!Number.isFinite(value)) return NaN;
    if (category === "length") return convertLength(value, fromUnit, toUnit);
    if (category === "weight") return convertWeight(value, fromUnit, toUnit);
    if (category === "speed") return convertSpeed(value, fromUnit, toUnit);
    const c = toCelsius(value, fromUnit);
    return fromCelsius(c, toUnit);
  }, [category, value, fromUnit, toUnit]);

  const fromOptions =
    category === "length"
      ? LENGTH_LABELS
      : category === "weight"
        ? WEIGHT_LABELS
        : category === "speed"
          ? SPEED_LABELS
          : { C: "Celsius (°C)", F: "Fahrenheit (°F)", K: "Kelvin (K)" };

  const toOptions = fromOptions;

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <span id="uc-cat-label" className="text-sm font-medium">
          Category
        </span>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="uc-cat" aria-labelledby="uc-cat-label" className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            From
          </p>
          <Input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-base"
          />
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(fromOptions).map(([k, lab]) => (
                <SelectItem key={k} value={k}>
                  {lab}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            To
          </p>
          <div className="flex h-10 items-center rounded-md border border-border/50 bg-muted/30 px-3 font-mono text-base">
            {formatNum(output)}
          </div>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(toOptions).map(([k, lab]) => (
                <SelectItem key={k} value={k}>
                  {lab}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

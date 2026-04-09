"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorldLandmasses } from "./WorldLandmasses";
import styles from "./WorldClock.module.css";

const DEFAULT_CITIES = [
  { id: "ny", label: "New York", tz: "America/New_York" },
  { id: "ldn", label: "London", tz: "Europe/London" },
  { id: "dxb", label: "Dubai", tz: "Asia/Dubai" },
  { id: "tyo", label: "Tokyo", tz: "Asia/Tokyo" },
  { id: "syd", label: "Sydney", tz: "Australia/Sydney" },
  { id: "yyz", label: "Toronto", tz: "America/Toronto" },
  { id: "lax", label: "Los Angeles", tz: "America/Los_Angeles" },
];

const EXTRA_ZONES = [
  { label: "Paris", tz: "Europe/Paris" },
  { label: "Berlin", tz: "Europe/Berlin" },
  { label: "Mumbai", tz: "Asia/Kolkata" },
  { label: "Singapore", tz: "Asia/Singapore" },
  { label: "Seoul", tz: "Asia/Seoul" },
  { label: "São Paulo", tz: "America/Sao_Paulo" },
  { label: "Mexico City", tz: "America/Mexico_City" },
  { label: "Honolulu", tz: "Pacific/Honolulu" },
  { label: "UTC", tz: "UTC" },
];

/** Approximate city centers for map pins (equirectangular projection) */
const TZ_COORDS = {
  "America/New_York": { lat: 40.71, lon: -74.01 },
  "Europe/London": { lat: 51.51, lon: -0.13 },
  "Asia/Dubai": { lat: 25.2, lon: 55.27 },
  "Asia/Tokyo": { lat: 35.68, lon: 139.65 },
  "Australia/Sydney": { lat: -33.87, lon: 151.21 },
  "America/Toronto": { lat: 43.65, lon: -79.38 },
  "America/Los_Angeles": { lat: 34.05, lon: -118.24 },
  "Europe/Paris": { lat: 48.86, lon: 2.35 },
  "Europe/Berlin": { lat: 52.52, lon: 13.41 },
  "Asia/Kolkata": { lat: 19.08, lon: 72.88 },
  "Asia/Singapore": { lat: 1.35, lon: 103.82 },
  "Asia/Seoul": { lat: 37.57, lon: 126.98 },
  "America/Sao_Paulo": { lat: -23.55, lon: -46.63 },
  "America/Mexico_City": { lat: 19.43, lon: -99.13 },
  "Pacific/Honolulu": { lat: 21.31, lon: -157.86 },
  UTC: { lat: 51.48, lon: 0 },
};

const MAP_W = 1000;
const MAP_H = 500;

function project(lon, lat) {
  const x = ((lon + 180) / 360) * MAP_W;
  const y = ((90 - lat) / 180) * MAP_H;
  return { x, y };
}

function formatTime(tz, now) {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    const hour = get("hour").padStart(2, "0");
    const minute = get("minute").padStart(2, "0");
    const second = get("second").padStart(2, "0");
    return `${hour}:${minute}:${second}`;
  } catch {
    return "—";
  }
}

function formatDateLocal(tz, now) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(now);
  } catch {
    return "";
  }
}

function hourInZone(tz, now) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "numeric",
      hour12: false,
    }).formatToParts(now);
    const h = parts.find((p) => p.type === "hour");
    return h ? parseInt(h.value, 10) : 12;
  } catch {
    return 12;
  }
}

function isDaylight(h) {
  return h >= 7 && h < 19;
}

function WorldMap({ cities, hours }) {
  const meridians = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
  const parallels = [-60, -30, 0, 30, 60];

  return (
    <svg
      className={styles.mapSvg}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="wc-ocean" cx="42%" cy="32%" r="75%">
          <stop offset="0%" stopColor="hsl(217 45% 18%)" />
          <stop offset="55%" stopColor="hsl(222 40% 12%)" />
          <stop offset="100%" stopColor="hsl(222 48% 6%)" />
        </radialGradient>
        <filter id="wc-pin-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="wc-horizon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      <rect width={MAP_W} height={MAP_H} fill="url(#wc-ocean)" rx="12" />
      <WorldLandmasses />
      <rect
        width={MAP_W}
        height={MAP_H * 0.35}
        fill="url(#wc-horizon)"
        rx="12"
        style={{ mixBlendMode: "screen" }}
      />

      {meridians.map((lon) => {
        const x = ((lon + 180) / 360) * MAP_W;
        return (
          <line
            key={lon}
            x1={x}
            y1={24}
            x2={x}
            y2={MAP_H - 24}
            stroke="hsl(210 30% 96%)"
            strokeOpacity={0.07}
            strokeWidth={1}
          />
        );
      })}
      {parallels.map((lat) => {
        const y = ((90 - lat) / 180) * MAP_H;
        return (
          <line
            key={lat}
            x1={24}
            y1={y}
            x2={MAP_W - 24}
            y2={y}
            stroke="hsl(210 30% 96%)"
            strokeOpacity={0.05}
            strokeWidth={1}
          />
        );
      })}

      <text
        x={MAP_W / 2}
        y={MAP_H - 10}
        textAnchor="middle"
        fill="hsl(215 16% 70%)"
        fillOpacity={0.45}
        fontSize="11"
        fontFamily="system-ui, sans-serif"
      >
        Continents are stylized · pins ≈ city · warm = day · cool = night
      </text>

      {cities.map((c, i) => {
        const coord = TZ_COORDS[c.tz];
        if (!coord) return null;
        const { x, y } = project(coord.lon, coord.lat);
        const h = hours[i] ?? 12;
        const day = isDaylight(h);
        const fill = day ? "hsl(43 92% 58%)" : "hsl(230 85% 62%)";
        const ring = day ? "hsl(48 100% 75%)" : "hsl(220 90% 75%)";
        return (
          <g key={c.uid} filter="url(#wc-pin-glow)">
            <circle cx={x} cy={y} r="14" fill={fill} fillOpacity={0.35} />
            <circle
              cx={x}
              cy={y}
              r="6"
              fill={fill}
              stroke={ring}
              strokeWidth={1.5}
            />
            <circle cx={x} cy={y} r="2" fill="white" fillOpacity={0.95} />
          </g>
        );
      })}
    </svg>
  );
}

function ClockCard({ city, now, hour, onRemove }) {
  const day = isDaylight(hour);
  const time = formatTime(city.tz, now);
  const dateStr = formatDateLocal(city.tz, now);

  return (
    <article className={styles.clockCard}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold leading-tight text-foreground">{city.label}</h3>
          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">{city.tz}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              day
                ? "bg-amber-500/18 text-amber-600 dark:text-amber-300"
                : "bg-indigo-500/18 text-indigo-700 dark:text-indigo-300"
            )}
          >
            {day ? "Day" : "Night"}
          </span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onRemove}
            aria-label={`Remove ${city.label}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={styles.digitalFace}>
        <time dateTime={now.toISOString()}>{time}</time>
      </div>
      {dateStr ? <p className={styles.dateLine}>{dateStr}</p> : null}
    </article>
  );
}

export function WorldClock() {
  const [cities, setCities] = React.useState(() =>
    DEFAULT_CITIES.map((c) => ({ ...c, uid: c.id }))
  );
  const [addValue, setAddValue] = React.useState(EXTRA_ZONES[0].tz);
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remove = (uid) => {
    setCities((c) => c.filter((x) => x.uid !== uid));
  };

  const addCity = () => {
    const pick = EXTRA_ZONES.find((z) => z.tz === addValue) ?? EXTRA_ZONES[0];
    setCities((c) => [
      ...c,
      {
        id: pick.tz,
        label: pick.label,
        tz: pick.tz,
        uid: `${pick.tz}-${Date.now()}`,
      },
    ]);
  };

  const hours = cities.map((c) => hourInZone(c.tz, now));

  return (
    <div className="space-y-6">
      <div className="glass-panel space-y-4 rounded-2xl p-4 sm:p-6">
        <div>
          <p className="text-sm font-semibold text-foreground">World view</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Stylized continents on a globe-style panel; pins use real longitude and latitude.
            Gold pins are roughly daytime there, blue pins are night (7:00–19:00 local).
          </p>
        </div>
        <div className={styles.globeStage}>
          <div className={styles.globeInner}>
            <WorldMap cities={cities} hours={hours} />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/50 pt-4 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1 space-y-2">
            <span id="wc-add-label" className="text-sm font-medium">
              Add city
            </span>
            <Select value={addValue} onValueChange={setAddValue}>
              <SelectTrigger id="wc-add" aria-labelledby="wc-add-label" className="w-full">
                <SelectValue placeholder="Choose a city" />
              </SelectTrigger>
              <SelectContent>
                {EXTRA_ZONES.map((z) => (
                  <SelectItem key={z.tz} value={z.tz}>
                    {z.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="button" onClick={addCity} className="gap-2 sm:shrink-0">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Digital clocks</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cities.map((c, i) => (
            <ClockCard
              key={c.uid}
              city={c}
              now={now}
              hour={hours[i]}
              onRemove={() => remove(c.uid)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";

const STORAGE_KEY = "portfolio-palette";

export const PALETTES = [
  "blue-purple",
  "emerald-slate",
  "indigo-cyan",
  "black-gold",
  "red-charcoal",
  "neutral",
];

const PaletteContext = React.createContext({
  palette: "neutral",
  setPalette: () => {},
  palettes: PALETTES,
});

export function PaletteProvider({ children }) {
  const [palette, setPaletteState] = React.useState("neutral");

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && PALETTES.includes(stored)) {
      document.documentElement.dataset.palette = stored;
      setPaletteState(stored);
    } else {
      document.documentElement.dataset.palette = "neutral";
    }
  }, []);

  const setPalette = React.useCallback((name) => {
    if (!PALETTES.includes(name)) return;
    document.documentElement.dataset.palette = name;
    localStorage.setItem(STORAGE_KEY, name);
    setPaletteState(name);
  }, []);

  return (
    <PaletteContext.Provider
      value={{ palette, setPalette, palettes: PALETTES }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  return React.useContext(PaletteContext);
}

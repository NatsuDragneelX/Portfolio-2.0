"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SYMBOLS = ["🎮", "🎯", "🎨", "🚀", "💡", "⭐", "🔧", "📱"];

function buildDeck() {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((symbol, i) => ({
    id: i,
    symbol,
    matched: false,
  }));
}

export function MemoryGame() {
  const [cards, setCards] = React.useState(buildDeck);
  const [flipped, setFlipped] = React.useState([]);
  const [lock, setLock] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [won, setWon] = React.useState(false);
  const [best, setBest] = React.useState(null);
  const winHandled = React.useRef(false);

  React.useEffect(() => {
    const raw = localStorage.getItem("memory-best-seconds");
    if (raw != null) setBest(Number(raw));
  }, []);

  React.useEffect(() => {
    if (won) return undefined;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [won]);

  React.useEffect(() => {
    if (winHandled.current) return;
    if (cards.length === 0) return;
    if (!cards.every((c) => c.matched)) return;
    winHandled.current = true;
    setWon(true);
    const raw = localStorage.getItem("memory-best-seconds");
    const prev = raw != null ? Number(raw) : null;
    if (prev == null || seconds < prev) {
      localStorage.setItem("memory-best-seconds", String(seconds));
      setBest(seconds);
    } else {
      setBest(prev);
    }
  }, [cards, seconds]);

  function reset() {
    winHandled.current = false;
    setCards(buildDeck());
    setFlipped([]);
    setLock(false);
    setMoves(0);
    setSeconds(0);
    setWon(false);
    const raw = localStorage.getItem("memory-best-seconds");
    setBest(raw != null ? Number(raw) : null);
  }

  function onCardClick(index) {
    if (lock || won) return;
    const c = cards[index];
    if (c.matched || flipped.includes(index)) return;

    const nextFlip = [...flipped, index];
    setFlipped(nextFlip);

    if (nextFlip.length === 2) {
      setLock(true);
      setMoves((m) => m + 1);
      const [a, b] = nextFlip;
      if (cards[a].symbol === cards[b].symbol) {
        setCards((prev) =>
          prev.map((card, i) =>
            i === a || i === b ? { ...card, matched: true } : card
          )
        );
        setFlipped([]);
        setLock(false);
      } else {
        window.setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 650);
      }
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>Time: {seconds}s</span>
        <span>Moves: {moves}</span>
        {best != null ? <span>Best: {best}s</span> : null}
      </div>

      {won ? (
        <p className="text-center text-sm font-medium text-primary" role="status">
          All pairs found in {seconds}s ({moves} moves).
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Tap two cards to find matching pairs.
        </p>
      )}

      <div
        className="grid grid-cols-4 gap-2"
        role="grid"
        aria-label="Memory cards"
      >
        {cards.map((card, i) => {
          const show = card.matched || flipped.includes(i);
          return (
            <button
              key={card.id}
              type="button"
              role="gridcell"
              disabled={card.matched || lock}
              onClick={() => onCardClick(i)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg border text-2xl transition-all duration-200 sm:text-3xl",
                card.matched
                  ? "border-primary/40 bg-primary/15 opacity-80"
                  : show
                    ? "border-border/60 bg-card/80"
                    : "border-border/50 bg-muted/50 hover:bg-muted/70 active:scale-95"
              )}
              aria-label={show ? `Card ${card.symbol}` : "Hidden card"}
            >
              {show ? card.symbol : "?"}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button type="button" variant="outline" onClick={reset}>
          Shuffle & replay
        </Button>
      </div>
    </div>
  );
}

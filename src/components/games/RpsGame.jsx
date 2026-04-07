"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHOICES = [
  { id: "rock", label: "Rock", emoji: "✊" },
  { id: "paper", label: "Paper", emoji: "✋" },
  { id: "scissors", label: "Scissors", emoji: "✌️" },
];

function roundWinner(a, b) {
  if (a === b) return "tie";
  if (
    (a === "rock" && b === "scissors") ||
    (a === "paper" && b === "rock") ||
    (a === "scissors" && b === "paper")
  ) {
    return "you";
  }
  return "ai";
}

function randomOpponentChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
}

export function RpsGame() {
  const [you, setYou] = React.useState(null);
  const [ai, setAi] = React.useState(null);
  const [scores, setScores] = React.useState({ you: 0, ai: 0, ties: 0 });
  const [roundMsg, setRoundMsg] = React.useState("Choose to start.");

  const matchOver = scores.you >= 5 || scores.ai >= 5;

  function play(choice) {
    if (scores.you >= 5 || scores.ai >= 5) return;
    const pick = randomOpponentChoice();
    const w = roundWinner(choice, pick);
    setYou(choice);
    setAi(pick);

    const next = { ...scores };
    if (w === "you") {
      next.you += 1;
      setRoundMsg(
        next.you >= 5 ? "You won the match!" : "You win this round."
      );
    } else if (w === "ai") {
      next.ai += 1;
      setRoundMsg(
        next.ai >= 5 ? "Computer wins the match." : "Computer wins this round."
      );
    } else {
      next.ties += 1;
      setRoundMsg("Tie.");
    }
    setScores(next);
  }

  function resetMatch() {
    setYou(null);
    setAi(null);
    setScores({ you: 0, ai: 0, ties: 0 });
    setRoundMsg("Choose to start.");
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex justify-between gap-4 text-center text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">You</p>
          <p className="text-2xl font-bold text-primary">{scores.you}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Ties</p>
          <p className="text-2xl font-bold">{scores.ties}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Computer</p>
          <p className="text-2xl font-bold text-orange-500">{scores.ai}</p>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {roundMsg} First to 5 wins the match.
      </p>

      <div className="flex min-h-[5rem] items-center justify-center gap-6 text-4xl sm:text-5xl">
        <span title="Your pick">
          {you ? CHOICES.find((c) => c.id === you)?.emoji : "·"}
        </span>
        <span className="text-muted-foreground/50">vs</span>
        <span title="Computer pick">
          {ai ? CHOICES.find((c) => c.id === ai)?.emoji : "·"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CHOICES.map((c) => (
          <Button
            key={c.id}
            type="button"
            variant="outline"
            className={cn(
              "flex h-auto flex-col gap-1 border-border/50 bg-background/40 py-4",
              matchOver && "pointer-events-none opacity-50"
            )}
            disabled={matchOver}
            onClick={() => play(c.id)}
          >
            <span className="text-2xl" aria-hidden>
              {c.emoji}
            </span>
            <span className="text-xs">{c.label}</span>
          </Button>
        ))}
      </div>

      {matchOver ? (
        <div className="flex justify-center">
          <Button type="button" onClick={resetMatch}>
            New match
          </Button>
        </div>
      ) : null}
    </div>
  );
}

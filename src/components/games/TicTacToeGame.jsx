"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winnerOf(board) {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { winner: "draw", line: [] };
  return null;
}

function randomMove(board) {
  const empty = board.map((c, i) => (c ? null : i)).filter((i) => i !== null);
  if (empty.length === 0) return -1;
  return empty[Math.floor(Math.random() * empty.length)];
}

function minimax(board, isMaximizing, aiPlayer, humanPlayer) {
  const w = winnerOf(board);
  if (w?.winner === aiPlayer) return 10;
  if (w?.winner === humanPlayer) return -10;
  if (w?.winner === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      const nb = [...board];
      nb[i] = aiPlayer;
      best = Math.max(best, minimax(nb, false, aiPlayer, humanPlayer));
    }
    return best;
  }
  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    const nb = [...board];
    nb[i] = humanPlayer;
    best = Math.min(best, minimax(nb, true, aiPlayer, humanPlayer));
  }
  return best;
}

function bestAiMove(board) {
  const ai = "O";
  const human = "X";
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    const nb = [...board];
    nb[i] = ai;
    const score = minimax(nb, false, ai, human);
    if (score > bestScore) {
      bestScore = score;
      move = i;
    }
  }
  return move;
}

const HUMAN = "X";
const AI = "O";

export function TicTacToeGame() {
  const [mode, setMode] = React.useState("pvp");
  const [board, setBoard] = React.useState(() => Array(9).fill(null));
  const [xNext, setXNext] = React.useState(true);
  const [aiThinking, setAiThinking] = React.useState(false);

  const result = winnerOf(board);
  const isPve = mode === "pve-easy" || mode === "pve-hard";
  const filled = board.filter(Boolean).length;

  const reset = React.useCallback(() => {
    setBoard(Array(9).fill(null));
    setXNext(true);
    setAiThinking(false);
  }, []);

  React.useEffect(() => {
    reset();
  }, [mode, reset]);

  React.useEffect(() => {
    if (!isPve || result) return;
    if (filled % 2 === 0) return;

    setAiThinking(true);
    const t = window.setTimeout(() => {
      setBoard((prev) => {
        const w = winnerOf(prev);
        if (w) return prev;
        const n = prev.filter(Boolean).length;
        if (n % 2 === 0) return prev;
        const idx =
          mode === "pve-hard" ? bestAiMove(prev) : randomMove(prev);
        if (idx < 0) return prev;
        const next = [...prev];
        next[idx] = AI;
        return next;
      });
      setAiThinking(false);
    }, 320);

    return () => {
      window.clearTimeout(t);
      setAiThinking(false);
    };
  }, [board, filled, isPve, mode, result]);

  function play(i) {
    if (board[i] || result) return;
    if (isPve) {
      if (aiThinking || filled % 2 !== 0) return;
      const next = [...board];
      next[i] = HUMAN;
      setBoard(next);
      return;
    }
    const next = [...board];
    next[i] = xNext ? "X" : "O";
    setBoard(next);
    setXNext(!xNext);
  }

  const status = result
    ? result.winner === "draw"
      ? "Draw."
      : `${result.winner} wins.`
    : isPve
      ? filled % 2 === 0 && !aiThinking
        ? "Your turn (X)."
        : aiThinking
          ? "Computer is thinking…"
          : "Computer's turn (O)."
      : `Next: ${xNext ? "X" : "O"} (two players)`;

  return (
    <div className="mx-auto max-w-md space-y-4">
      <Tabs value={mode} onValueChange={setMode} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
          <TabsTrigger value="pvp" className="px-2 text-xs sm:text-sm">
            2 players
          </TabsTrigger>
          <TabsTrigger value="pve-easy" className="px-2 text-xs sm:text-sm">
            vs AI easy
          </TabsTrigger>
          <TabsTrigger value="pve-hard" className="px-2 text-xs sm:text-sm">
            vs AI hard
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <p className="text-center text-xs text-muted-foreground">
        {isPve
          ? "You are X. The computer plays O."
          : "Same device — X first, then O."}
      </p>

      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {status}
      </p>
      <div
        className="grid grid-cols-3 gap-2 rounded-xl border border-border/50 bg-card/40 p-3 backdrop-blur-md"
        role="grid"
        aria-label="Tic tac toe board"
      >
        {board.map((cell, i) => {
          const highlight = result?.line?.includes(i);
          const cantPlay = isPve && (filled % 2 !== 0 || aiThinking);
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              onClick={() => play(i)}
              disabled={Boolean(cell) || Boolean(result) || cantPlay}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-3xl font-semibold transition-colors",
                highlight
                  ? "bg-primary/20 text-primary ring-1 ring-neon-edge/40"
                  : "bg-background/50 hover:bg-accent/10 active:scale-[0.98]",
                (Boolean(cell) || Boolean(result) || cantPlay) &&
                  !cell &&
                  "cursor-not-allowed opacity-40"
              )}
              aria-label={cell ? `Cell ${i + 1}, ${cell}` : `Cell ${i + 1}, empty`}
            >
              {cell}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button type="button" variant="outline" onClick={reset}>
          New game
        </Button>
      </div>
    </div>
  );
}

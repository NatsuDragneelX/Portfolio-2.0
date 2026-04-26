"use client";

import * as React from "react";
import { Chess } from "chess.js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const PIECE_SYMBOLS = {
  wp: "♙",
  wr: "♖",
  wn: "♘",
  wb: "♗",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  br: "♜",
  bn: "♞",
  bb: "♝",
  bq: "♛",
  bk: "♚",
};

const PIECE_VALUES = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

function makeGameFromPgn(pgn) {
  const game = new Chess();
  if (pgn) game.loadPgn(pgn);
  return game;
}

function statusText(game, mode, aiThinking) {
  const turn = game.turn() === "w" ? "White" : "Black";
  const aiTurn =
    mode !== "pvp" && game.turn() === "b" && !game.isGameOver() && aiThinking;

  if (game.isCheckmate()) {
    return `${turn === "White" ? "Black" : "White"} wins by checkmate.`;
  }
  if (game.isStalemate()) return "Draw by stalemate.";
  if (game.isThreefoldRepetition()) return "Draw by repetition.";
  if (game.isInsufficientMaterial()) return "Draw by insufficient material.";
  if (game.isDraw()) return "Draw.";
  if (aiTurn) return "AI is thinking...";
  if (mode !== "pvp") {
    return game.turn() === "w"
      ? `Your move (White)${game.isCheck() ? " - check." : "."}`
      : `AI move (Black)${game.isCheck() ? " - check." : "."}`;
  }
  return `${turn} to move${game.isCheck() ? " (check)." : "."}`;
}

function evaluateBoard(game) {
  const board = game.board();
  let score = 0;
  for (const rank of board) {
    for (const piece of rank) {
      if (!piece) continue;
      const value = PIECE_VALUES[piece.type] ?? 0;
      score += piece.color === "w" ? value : -value;
    }
  }
  return score;
}

function pickAiMoveEasy(game) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

function pickAiMoveHard(game, aiColor = "b") {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  let best = null;
  let bestScore = -Infinity;

  for (const move of moves) {
    const next = new Chess(game.fen());
    next.move(move);

    let score;
    if (next.isCheckmate()) {
      score = 9999;
    } else {
      const whitePerspective = evaluateBoard(next);
      score = aiColor === "w" ? whitePerspective : -whitePerspective;
      if (next.isCheck()) score += 0.25;
    }

    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }

  return best;
}

export function ChessGame() {
  const [pgn, setPgn] = React.useState("");
  const [mode, setMode] = React.useState("pvp");
  const [selected, setSelected] = React.useState(null);
  const [aiThinking, setAiThinking] = React.useState(false);

  const game = React.useMemo(() => makeGameFromPgn(pgn), [pgn]);
  const board = game.board();
  const history = game.history();
  const isAiMode = mode !== "pvp";
  const isAiTurn = isAiMode && game.turn() === "b" && !game.isGameOver();
  const legalTargets = React.useMemo(() => {
    if (!selected) return [];
    return game.moves({ square: selected, verbose: true }).map((m) => m.to);
  }, [game, selected]);

  function squareName(rowIndex, colIndex) {
    return `${FILES[colIndex]}${8 - rowIndex}`;
  }

  function playMove(from, to) {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) return false;
    setPgn(game.pgn());
    setSelected(null);
    return true;
  }

  function onSquareClick(rowIndex, colIndex) {
    if (aiThinking) return;
    if (isAiTurn) return;

    const square = squareName(rowIndex, colIndex);
    const piece = game.get(square);

    if (selected && legalTargets.includes(square)) {
      playMove(selected, square);
      return;
    }

    if (piece && piece.color === game.turn()) {
      setSelected(square);
      return;
    }

    if (selected) {
      setSelected(null);
    }
  }

  function restart() {
    setPgn("");
    setAiThinking(false);
    setSelected(null);
  }

  function undo() {
    const temp = makeGameFromPgn(pgn);
    const first = temp.undo();
    if (!first) return;

    if (isAiMode && temp.history().length > 0) {
      temp.undo();
    }

    setPgn(temp.pgn());
    setSelected(null);
    setAiThinking(false);
  }

  React.useEffect(() => {
    setPgn("");
    setSelected(null);
    setAiThinking(false);
  }, [mode]);

  React.useEffect(() => {
    if (!isAiTurn || aiThinking) return;

    setAiThinking(true);
    const timer = window.setTimeout(() => {
      const temp = makeGameFromPgn(pgn);
      if (temp.turn() !== "b" || temp.isGameOver()) {
        setAiThinking(false);
        return;
      }

      const aiMove =
        mode === "ai-hard" ? pickAiMoveHard(temp, "b") : pickAiMoveEasy(temp);
      if (!aiMove) {
        setAiThinking(false);
        return;
      }

      temp.move(aiMove);
      setPgn(temp.pgn());
      setAiThinking(false);
      setSelected(null);
    }, 420);

    return () => {
      window.clearTimeout(timer);
    };
  }, [aiThinking, isAiTurn, mode, pgn]);

  const lastMove = game.history({ verbose: true }).at(-1);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Tabs value={mode} onValueChange={setMode} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
          <TabsTrigger value="pvp" className="text-xs sm:text-sm">
            2 players
          </TabsTrigger>
          <TabsTrigger value="ai-easy" className="text-xs sm:text-sm">
            vs AI easy
          </TabsTrigger>
          <TabsTrigger value="ai-hard" className="text-xs sm:text-sm">
            vs AI hard
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <p className="text-center text-xs text-muted-foreground">
        {isAiMode
          ? "You play White. AI plays Black."
          : "Two-player local chess on one device."}
      </p>

      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {statusText(game, mode, aiThinking)}
      </p>

      <div className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-xl border border-border/50 bg-card/40 p-2 backdrop-blur-md">
        <div className="grid grid-cols-8 gap-1">
          {board.map((rank, rowIndex) =>
            rank.map((cell, colIndex) => {
              const square = squareName(rowIndex, colIndex);
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const isSelected = selected === square;
              const isLegalTarget = legalTargets.includes(square);
              const isLastFrom = lastMove?.from === square;
              const isLastTo = lastMove?.to === square;
              const piece = cell
                ? PIECE_SYMBOLS[`${cell.color}${cell.type}`]
                : "";

              return (
                <button
                  key={square}
                  type="button"
                  onClick={() => onSquareClick(rowIndex, colIndex)}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-md text-2xl transition-all sm:text-3xl",
                    isDark ? "bg-muted/80" : "bg-background/80",
                    "hover:ring-1 hover:ring-primary/35",
                    isSelected && "ring-2 ring-primary",
                    isLastFrom && "ring-1 ring-blue-400/70",
                    isLastTo && "ring-1 ring-green-400/70"
                  )}
                  aria-label={`${square}${piece ? `, ${piece}` : ", empty"}`}
                >
                  {isLegalTarget ? (
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-primary/80 sm:h-3 sm:w-3" />
                  ) : null}
                  <span className="relative z-10 leading-none">{piece}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={undo}
          disabled={history.length === 0 || aiThinking}
        >
          Undo move
        </Button>
        <Button type="button" onClick={restart} disabled={aiThinking}>
          New game
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Click a piece to see legal moves. Promotions auto-queen for speed.
      </p>
    </div>
  );
}

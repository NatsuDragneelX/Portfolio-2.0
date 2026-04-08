"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const COLS = 12;
const ROWS = 12;

const DIRS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

function inBounds(p) {
  return p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS;
}

function hitsBody(head, segments) {
  return segments.some((s) => s.x === head.x && s.y === head.y);
}

function randomFood(...snakes) {
  const blocked = snakes.flat();
  let pt;
  let g = 0;
  do {
    pt = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    g++;
  } while (blocked.some((s) => s.x === pt.x && s.y === pt.y) && g < 500);
  return pt;
}

function pickAiDir(head, aiSnake, playerSnake, food, curDir) {
  const tail = aiSnake.slice(1);
  const opts = [];
  for (const d of DIRS) {
    if (d.x === -curDir.x && d.y === -curDir.y) continue;
    const nh = { x: head.x + d.x, y: head.y + d.y };
    if (!inBounds(nh)) continue;
    if (hitsBody(nh, tail)) continue;
    if (hitsBody(nh, playerSnake)) continue;
    const dist = Math.abs(nh.x - food.x) + Math.abs(nh.y - food.y);
    opts.push({ d, dist });
  }
  if (opts.length === 0) return curDir;
  opts.sort((a, b) => a.dist - b.dist);
  return opts[0].d;
}

function stepSolo(s) {
  const { snake, dir, food, score } = s;
  const head = snake[0];
  const nh = { x: head.x + dir.x, y: head.y + dir.y };
  if (!inBounds(nh) || hitsBody(nh, snake)) {
    return { ...s, alive: false };
  }
  const eat = nh.x === food.x && nh.y === food.y;
  let nextSnake = [nh, ...snake];
  if (!eat) nextSnake = nextSnake.slice(0, -1);
  let nextFood = food;
  let nextScore = score;
  if (eat) {
    nextScore += 1;
    nextFood = randomFood(nextSnake);
  }
  return {
    ...s,
    snake: nextSnake,
    food: nextFood,
    score: nextScore,
  };
}

function stepVsAi(s) {
  const { pSnake, aiSnake, food, pDir, aiDir, score } = s;

  const ph = pSnake[0];
  const pNext = { x: ph.x + pDir.x, y: ph.y + pDir.y };
  if (
    !inBounds(pNext) ||
    hitsBody(pNext, pSnake) ||
    hitsBody(pNext, aiSnake)
  ) {
    return { ...s, alive: false, msg: "Computer wins." };
  }

  const eatP = pNext.x === food.x && pNext.y === food.y;
  let newP = [pNext, ...(eatP ? pSnake : pSnake.slice(0, -1))];
  let newFood = food;
  let newScore = score;
  if (eatP) {
    newScore += 1;
    newFood = randomFood(newP, aiSnake);
  }

  const nextAiDir = pickAiDir(
    aiSnake[0],
    aiSnake,
    newP,
    newFood,
    aiDir
  );
  const ah = aiSnake[0];
  const aiNext = { x: ah.x + nextAiDir.x, y: ah.y + nextAiDir.y };
  if (
    !inBounds(aiNext) ||
    hitsBody(aiNext, aiSnake) ||
    hitsBody(aiNext, newP)
  ) {
    return {
      ...s,
      pSnake: newP,
      food: newFood,
      score: newScore,
      alive: false,
      msg: "You win.",
    };
  }

  const eatAi = aiNext.x === newFood.x && aiNext.y === newFood.y;
  let newAi = [aiNext, ...(eatAi ? aiSnake : aiSnake.slice(0, -1))];
  if (eatAi) {
    newFood = randomFood(newP, newAi);
  }

  return {
    ...s,
    pSnake: newP,
    aiSnake: newAi,
    food: newFood,
    score: newScore,
    aiDir: nextAiDir,
    msg: "",
  };
}

function step2p(s) {
  const { p1Snake, p2Snake, food, p1Dir, p2Dir } = s;
  const h1 = p1Snake[0];
  const h2 = p2Snake[0];
  const n1 = { x: h1.x + p1Dir.x, y: h1.y + p1Dir.y };
  const n2 = { x: h2.x + p2Dir.x, y: h2.y + p2Dir.y };

  let d1 =
    !inBounds(n1) || hitsBody(n1, p1Snake) || hitsBody(n1, p2Snake);
  let d2 =
    !inBounds(n2) || hitsBody(n2, p2Snake) || hitsBody(n2, p1Snake);
  if (n1.x === n2.x && n1.y === n2.y) {
    d1 = true;
    d2 = true;
  }

  if (d1 && d2) return { ...s, alive: false, msg: "Draw." };
  if (d1) return { ...s, alive: false, msg: "Player 2 wins." };
  if (d2) return { ...s, alive: false, msg: "Player 1 wins." };

  const eat1 = n1.x === food.x && n1.y === food.y;
  const eat2 = n2.x === food.x && n2.y === food.y;
  let ns1 = [n1, ...(eat1 ? p1Snake : p1Snake.slice(0, -1))];
  let ns2 = [n2, ...(eat2 ? p2Snake : p2Snake.slice(0, -1))];
  let nf = food;
  if (eat1 || eat2) {
    nf = randomFood(ns1, ns2);
  }
  return { ...s, p1Snake: ns1, p2Snake: ns2, food: nf, msg: "" };
}

function initSolo() {
  const snake = [
    { x: 3, y: 6 },
    { x: 2, y: 6 },
    { x: 1, y: 6 },
  ];
  return {
    mode: "solo",
    snake,
    dir: { x: 1, y: 0 },
    food: randomFood(snake),
    alive: true,
    score: 0,
    msg: "",
  };
}

function initVsAi() {
  const pSnake = [
    { x: 2, y: 6 },
    { x: 1, y: 6 },
    { x: 0, y: 6 },
  ];
  const aiSnake = [
    { x: 9, y: 6 },
    { x: 10, y: 6 },
    { x: 11, y: 6 },
  ];
  return {
    mode: "vs-ai",
    pSnake,
    aiSnake,
    pDir: { x: 1, y: 0 },
    aiDir: { x: -1, y: 0 },
    food: randomFood(pSnake, aiSnake),
    alive: true,
    score: 0,
    msg: "",
  };
}

function init2p() {
  const p1Snake = [
    { x: 2, y: 5 },
    { x: 1, y: 5 },
    { x: 0, y: 5 },
  ];
  const p2Snake = [
    { x: 9, y: 7 },
    { x: 10, y: 7 },
    { x: 11, y: 7 },
  ];
  return {
    mode: "2p",
    p1Snake,
    p2Snake,
    p1Dir: { x: 1, y: 0 },
    p2Dir: { x: -1, y: 0 },
    food: randomFood(p1Snake, p2Snake),
    alive: true,
    score: 0,
    msg: "",
  };
}

export function SnakeGame() {
  const [mode, setMode] = React.useState("solo");
  const boardRef = React.useRef(null);
  const simRef = React.useRef(initSolo());
  const [, setTick] = React.useState(0);
  const force = React.useCallback(() => setTick((t) => t + 1), []);

  const focusBoard = React.useCallback(() => {
    const el = boardRef.current;
    if (!el) return;
    window.requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
  }, []);

  const pDirRef = React.useRef({ x: 1, y: 0 });
  const p1DirRef = React.useRef({ x: 1, y: 0 });
  const p2DirRef = React.useRef({ x: -1, y: 0 });
  const soloDirRef = React.useRef({ x: 1, y: 0 });
  const touchRef = React.useRef(null);

  React.useEffect(() => {
    if (mode === "solo") {
      const s = initSolo();
      simRef.current = s;
      soloDirRef.current = s.dir;
    } else if (mode === "vs-ai") {
      const s = initVsAi();
      simRef.current = s;
      pDirRef.current = s.pDir;
    } else {
      const s = init2p();
      simRef.current = s;
      p1DirRef.current = s.p1Dir;
      p2DirRef.current = s.p2Dir;
    }
    force();
  }, [mode, force]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      const s = simRef.current;
      if (s.alive) {
        if (s.mode === "solo") {
          s.dir = soloDirRef.current;
          simRef.current = stepSolo(s);
        } else if (s.mode === "vs-ai") {
          s.pDir = pDirRef.current;
          simRef.current = stepVsAi(s);
        } else {
          s.p1Dir = p1DirRef.current;
          s.p2Dir = p2DirRef.current;
          simRef.current = step2p(s);
        }
      }
      force();
    }, mode === "2p" ? 165 : 145);
    return () => window.clearInterval(id);
  }, [mode, force]);

  React.useLayoutEffect(() => {
    focusBoard();
  }, [mode, focusBoard]);

  function handleBoardKeyDown(e) {
    const s = simRef.current;
    if (!s.alive && e.key !== " ") return;

    if (mode === "solo") {
      const cur = soloDirRef.current;
      if (e.key === "ArrowUp" && cur.y === 0) {
        soloDirRef.current = { x: 0, y: -1 };
        e.preventDefault();
      }
      if (e.key === "ArrowDown" && cur.y === 0) {
        soloDirRef.current = { x: 0, y: 1 };
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" && cur.x === 0) {
        soloDirRef.current = { x: -1, y: 0 };
        e.preventDefault();
      }
      if (e.key === "ArrowRight" && cur.x === 0) {
        soloDirRef.current = { x: 1, y: 0 };
        e.preventDefault();
      }
      return;
    }

    if (mode === "vs-ai") {
      const cur = pDirRef.current;
      if (e.key === "ArrowUp" && cur.y === 0) {
        pDirRef.current = { x: 0, y: -1 };
        e.preventDefault();
      }
      if (e.key === "ArrowDown" && cur.y === 0) {
        pDirRef.current = { x: 0, y: 1 };
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" && cur.x === 0) {
        pDirRef.current = { x: -1, y: 0 };
        e.preventDefault();
      }
      if (e.key === "ArrowRight" && cur.x === 0) {
        pDirRef.current = { x: 1, y: 0 };
        e.preventDefault();
      }
      return;
    }

    const c1 = p1DirRef.current;
    if (e.key === "ArrowUp" && c1.y === 0) {
      p1DirRef.current = { x: 0, y: -1 };
      e.preventDefault();
    }
    if (e.key === "ArrowDown" && c1.y === 0) {
      p1DirRef.current = { x: 0, y: 1 };
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && c1.x === 0) {
      p1DirRef.current = { x: -1, y: 0 };
      e.preventDefault();
    }
    if (e.key === "ArrowRight" && c1.x === 0) {
      p1DirRef.current = { x: 1, y: 0 };
      e.preventDefault();
    }

    const c2 = p2DirRef.current;
    const k = e.key;
    if ((k === "w" || k === "W") && c2.y === 0) {
      p2DirRef.current = { x: 0, y: -1 };
      e.preventDefault();
    }
    if ((k === "s" || k === "S") && c2.y === 0) {
      p2DirRef.current = { x: 0, y: 1 };
      e.preventDefault();
    }
    if ((k === "a" || k === "A") && c2.x === 0) {
      p2DirRef.current = { x: -1, y: 0 };
      e.preventDefault();
    }
    if ((k === "d" || k === "D") && c2.x === 0) {
      p2DirRef.current = { x: 1, y: 0 };
      e.preventDefault();
    }
  }

  function onTouchStart(e) {
    if (mode === "2p") return;
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e) {
    if (mode === "2p") return;
    const start = touchRef.current;
    if (!start || !e.changedTouches[0]) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;

    const apply = (ref) => {
      const cur = ref.current;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && cur.x === 0) ref.current = { x: 1, y: 0 };
        if (dx < 0 && cur.x === 0) ref.current = { x: -1, y: 0 };
      } else {
        if (dy > 0 && cur.y === 0) ref.current = { x: 0, y: 1 };
        if (dy < 0 && cur.y === 0) ref.current = { x: 0, y: -1 };
      }
    };

    if (mode === "solo") apply(soloDirRef);
    else if (mode === "vs-ai") apply(pDirRef);
    touchRef.current = null;
  }

  function restart() {
    if (mode === "solo") {
      const s = initSolo();
      simRef.current = s;
      soloDirRef.current = s.dir;
    } else if (mode === "vs-ai") {
      const s = initVsAi();
      simRef.current = s;
      pDirRef.current = s.pDir;
    } else {
      const s = init2p();
      simRef.current = s;
      p1DirRef.current = s.p1Dir;
      p2DirRef.current = s.p2Dir;
    }
    force();
    focusBoard();
  }

  const s = simRef.current;
  const cells = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let cls = "bg-muted/40";
      if (s.mode === "solo") {
        const isHead = s.snake[0]?.x === x && s.snake[0]?.y === y;
        const isBody = s.snake.slice(1).some((p) => p.x === x && p.y === y);
        const isFood = s.food.x === x && s.food.y === y;
        if (isHead) cls = "bg-primary shadow-[0_0_10px_hsl(var(--neon)/0.35)]";
        else if (isBody) cls = "bg-primary/50";
        else if (isFood) cls = "bg-accent";
      } else if (s.mode === "vs-ai") {
        const pH = s.pSnake[0]?.x === x && s.pSnake[0]?.y === y;
        const pB = s.pSnake.slice(1).some((p) => p.x === x && p.y === y);
        const aH = s.aiSnake[0]?.x === x && s.aiSnake[0]?.y === y;
        const aB = s.aiSnake.slice(1).some((p) => p.x === x && p.y === y);
        const isFood = s.food.x === x && s.food.y === y;
        if (pH) cls = "bg-primary shadow-[0_0_8px_hsl(var(--neon)/0.4)]";
        else if (pB) cls = "bg-primary/55";
        else if (aH) cls = "bg-orange-500 shadow-[0_0_8px_rgb(249,115,22,0.45)]";
        else if (aB) cls = "bg-orange-500/60";
        else if (isFood) cls = "bg-accent";
      } else {
        const h1 = s.p1Snake[0]?.x === x && s.p1Snake[0]?.y === y;
        const b1 = s.p1Snake.slice(1).some((p) => p.x === x && p.y === y);
        const h2 = s.p2Snake[0]?.x === x && s.p2Snake[0]?.y === y;
        const b2 = s.p2Snake.slice(1).some((p) => p.x === x && p.y === y);
        const isFood = s.food.x === x && s.food.y === y;
        if (h1) cls = "bg-primary shadow-[0_0_8px_hsl(var(--neon)/0.4)]";
        else if (b1) cls = "bg-primary/55";
        else if (h2) cls = "bg-cyan-500 shadow-[0_0_8px_rgb(6,182,212,0.45)]";
        else if (b2) cls = "bg-cyan-500/60";
        else if (isFood) cls = "bg-accent";
      }
      cells.push(
        <div
          key={`${x}-${y}`}
          className={cn("aspect-square rounded-sm", cls)}
        />
      );
    }
  }

  const hint =
    s.mode === "solo"
      ? "Click the grid or hint below, then use arrows (or swipe)."
      : s.mode === "vs-ai"
        ? "Click the grid or hint — you: green (arrows / swipe). Orange = AI."
        : "Click the grid or hint — P1: arrows · P2: W A S D";

  const status =
    s.mode === "solo"
      ? `${s.alive ? "Playing" : "Game over"} · Score ${s.score}`
      : `${s.alive ? "Battle" : s.msg || "Over"}${s.mode === "vs-ai" ? ` · Apples ${s.score}` : ""}`;

  return (
    <div
      className="mx-auto max-w-md space-y-4"
      onPointerDownCapture={(e) => {
        if (e.target.closest("button, a[href], input, textarea, select")) return;
        focusBoard();
      }}
    >
      <Tabs value={mode} onValueChange={setMode} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
          <TabsTrigger value="solo" className="text-xs sm:text-sm">
            Solo
          </TabsTrigger>
          <TabsTrigger value="vs-ai" className="text-xs sm:text-sm">
            vs AI
          </TabsTrigger>
          <TabsTrigger value="2p" className="text-xs sm:text-sm">
            2 players
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <p className="text-center text-xs text-muted-foreground">{hint}</p>
      <p
        className="text-center text-sm text-muted-foreground"
        aria-live="polite"
      >
        {status}
      </p>
      <div
        ref={boardRef}
        tabIndex={0}
        className="touch-pan-y rounded-xl border border-border/50 bg-card/40 p-2 outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gap: 3,
        }}
        onPointerDownCapture={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          focusBoard();
        }}
        onKeyDown={handleBoardKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="application"
        aria-label="Snake game board — click here to use keyboard"
      >
        {cells}
      </div>
      <div className="flex justify-center">
        <Button type="button" variant="outline" onClick={restart}>
          Restart
        </Button>
      </div>
    </div>
  );
}

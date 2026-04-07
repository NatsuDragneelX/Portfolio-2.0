/**
 * Game hub cards. `preview` is shown on /games — replace with your own PNG/JPG
 * in public/games/ (same path) anytime.
 */
export const games = [
  {
    slug: "tictactoe",
    title: "Tic Tac Toe",
    description:
      "Classic 3×3 — two players or vs AI (easy / hard). Large tap targets.",
    href: "/games/tictactoe",
    accent: "from-primary/40 to-accent/25",
    preview: "/games/tictactoe-preview.svg",
  },
  {
    slug: "snake",
    title: "Snake",
    description:
      "Solo, vs AI, or local two-player. Swipe or keys.",
    href: "/games/snake",
    accent: "from-neon/35 to-primary/25",
    preview: "/games/snake-preview.svg",
  },
  {
    slug: "rps",
    title: "Rock Paper Scissors",
    description:
      "Quick rounds against the computer. First to five wins.",
    href: "/games/rps",
    accent: "from-violet-500/35 to-fuchsia-500/25",
    preview: "/games/rps-preview.svg",
  },
  {
    slug: "memory",
    title: "Memory Match",
    description:
      "Flip cards and find all 8 pairs. Timed — beat your best score.",
    href: "/games/memory",
    accent: "from-cyan-500/30 to-blue-500/25",
    preview: "/games/memory-preview.svg",
  },
];

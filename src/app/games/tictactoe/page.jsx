import Link from "next/link";
import { TicTacToeGame } from "@/components/games/TicTacToeGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Tic Tac Toe",
  description: "Play Tic Tac Toe in the browser.",
};

export default function TicTacToePage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-primary"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <span className="text-muted-foreground/50" aria-hidden>
            /
          </span>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
          >
            <Link href="/games">All games</Link>
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tic Tac Toe</h1>
          <p className="text-sm text-muted-foreground">
            Tap a cell — X goes first.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-4 sm:p-6">
          <TicTacToeGame />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { RpsGame } from "@/components/games/RpsGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Rock Paper Scissors",
  description: "Play Rock Paper Scissors against the computer.",
};

export default function RpsPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">
            Rock Paper Scissors
          </h1>
          <p className="text-sm text-muted-foreground">
            First to 5 points wins the match.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-4 sm:p-6">
          <RpsGame />
        </div>
      </div>
    </div>
  );
}

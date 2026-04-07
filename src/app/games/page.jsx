import Link from "next/link";
import Image from "next/image";
import { games } from "@/config/games";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** SVGs from /public load more reliably as native img than next/image on some browsers. */
function GameSvgPreview({ src, className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional for static SVG previews
    <img
      src={src}
      alt=""
      width={400}
      height={225}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

export const metadata = {
  title: "Games",
  description:
    "Browser games — Tic Tac Toe, Snake, Rock Paper Scissors, Memory Match.",
};

export default function GamesHubPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 w-fit gap-1 text-muted-foreground hover:text-primary"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <header className="max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Games
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Quick to load, easy to play
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Stylized previews on each card — pick a game and play in the
              browser, no install required.
            </p>
          </header>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {games.map((g) => (
            <Card
              key={g.slug}
              className="glass-panel group flex h-full flex-col overflow-hidden bg-card/50 transition-shadow duration-300 hover:shadow-neon"
            >
              <div
                className={cn(
                  "relative h-44 w-full shrink-0 overflow-hidden sm:h-48",
                  !g.preview && "bg-gradient-to-br",
                  !g.preview && g.accent
                )}
              >
                {g.preview ? (
                  <>
                    {g.preview.endsWith(".svg") ? (
                      <GameSvgPreview
                        src={g.preview}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <Image
                        src={g.preview}
                        alt=""
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/15 to-transparent"
                      aria-hidden
                    />
                  </>
                ) : null}
              </div>
              <CardHeader className="flex-1">
                <CardTitle>{g.title}</CardTitle>
                <CardDescription>{g.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={g.href}>Play</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

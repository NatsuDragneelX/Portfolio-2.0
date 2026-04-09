import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toolInstructions } from "@/config/tool-instructions";
import { ToolHelp } from "@/components/tools/ToolHelp";

export function ToolPageChrome({
  title,
  description,
  children,
  maxWidthClass = "max-w-2xl",
  instructionKey,
}) {
  const instruction = instructionKey ? toolInstructions[instructionKey] : null;

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <div className={cn("mx-auto space-y-6", maxWidthClass)}>
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
            <Link href="/tools">All tools</Link>
          </Button>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="text-sm leading-relaxed text-foreground/85">{description}</p>
          ) : null}
        </div>
        {instruction ? (
          <ToolHelp summary={instruction.summary} steps={instruction.steps} />
        ) : null}
        {children}
      </div>
    </div>
  );
}

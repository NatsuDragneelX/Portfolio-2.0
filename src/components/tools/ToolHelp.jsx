import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolHelp({ summary, steps, className }) {
  if (!summary && (!steps || steps.length === 0)) return null;

  return (
    <aside
      className={cn(
        "rounded-xl border border-border/80 bg-muted/35 px-4 py-3.5 text-sm text-foreground shadow-sm",
        className
      )}
    >
      <div className="flex gap-2.5">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          aria-hidden
        />
        <div className="min-w-0 space-y-2">
          <p className="font-medium leading-snug text-foreground">{summary}</p>
          {steps?.length ? (
            <ol className="list-decimal space-y-1.5 pl-4 text-foreground/90 leading-relaxed">
              {steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

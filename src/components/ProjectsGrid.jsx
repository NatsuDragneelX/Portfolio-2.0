import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isValidUrl(href) {
  return typeof href === "string" && href.startsWith("http");
}

/** Encode only the filename so spaces/parentheses work with next/image (avoid double-encoding in config). */
function projectImageSrc(path) {
  if (!path || typeof path !== "string" || !path.startsWith("/")) return path;
  const i = path.lastIndexOf("/");
  const dir = path.slice(0, i + 1);
  const file = path.slice(i + 1);
  if (!file) return path;
  return dir + encodeURIComponent(file);
}

export function ProjectsGrid({ className }) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((p) => (
        <article
          key={p.id}
          className="glass-panel flex h-full flex-col overflow-hidden rounded-xl border border-border/50"
        >
          <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-44">
            {p.image ? (
              <>
                <Image
                  src={projectImageSrc(p.image)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                  unoptimized
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
                  aria-hidden
                />
              </>
            ) : (
              <div
                className={cn(
                  "h-full w-full bg-gradient-to-br",
                  p.accent
                )}
                aria-hidden
              />
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
            <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 leading-relaxed">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {(isValidUrl(p.github) || isValidUrl(p.live)) && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border/30 pt-4">
                {isValidUrl(p.github) ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-border/60 bg-background/30"
                  >
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                ) : null}
                {isValidUrl(p.live) ? (
                  <Button asChild size="sm" className="gap-1.5">
                    <Link
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live demo
                    </Link>
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

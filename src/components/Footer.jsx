import Link from "next/link";
import { site, mainNav } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto w-full shrink-0 bg-background/80 px-4 py-10 backdrop-blur-sm sm:px-6 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 shrink-0">
          <p className="font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {year} {site.name}. Built with Next.js.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 sm:max-w-md sm:justify-end"
          aria-label="Footer"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          {site.linkedin ? (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
          ) : null}
          {site.github ? (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary"
            >
              GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}

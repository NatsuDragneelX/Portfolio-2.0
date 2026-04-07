import Link from "next/link";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Projects",
  description:
    "Portfolio: games, web, Python tools, CSC 3380 calculator, automation experiments, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
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
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Projects
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Selected work
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
                Coursework, experiments, and personal builds — C++, web, Python,
                and Node. Open a card to visit the repo or live demo when
                available.
              </p>
            </div>
          </div>
        </div>
        <ProjectsGrid />
      </div>
    </div>
  );
}

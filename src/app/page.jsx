import Link from "next/link";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Experience />
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Selected work
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                A quick look at games, automation, and web projects.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/projects">View all</Link>
            </Button>
          </div>
          <ProjectsGrid />
          <Button asChild variant="outline" className="sm:hidden">
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>
      </section>
      <Skills />
      <Education />
    </div>
  );
}

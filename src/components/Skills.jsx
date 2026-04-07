"use client";

import { skillCategories } from "@/config/skills";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Technical foundation, collaboration, and communication.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <FadeIn key={cat.id} delay={0.07 * (i + 1)}>
              <div
                className={cn(
                  "glass-panel flex h-full flex-col rounded-xl p-5 transition-[box-shadow,transform] duration-300",
                  "hover:border-neon-edge/25 hover:shadow-neon hover:-translate-y-0.5"
                )}
              >
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <ul className="mt-4 flex flex-1 flex-col gap-2.5 text-sm text-muted-foreground">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2 leading-snug">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

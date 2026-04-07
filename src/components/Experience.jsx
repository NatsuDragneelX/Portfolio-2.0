import { experience } from "@/config/experience";
import { FadeIn } from "@/components/motion/FadeIn";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Roles where I solve technical problems and support customers every day.
          </p>
        </FadeIn>
        <div className="mt-10 flex flex-col gap-6">
          {experience.map((job, i) => (
            <FadeIn key={job.id} delay={0.06 * (i + 1)}>
              <article className="glass-panel rounded-xl border border-border/40 p-5 sm:p-6">
                <p className="text-sm font-medium text-primary">{job.period}</p>
                <h3 className="mt-2 text-xl font-semibold">
                  {job.role}
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    · {job.company}
                  </span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

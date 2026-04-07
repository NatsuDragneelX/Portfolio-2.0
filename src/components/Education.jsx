import { education } from "@/config/education";
import { FadeIn } from "@/components/motion/FadeIn";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight">Education</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Formal training in computer science and software fundamentals.
          </p>
        </FadeIn>
        <div className="mt-8 grid gap-4 sm:grid-cols-1">
          {education.map((e, i) => (
            <FadeIn key={e.id} delay={0.06 * (i + 1)}>
              <div className="glass-panel rounded-xl border border-border/40 p-6">
                <h3 className="text-lg font-semibold">{e.degree}</h3>
                <p className="mt-1 text-muted-foreground">
                  {e.school} · {e.location}
                </p>
                <p className="mt-2 text-sm font-medium text-primary">{e.endDate}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

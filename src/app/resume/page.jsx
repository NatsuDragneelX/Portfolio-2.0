import Link from "next/link";
import { resumeContent } from "@/config/resume";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Resume",
  description: `${resumeContent.headline} — ${resumeContent.subhead}. Background, experience, and skills (on this site only; no automatic download).`,
};

export default function ResumePage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
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
              Resume
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {resumeContent.headline}
            </h1>
            <p className="mt-2 text-lg text-primary">{resumeContent.subhead}</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Displayed on this site only — there is no automatic PDF download.
            </p>
          </div>
        </div>

        <article className="glass-panel neon-edge rounded-2xl p-6 sm:p-8">
          <p className="text-muted-foreground leading-relaxed">{resumeContent.summary}</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed">
            {resumeContent.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-5">
                  {section.items.map((item, i) => (
                    <div key={`${section.title}-${i}`}>
                      {item.title ? (
                        <p className="font-semibold text-foreground">{item.title}</p>
                      ) : null}
                      {item.meta ? (
                        <p className="mt-0.5 text-muted-foreground">{item.meta}</p>
                      ) : null}
                      {item.lines?.length > 0 ? (
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground">
                          {item.lines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

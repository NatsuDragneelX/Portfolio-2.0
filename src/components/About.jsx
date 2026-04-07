import { site } from "@/config/site";
import { about } from "@/config/about";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProfilePhoto } from "@/components/ProfilePhoto";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_min(280px,100%)] md:items-start">
        <FadeIn>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">About me</h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Professional summary
            </p>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </FadeIn>
        <div className="md:justify-self-end">
          <div className="glass-panel neon-edge mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl">
            <ProfilePhoto src={about.profileImage} alt={site.name} priority />
          </div>
        </div>
      </div>
    </section>
  );
}

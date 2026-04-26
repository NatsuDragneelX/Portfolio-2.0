import Link from "next/link";
import { site } from "@/config/site";
import {
  standardTechServices,
  developmentServices,
  serviceDifference,
} from "@/config/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Services & pricing",
  description:
    "Tech repair and support services plus web development packages with clear pricing ranges.",
};

export default function ServicesPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-14">
        <div className="space-y-4">
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
          <header className="max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Services & pricing
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Reliable tech help and modern websites
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              From PC repair and network setup to custom website builds, each
              service is scoped clearly with transparent pricing so you know what
              to expect before we start.
            </p>
          </header>
        </div>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Standard tech services
            </h2>
            <p className="mt-2 text-muted-foreground">
              Ideal for repairs, setup, and day-to-day support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standardTechServices.map((item) => (
              <Card key={item.id} className="glass-panel bg-card/50">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <p className="text-base font-semibold">{item.priceRange}</p>
                  <p className="text-xs text-muted-foreground">
                    Typical turnaround: {item.timeline}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Development services
            </h2>
            <p className="mt-2 text-muted-foreground">
              For modern responsive websites and custom web builds.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {developmentServices.map((tier) => (
              <Card
                key={tier.id}
                className={
                  tier.featured
                    ? "glass-panel neon-edge flex h-full flex-col border-neon-edge/25 bg-card/70"
                    : "glass-panel flex h-full flex-col bg-card/50"
                }
              >
                <CardHeader>
                  {tier.featured && (
                    <Badge variant="neon" className="mb-2 w-fit">
                      Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <p className="pt-2 text-lg font-semibold">{tier.priceRange}</p>
                  <p className="text-sm text-muted-foreground">
                    Timeline: {tier.timeline}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {tier.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Standard vs development
            </h2>
            <p className="mt-2 text-muted-foreground">
              Quick way to compare the two service tracks.
            </p>
          </div>
          <div className="glass-panel overflow-x-auto rounded-xl">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="p-4 font-medium">Feature</th>
                  <th className="p-4 text-center font-medium">
                    Standard services
                  </th>
                  <th className="p-4 text-center font-medium">
                    Development services
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceDifference.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="p-4 text-muted-foreground">{row.feature}</td>
                    <td className="p-4 text-center text-xs text-muted-foreground">
                      {row.standard}
                    </td>
                    <td className="p-4 text-center text-xs text-muted-foreground">
                      {row.development}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="bg-border/60" />

        <section
          id="hire"
          className="glass-panel neon-edge flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Ready to talk?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
              Share your goals and timeline. I will follow up with next steps or
              questions.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button asChild size="lg">
              <a href={`mailto:${site.email}?subject=Project%20inquiry`}>
                Email me
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

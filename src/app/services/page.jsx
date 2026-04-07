import Link from "next/link";
import { site } from "@/config/site";
import { serviceTiers, comparisonFeatures } from "@/config/services";
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
import { Check, Minus, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Services & pricing",
  description: "Website development tiers, pricing ranges, and feature comparison.",
};

function cellValue(v) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-primary" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" />;
  return <span className="text-xs text-muted-foreground">{v}</span>;
}

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
              Web projects, scoped clearly
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Whether you need a landing page or a richer marketing site, each
              tier is defined up front. I bring a technician&apos;s eye for
              reliability and a developer&apos;s focus on clean, maintainable
              code.
            </p>
          </header>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceTiers.map((tier) => (
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

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Feature comparison
            </h2>
            <p className="mt-2 text-muted-foreground">
              Compare what is included at each tier.
            </p>
          </div>
          <div className="glass-panel overflow-x-auto rounded-xl">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="p-4 font-medium">Feature</th>
                  <th className="p-4 text-center font-medium">Basic</th>
                  <th className="p-4 text-center font-medium">Standard</th>
                  <th className="p-4 text-center font-medium">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="p-4 text-muted-foreground">{row.feature}</td>
                    <td className="p-4 text-center">{cellValue(row.basic)}</td>
                    <td className="p-4 text-center">{cellValue(row.standard)}</td>
                    <td className="p-4 text-center">{cellValue(row.premium)}</td>
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

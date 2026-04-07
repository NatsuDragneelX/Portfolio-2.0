"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24"
    >
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div
            className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
            animate={{ y: [0, 14, 0], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-neon/12 blur-3xl"
            animate={{ y: [0, -12, 0], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {site.name}
        </motion.p>
        <motion.p
          className="text-base font-medium text-primary sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.02 }}
        >
          {site.role}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {site.tagline}
        </motion.h1>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/projects">
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 border-border/60 bg-background/30"
          >
            <Link href="/resume">
              <FileText className="h-4 w-4" />
              Resume
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 border-border/60 bg-background/30"
          >
            <a href={`mailto:${site.email}?subject=Hello`}>Email</a>
          </Button>
        </motion.div>

        {(site.github || site.linkedin) && (
          <motion.div
            className="mt-4 flex flex-wrap items-center gap-2"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            {site.github ? (
              <Button
                asChild
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 border-border/60 bg-background/30"
                title="GitHub"
              >
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github className="h-[1.125rem] w-[1.125rem]" />
                </a>
              </Button>
            ) : null}
            {site.linkedin ? (
              <Button
                asChild
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 border-border/60 bg-background/30"
                title="LinkedIn"
              >
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-[1.125rem] w-[1.125rem]" />
                </a>
              </Button>
            ) : null}
          </motion.div>
        )}
      </div>
    </section>
  );
}

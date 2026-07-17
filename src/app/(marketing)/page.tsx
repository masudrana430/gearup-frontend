import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mountain,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const foundationItems = [
  {
    icon: Sparkles,
    title: "Premium design system",
    description:
      "A consistent theme with typography, color, radius, shadow and surface tokens.",
  },
  {
    icon: Zap,
    title: "Animation foundation",
    description:
      "Motion-powered reveals with reduced-motion support and smooth scrolling.",
  },
  {
    icon: ShieldCheck,
    title: "Secure API architecture",
    description:
      "Server-only backend configuration and a same-origin Next.js proxy.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      <div className="premium-grid absolute inset-x-0 top-0 h-[48rem]" />

      <header className="container-shell relative z-20 flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Mountain className="size-5" />
          </span>
          GearUp
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/gear"
            className={buttonVariants({
              variant: "default",
            })}
          >
            Explore gear
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <section className="container-shell relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="size-4" />
                Premium gear rental platform
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="max-w-4xl font-display text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-8xl">
                Rent premium gear.
                <span className="text-gradient block">
                  Move without limits.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Find trusted equipment for outdoor adventures, professional
                projects and unforgettable journeys— without the cost of
                ownership.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/gear"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                  "h-12 rounded-full px-7",
                )}
              >
                Browse all gear
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/register"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-12 rounded-full px-7",
                )}
              >
                Become a provider
              </Link>
            </Reveal>

            <Reveal
              delay={0.32}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground"
            >
              {[
                "Verified providers",
                "Secure payments",
                "Responsive experience",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.18} distance={42} className="relative">
            <div className="absolute -inset-16 -z-10 rounded-full bg-primary/10 blur-3xl" />

            <div className="glass-panel premium-ring relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Foundation
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    Phase 01 ready
                  </h2>
                </div>

                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex size-3 rounded-full bg-primary" />
                </span>
              </div>

              <div className="space-y-4">
                {foundationItems.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="group rounded-2xl border bg-background/45 p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-background/70"
                  >
                    <div className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                        <Icon className="size-5" />
                      </span>

                      <div>
                        <h3 className="font-display font-semibold">{title}</h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

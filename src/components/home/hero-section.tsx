import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Camera,
  CheckCircle2,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  TentTree,
} from "lucide-react";

import { MagneticButton } from "@/components/animation/magnetic-button";
import { Reveal } from "@/components/animation/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const trustItems = [
  "Verified providers",
  "Secure payments",
  "Flexible rental periods",
];

const floatingGear = [
  {
    icon: Camera,
    title: "Pro camera kit",
    position:
      "left-3 top-6 sm:left-7 sm:top-8",
    delay: "0s",
  },
  {
    icon: TentTree,
    title: "Adventure tent",
    position:
      "right-3 top-24 sm:right-7 sm:top-28",
    delay: "1s",
  },
  {
    icon: Bike,
    title: "Trail equipment",
    position:
      "bottom-6 left-10 sm:bottom-10 sm:left-16",
    delay: "2s",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="premium-grid absolute inset-x-0 top-0 h-[55rem]" />

      <div className="absolute top-20 left-[10%] size-72 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute top-32 right-[5%] size-80 rounded-full bg-accent/10 blur-[110px]" />

      <div className="container-shell relative grid min-h-[calc(100svh-5rem)] items-center gap-14 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              Bangladesh&apos;s premium gear marketplace
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.94] font-semibold tracking-[-0.065em] text-balance sm:text-6xl lg:text-[5.5rem] xl:text-[6.4rem]">
              Great adventures
              <span className="text-gradient block">
                start with the right gear.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Rent professional equipment from trusted
              providers for travel, photography, outdoor
              adventures, events and creative projects.
            </p>
          </Reveal>

          <Reveal
            delay={0.24}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Link
                href="/gear"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "h-13 rounded-full px-7 shadow-glow",
                )}
              >
                Explore all gear
                <ArrowRight className="size-4" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={8}>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-13 rounded-full bg-background/50 px-7 backdrop-blur-xl",
                )}
              >
                List your equipment
              </Link>
            </MagneticButton>
          </Reveal>

          <Reveal
            delay={0.32}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="size-4 text-primary" />
                {item}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={0.18}
          distance={44}
          className="relative"
        >
          <div className="relative mx-auto aspect-[0.92] w-full max-w-[34rem]">
            <div className="absolute inset-[8%] rounded-[3rem] bg-gradient-to-br from-primary/25 via-card to-accent/20 blur-2xl" />

            <div className="glass-panel premium-ring absolute inset-[7%] overflow-hidden rounded-[2.5rem] p-5 sm:p-7">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border bg-background/60 px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.18em] uppercase backdrop-blur-xl">
                    Live inventory
                  </span>

                  <span className="flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1.5 text-xs font-medium text-primary">
                    <span className="size-2 animate-pulse rounded-full bg-primary" />
                    Available now
                  </span>
                </div>

                <div className="mx-auto flex size-32 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/10 text-primary shadow-glow sm:size-40">
                  <Compass className="size-16 sm:size-20" />
                </div>

                <div className="rounded-[1.5rem] border bg-background/70 p-4 backdrop-blur-2xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Find gear near
                      </p>

                      <p className="mt-1 flex items-center gap-2 font-display text-lg font-semibold">
                        <MapPin className="size-4 text-primary" />
                        Chattogram
                      </p>
                    </div>

                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <ArrowRight className="size-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {floatingGear.map(
              ({
                icon: Icon,
                title,
                position,
                delay,
              }) => (
                <div
                  key={title}
                  className={cn(
                    "glass-panel animate-float absolute z-10 flex items-center gap-3 rounded-2xl p-3 pr-4",
                    position,
                  )}
                  style={{
                    animationDelay: delay,
                  }}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </span>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Popular
                    </p>
                    <p className="text-sm font-semibold">
                      {title}
                    </p>
                  </div>
                </div>
              ),
            )}

            <div className="glass-panel absolute right-2 bottom-[18%] z-20 hidden items-center gap-3 rounded-2xl p-3 sm:flex">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <ShieldCheck className="size-5" />
              </span>

              <div>
                <p className="text-xs text-muted-foreground">
                  Every provider
                </p>
                <p className="text-sm font-semibold">
                  Identity verified
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
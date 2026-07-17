import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  PackageOpen,
  Sparkles,
} from "lucide-react";

import { MagneticButton } from "@/components/animation/magnetic-button";
import { Reveal } from "@/components/animation/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const benefits = [
  "Reach customers across Bangladesh",
  "Control your own prices and availability",
  "Manage orders from one provider dashboard",
];

export function ProviderCta() {
  return (
    <section className="section-space pt-0">
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-background shadow-2xl sm:px-10 lg:px-16 lg:py-20 dark:bg-card dark:text-foreground">
            <div className="absolute -top-40 -right-28 size-96 rounded-full bg-primary/25 blur-[100px]" />
            <div className="absolute -bottom-48 -left-32 size-96 rounded-full bg-accent/20 blur-[110px]" />

            <div className="premium-grid absolute inset-0 opacity-30" />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-4 py-2 text-sm dark:border-border">
                  <Sparkles className="size-4 text-primary" />
                  Grow with GearUp
                </div>

                <h2 className="max-w-3xl font-display text-4xl leading-[1] font-semibold tracking-[-0.055em] text-balance sm:text-5xl lg:text-6xl">
                  Turn unused equipment into a growing business.
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-background/65 dark:text-muted-foreground">
                  Join GearUp as a provider, reach more
                  customers and earn from equipment that
                  would otherwise remain unused.
                </p>

                <div className="mt-8 space-y-3">
                  {benefits.map((benefit) => (
                    <p
                      key={benefit}
                      className="flex items-center gap-3 text-sm text-background/80 dark:text-foreground/80"
                    >
                      <CheckCircle2 className="size-4 text-primary" />
                      {benefit}
                    </p>
                  ))}
                </div>

                <div className="mt-10">
                  <MagneticButton>
                    <Link
                      href="/register"
                      className={cn(
                        buttonVariants({
                          size: "lg",
                        }),
                        "h-13 rounded-full px-7",
                      )}
                    >
                      Become a provider
                      <ArrowRight className="size-4" />
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div className="glass-panel rounded-[2rem] border-background/15 bg-background/10 p-6 dark:border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-background/60 dark:text-muted-foreground">
                        Provider earnings
                      </p>

                      <p className="mt-2 font-display text-4xl font-semibold">
                        ৳48,500
                      </p>
                    </div>

                    <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <BadgeDollarSign className="size-7" />
                    </span>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-background/10 bg-background/5 p-4 dark:border-border">
                      <PackageOpen className="size-5 text-primary" />

                      <p className="mt-5 font-display text-2xl font-semibold">
                        28
                      </p>

                      <p className="mt-1 text-xs text-background/55 dark:text-muted-foreground">
                        Active listings
                      </p>
                    </div>

                    <div className="rounded-2xl border border-background/10 bg-background/5 p-4 dark:border-border">
                      <CheckCircle2 className="size-5 text-primary" />

                      <p className="mt-5 font-display text-2xl font-semibold">
                        96
                      </p>

                      <p className="mt-1 text-xs text-background/55 dark:text-muted-foreground">
                        Completed rentals
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-primary/12 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-background/60 dark:text-muted-foreground">
                        Monthly growth
                      </span>

                      <span className="font-semibold text-primary">
                        +18.4%
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/10">
                      <div className="h-full w-[78%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
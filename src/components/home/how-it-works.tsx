import {
  CalendarCheck2,
  PackageCheck,
  Search,
} from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Search by category, location, price and availability to find the exact gear you need.",
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Reserve",
    description:
      "Choose your rental period, review the price and complete the secure booking process.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Pick up and explore",
    description:
      "Collect the equipment from the provider and enjoy your project, journey or adventure.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-space overflow-hidden bg-foreground text-background dark:bg-card dark:text-foreground">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Simple rental process"
            title="From idea to adventure in three simple steps."
            description="GearUp removes the complexity from equipment rental so you can focus on what you are creating or exploring."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
          <div className="absolute top-16 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal
                key={step.number}
                delay={index * 0.1}
              >
                <article className="relative h-full rounded-[2rem] border border-background/15 bg-background/5 p-7 backdrop-blur-xl dark:border-border dark:bg-background/40">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.22em] text-primary">
                      STEP {step.number}
                    </span>

                    <span className="flex size-13 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                      <Icon className="size-6" />
                    </span>
                  </div>

                  <h3 className="mt-16 font-display text-3xl font-semibold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-background/65 dark:text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
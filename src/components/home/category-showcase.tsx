import Link from "next/link";
import {
  ArrowUpRight,
  Bike,
  Camera,
  Hammer,
  PartyPopper,
  TentTree,
  Tickets,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

interface Category {
  title: string;
  description: string;
  icon: LucideIcon;
  count: string;
  gradient: string;
}

const categories: Category[] = [
  {
    title: "Outdoor",
    description:
      "Tents, backpacks, cooking equipment and everything needed for your next expedition.",
    icon: TentTree,
    count: "120+ items",
    gradient:
      "from-lime-400/25 via-emerald-400/10 to-transparent",
  },
  {
    title: "Photography",
    description:
      "Professional cameras, lenses, lighting systems, tripods and production equipment.",
    icon: Camera,
    count: "85+ items",
    gradient:
      "from-blue-400/25 via-cyan-400/10 to-transparent",
  },
  {
    title: "Cycling",
    description:
      "Mountain bikes, helmets, safety equipment and accessories for every trail.",
    icon: Bike,
    count: "60+ items",
    gradient:
      "from-orange-400/25 via-amber-400/10 to-transparent",
  },
  {
    title: "Tools",
    description:
      "Reliable power tools, workshop equipment and professional construction gear.",
    icon: Hammer,
    count: "140+ items",
    gradient:
      "from-violet-400/25 via-purple-400/10 to-transparent",
  },
  {
    title: "Events",
    description:
      "Sound systems, lighting, decoration and essential equipment for memorable events.",
    icon: PartyPopper,
    count: "95+ items",
    gradient:
      "from-pink-400/25 via-rose-400/10 to-transparent",
  },
  {
    title: "Experiences",
    description:
      "Specialized equipment for concerts, sports, travel and unique creative projects.",
    icon: Tickets,
    count: "75+ items",
    gradient:
      "from-teal-400/25 via-cyan-400/10 to-transparent",
  },
];

export function CategoryShowcase() {
  return (
    <section className="section-space border-y bg-surface/40">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Explore categories"
            title="Everything you need, without owning everything."
            description="Choose from carefully organized categories and find quality equipment from trusted local providers."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Reveal
                key={category.title}
                delay={index * 0.05}
              >
                <Link
                  href="/categories"
                  className="group relative block min-h-72 overflow-hidden rounded-[2rem] border bg-card p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-premium"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60 transition duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="flex size-13 items-center justify-center rounded-2xl border bg-background/60 text-primary backdrop-blur-xl">
                        <Icon className="size-6" />
                      </span>

                      <ArrowUpRight className="size-5 text-muted-foreground transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </div>

                    <div className="mt-auto pt-14">
                      <p className="mb-2 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                        {category.count}
                      </p>

                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {category.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import {
  Package,
  ShieldCheck,
  Smile,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/animation/reveal";

const statistics = [
  {
    value: "1,200+",
    label: "Available gear",
    icon: Package,
  },
  {
    value: "450+",
    label: "Verified providers",
    icon: ShieldCheck,
  },
  {
    value: "8,500+",
    label: "Successful rentals",
    icon: Users,
  },
  {
    value: "4.9/5",
    label: "Customer rating",
    icon: Smile,
  },
];

export function StatisticsSection() {
  return (
    <section className="border-b bg-surface/45 py-16">
      <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((statistic, index) => {
          const Icon = statistic.icon;

          return (
            <Reveal
              key={statistic.label}
              delay={index * 0.06}
            >
              <div className="glass-panel flex items-center gap-5 rounded-[1.5rem] p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </span>

                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em]">
                    {statistic.value}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {statistic.label}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
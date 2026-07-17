import { PackageSearch } from "lucide-react";

import { GearCard } from "@/components/gear/gear-card";
import type { Gear } from "@/types/gear";

interface GearGridProps {
  gear: Gear[];
}

export function GearGrid({
  gear,
}: GearGridProps) {
  if (gear.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed bg-muted/25 px-6 py-20 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <PackageSearch className="size-8" />
        </span>

        <h2 className="mt-6 font-display text-2xl font-semibold">
          No gear found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          Try changing the category, price,
          location or search keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {gear.map((item) => (
        <GearCard
          key={item.id}
          gear={item}
        />
      ))}
    </div>
  );
}
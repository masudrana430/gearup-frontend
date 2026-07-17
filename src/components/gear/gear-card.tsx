import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

import { AvailabilityBadge } from "@/components/gear/availability-badge";
import { GearImage } from "@/components/gear/gear-image";
import { formatCurrency } from "@/lib/utils/currency";
import type { Gear } from "@/types/gear";

interface GearCardProps {
  gear: Gear;
}

export function GearCard({
  gear,
}: GearCardProps) {
  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group overflow-hidden rounded-[2rem] border bg-card shadow-sm transition duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-premium"
    >
      <div className="relative aspect-[1.2] overflow-hidden">
        <GearImage
          src={gear.images[0]}
          alt={gear.name}
          className="transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <AvailabilityBadge
            status={gear.availability}
          />

          <span className="flex size-10 items-center justify-center rounded-full border bg-background/80 backdrop-blur-xl transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          {gear.category?.name ??
            "General gear"}
        </p>

        <h2 className="mt-3 line-clamp-2 font-display text-xl font-semibold tracking-tight">
          {gear.name}
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {gear.location ? (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {gear.location}
            </span>
          ) : null}

          <span className="flex items-center gap-1.5">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {gear.averageRating.toFixed(1)}
            <span>
              ({gear.reviewCount})
            </span>
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between border-t pt-5">
          <div>
            <p className="text-xs text-muted-foreground">
              Rental price
            </p>

            <p className="mt-1 font-display text-2xl font-semibold">
              {formatCurrency(
                gear.pricePerDay,
              )}

              <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
                /day
              </span>
            </p>
          </div>

          {gear.provider ? (
            <p className="max-w-28 truncate text-right text-xs text-muted-foreground">
              by {gear.provider.name}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
import { MapPin, ShieldCheck, Star, UserRound } from "lucide-react";

import { AvailabilityBadge } from "@/components/gear/availability-badge";

import { formatCurrency } from "@/lib/utils/currency";
import type { Gear } from "@/types/gear";

import { RentalForm } from "@/components/rental/rental-form";

interface GearDetailsProps {
  gear: Gear;
}

export function GearDetails({ gear }: GearDetailsProps) {
  const specifications = Object.entries(gear.specifications);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <AvailabilityBadge status={gear.availability} />

        {gear.category ? (
          <span className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
            {gear.category.name}
          </span>
        ) : null}
      </div>

      <h1 className="mt-5 font-display text-4xl leading-[1] font-semibold tracking-[-0.05em] sm:text-5xl">
        {gear.name}
      </h1>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          {gear.averageRating.toFixed(1)}
          <span>({gear.reviewCount} reviews)</span>
        </span>

        {gear.location ? (
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            {gear.location}
          </span>
        ) : null}

        {gear.provider ? (
          <span className="flex items-center gap-2">
            <UserRound className="size-4 text-primary" />
            {gear.provider.name}
          </span>
        ) : null}
      </div>

      <p className="mt-7 whitespace-pre-line text-base leading-8 text-muted-foreground">
        {gear.description ||
          "No description has been provided for this equipment."}
      </p>

      <div className="glass-panel mt-8 rounded-[2rem] p-6">
        <p className="text-sm text-muted-foreground">Rental price</p>

        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
          {formatCurrency(gear.pricePerDay)}

          <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">
            per day
          </span>
        </p>

        {gear.depositAmount > 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Refundable deposit:{" "}
            <strong className="text-foreground">
              {formatCurrency(gear.depositAmount)}
            </strong>
          </p>
        ) : null}

        <div className="mt-8">
          <RentalForm
            gearId={gear.id}
            gearName={gear.name}
            pricePerDay={gear.pricePerDay}
            depositAmount={gear.depositAmount}
            availability={gear.availability}
          />
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          Secure rental through GearUp
        </p>
      </div>

      {specifications.length > 0 ? (
        <div className="mt-8 rounded-[2rem] border bg-card p-6">
          <h2 className="font-display text-xl font-semibold">Specifications</h2>

          <dl className="mt-5 divide-y">
            {specifications.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-6 py-4 text-sm"
              >
                <dt className="capitalize text-muted-foreground">
                  {label.replaceAll("_", " ")}
                </dt>

                <dd className="text-right font-medium">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

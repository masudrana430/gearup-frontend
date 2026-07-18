import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { GearImage } from "@/components/gear/gear-image";
import {
  PaymentStatusBadge,
  RentalStatusBadge,
} from "@/components/rental/rental-status";
import { formatCurrency } from "@/lib/utils/currency";
import {
  formatDate,
} from "@/lib/utils/date";
import type { Rental } from "@/types/rental";

interface RentalCardProps {
  rental: Rental;
}

export function RentalCard({
  rental,
}: RentalCardProps) {
  return (
    <Link
      href={`/customer/rentals/${rental.id}`}
      className="group grid overflow-hidden rounded-[2rem] border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-premium sm:grid-cols-[12rem_1fr]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto">
        <GearImage
          src={rental.gear.imageUrl}
          alt={rental.gear.name}
          className="transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          <RentalStatusBadge
            status={rental.status}
          />

          <PaymentStatusBadge
            status={rental.paymentStatus}
          />
        </div>

        <h2 className="mt-4 font-display text-xl font-semibold">
          {rental.gear.name}
        </h2>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />

            {formatDate(
              rental.startDate,
            )}{" "}
            –{" "}
            {formatDate(
              rental.endDate,
            )}
          </span>

          {rental.gear.location ? (
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {rental.gear.location}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-end justify-between border-t pt-5">
          <div>
            <p className="text-xs text-muted-foreground">
              {rental.rentalDays} rental
              day
              {rental.rentalDays === 1
                ? ""
                : "s"}
            </p>

            <p className="mt-1 font-display text-2xl font-semibold">
              {formatCurrency(
                rental.totalAmount,
              )}
            </p>
          </div>

          <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
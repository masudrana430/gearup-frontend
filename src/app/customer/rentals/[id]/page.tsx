import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  UserRound,
} from "lucide-react";
import { notFound } from "next/navigation";

import { CancelRentalButton } from "@/components/rental/cancel-rental-button";
import {
  PaymentStatusBadge,
  RentalStatusBadge,
} from "@/components/rental/rental-status";
import { RentalTimeline } from "@/components/rental/rental-timeline";
import { buttonVariants } from "@/components/ui/button";
import { ApiError } from "@/lib/api/api-error";
import { getCustomerRentalById } from "@/features/rentals/rental.server";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/currency";
import {
  formatDate,
  formatDateTime,
} from "@/lib/utils/date";

interface RentalDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RentalDetailsPage({
  params,
}: RentalDetailsPageProps) {
  const { id } = await params;

  let rental;

  try {
    rental =
      await getCustomerRentalById(id);
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }

  const canCancel = [
    "PENDING",
    "CONFIRMED",
  ].includes(rental.status);

  return (
    <div>
      <Link
        href="/customer/rentals"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to rentals
      </Link>

      <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <RentalStatusBadge
              status={rental.status}
            />

            <PaymentStatusBadge
              status={
                rental.paymentStatus
              }
            />
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em]">
            {rental.gear.name}
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Rental #{rental.id}
          </p>
        </div>

        {canCancel ? (
          <CancelRentalButton
            rentalId={rental.id}
          />
        ) : null}
      </div>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-xl font-semibold">
          Rental progress
        </h2>

        <RentalTimeline
          status={rental.status}
        />
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="rounded-[2rem] border bg-card p-6">
          <h2 className="font-display text-xl font-semibold">
            Rental information
          </h2>

          <dl className="mt-6 divide-y">
            <div className="flex justify-between gap-6 py-4">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4 text-primary" />
                Rental period
              </dt>

              <dd className="text-right text-sm font-medium">
                {formatDate(
                  rental.startDate,
                )}{" "}
                –{" "}
                {formatDate(
                  rental.endDate,
                )}
              </dd>
            </div>

            <div className="flex justify-between gap-6 py-4">
              <dt className="text-sm text-muted-foreground">
                Rental duration
              </dt>

              <dd className="text-sm font-medium">
                {rental.rentalDays} day
                {rental.rentalDays === 1
                  ? ""
                  : "s"}
              </dd>
            </div>

            {rental.gear.location ? (
              <div className="flex justify-between gap-6 py-4">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  Location
                </dt>

                <dd className="text-sm font-medium">
                  {rental.gear.location}
                </dd>
              </div>
            ) : null}

            {rental.provider ? (
              <div className="flex justify-between gap-6 py-4">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound className="size-4 text-primary" />
                  Provider
                </dt>

                <dd className="text-sm font-medium">
                  {rental.provider.name}
                </dd>
              </div>
            ) : null}

            {rental.createdAt ? (
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-muted-foreground">
                  Created
                </dt>

                <dd className="text-sm font-medium">
                  {formatDateTime(
                    rental.createdAt,
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>

        <aside className="glass-panel rounded-[2rem] p-6">
          <h2 className="font-display text-xl font-semibold">
            Price summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Price per day
              </span>

              <span>
                {formatCurrency(
                  rental.gear.pricePerDay,
                )}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Rental days
              </span>

              <span>
                {rental.rentalDays}
              </span>
            </div>

            {rental.depositAmount > 0 ? (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Refundable deposit
                </span>

                <span>
                  {formatCurrency(
                    rental.depositAmount,
                  )}
                </span>
              </div>
            ) : null}

            <div className="flex justify-between gap-4 border-t pt-5">
              <span className="font-semibold">
                Rental total
              </span>

              <span className="font-display text-2xl font-semibold text-primary">
                {formatCurrency(
                  rental.totalAmount,
                )}
              </span>
            </div>
          </div>

          {rental.paymentStatus !==
          "PAID" ? (
            <div className="mt-6">
              <span
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "pointer-events-none h-12 w-full rounded-full opacity-60",
                )}
              >
                Payment added in Phase 6
              </span>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
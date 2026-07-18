import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  PackageCheck,
  WalletCards,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { RentalCard } from "@/components/rental/rental-card";
import { buttonVariants } from "@/components/ui/button";
import { getCustomerRentals } from "@/features/rentals/rental.server";
import { requireRole } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/currency";

export default async function CustomerPage() {
  const user = await requireRole([
    "CUSTOMER",
  ]);

  const result =
    await getCustomerRentals({
      page: 1,
      limit: 20,
    });

  const activeCount =
    result.items.filter((rental) =>
      [
        "PENDING",
        "CONFIRMED",
        "ACTIVE",
      ].includes(rental.status),
    ).length;

  const completedCount =
    result.items.filter(
      (rental) =>
        rental.status === "COMPLETED",
    ).length;

  const totalSpent = result.items
    .filter(
      (rental) =>
        rental.paymentStatus === "PAID",
    )
    .reduce(
      (total, rental) =>
        total + rental.totalAmount,
      0,
    );

  const recentRentals =
    result.items.slice(0, 3);

  return (
    <div>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            Customer overview
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.045em]">
            Welcome back, {user.name}
          </h1>

          <p className="mt-3 text-muted-foreground">
            Manage your rentals and keep
            track of your GearUp activity.
          </p>
        </div>

        <Link
          href="/gear"
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "rounded-full",
          )}
        >
          Browse gear
        </Link>
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total rentals"
          value={result.total}
          description="All rental requests"
          icon={PackageCheck}
        />

        <StatCard
          label="Active rentals"
          value={activeCount}
          description="Pending, confirmed or active"
          icon={CalendarClock}
        />

        <StatCard
          label="Completed"
          value={completedCount}
          description="Successfully returned"
          icon={CheckCircle2}
        />

        <StatCard
          label="Total paid"
          value={formatCurrency(
            totalSpent,
          )}
          description="Completed payments"
          icon={WalletCards}
        />
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Recent rentals
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Your latest GearUp activity.
            </p>
          </div>

          <Link
            href="/customer/rentals"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {recentRentals.length > 0 ? (
          <div className="mt-6 space-y-5">
            {recentRentals.map(
              (rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-6 rounded-[2rem] border border-dashed bg-card py-16 text-center">
            <PackageCheck className="mx-auto size-10 text-primary" />

            <h3 className="mt-5 font-display text-xl font-semibold">
              No rentals yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Browse the marketplace and
              reserve your first item.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
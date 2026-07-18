import Link from "next/link";
import { PackageSearch } from "lucide-react";

import { RentalCard } from "@/components/rental/rental-card";
import { buttonVariants } from "@/components/ui/button";
import { getCustomerRentals } from "@/features/rentals/rental.server";
import { cn } from "@/lib/utils/cn";
import type {
  RentalStatus,
} from "@/types/rental";

const statusOptions: Array<{
  label: string;
  value?: RentalStatus;
}> = [
  {
    label: "All",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

interface CustomerRentalsPageProps {
  searchParams: Promise<{
    status?: string;
    page?: string;
  }>;
}

function parseStatus(
  value?: string,
): RentalStatus | undefined {
  const validStatuses: RentalStatus[] = [
    "PENDING",
    "CONFIRMED",
    "ACTIVE",
    "COMPLETED",
    "CANCELLED",
    "REJECTED",
  ];

  return validStatuses.includes(
    value as RentalStatus,
  )
    ? (value as RentalStatus)
    : undefined;
}

export default async function CustomerRentalsPage({
  searchParams,
}: CustomerRentalsPageProps) {
  const params = await searchParams;

  const selectedStatus =
    parseStatus(params.status);

  const parsedPage = Number(
    params.page,
  );

  const page =
    Number.isFinite(parsedPage) &&
    parsedPage > 0
      ? Math.floor(parsedPage)
      : 1;

  const result =
    await getCustomerRentals({
      page,
      limit: 10,
      status: selectedStatus,
    });

  return (
    <div>
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          Rental history
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.045em]">
          My rentals
        </h1>

        <p className="mt-3 text-muted-foreground">
          Review current and previous
          equipment rentals.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {statusOptions.map((option) => {
          const active =
            option.value === selectedStatus;

          const href = option.value
            ? `/customer/rentals?status=${option.value}`
            : "/customer/rentals";

          return (
            <Link
              key={option.label}
              href={href}
              className={cn(
                buttonVariants({
                  variant: active
                    ? "default"
                    : "outline",
                  size: "sm",
                }),
                "rounded-full",
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      {result.items.length > 0 ? (
        <div className="mt-8 space-y-5">
          {result.items.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-dashed bg-card py-20 text-center">
          <PackageSearch className="mx-auto size-12 text-primary" />

          <h2 className="mt-5 font-display text-2xl font-semibold">
            No rentals found
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            No rentals match the selected
            status.
          </p>

          <Link
            href="/gear"
            className={cn(
              buttonVariants(),
              "mt-6 rounded-full",
            )}
          >
            Browse gear
          </Link>
        </div>
      )}

      {result.totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-4">
          {page > 1 ? (
            <Link
              href={`/customer/rentals?page=${
                page - 1
              }${
                selectedStatus
                  ? `&status=${selectedStatus}`
                  : ""
              }`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "rounded-full",
              )}
            >
              Previous
            </Link>
          ) : null}

          <span className="text-sm text-muted-foreground">
            Page {result.page} of{" "}
            {result.totalPages}
          </span>

          {page < result.totalPages ? (
            <Link
              href={`/customer/rentals?page=${
                page + 1
              }${
                selectedStatus
                  ? `&status=${selectedStatus}`
                  : ""
              }`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "rounded-full",
              )}
            >
              Next
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
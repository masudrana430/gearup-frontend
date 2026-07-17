import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { GearFilters } from "@/types/gear";

interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  filters: GearFilters;
}

function createPageUrl(
  targetPage: number,
  filters: GearFilters,
): string {
  const params = new URLSearchParams();

  params.set(
    "page",
    String(targetPage),
  );

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.categoryId) {
    params.set(
      "categoryId",
      filters.categoryId,
    );
  }

  if (filters.location) {
    params.set(
      "location",
      filters.location,
    );
  }

  if (filters.minPrice !== undefined) {
    params.set(
      "minPrice",
      String(filters.minPrice),
    );
  }

  if (filters.maxPrice !== undefined) {
    params.set(
      "maxPrice",
      String(filters.maxPrice),
    );
  }

  if (filters.availableOnly) {
    params.set("available", "1");
  }

  params.set("sort", filters.sort);

  return `/gear?${params.toString()}`;
}

export function CatalogPagination({
  page,
  totalPages,
  filters,
}: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousDisabled = page <= 1;
  const nextDisabled =
    page >= totalPages;

  return (
    <nav
      aria-label="Gear pagination"
      className="mt-12 flex items-center justify-center gap-4"
    >
      {previousDisabled ? (
        <span
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "pointer-events-none rounded-full opacity-45",
          )}
        >
          <ChevronLeft className="size-4" />
          Previous
        </span>
      ) : (
        <Link
          href={createPageUrl(
            page - 1,
            filters,
          )}
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "rounded-full",
          )}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Link>
      )}

      <span className="text-sm text-muted-foreground">
        Page{" "}
        <strong className="text-foreground">
          {page}
        </strong>{" "}
        of{" "}
        <strong className="text-foreground">
          {totalPages}
        </strong>
      </span>

      {nextDisabled ? (
        <span
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "pointer-events-none rounded-full opacity-45",
          )}
        >
          Next
          <ChevronRight className="size-4" />
        </span>
      ) : (
        <Link
          href={createPageUrl(
            page + 1,
            filters,
          )}
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "rounded-full",
          )}
        >
          Next
          <ChevronRight className="size-4" />
        </Link>
      )}
    </nav>
  );
}
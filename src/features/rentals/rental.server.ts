import "server-only";

import { cache } from "react";

import {
  findRentalArray,
  findSingleRental,
  normalizeRental,
} from "@/features/rentals/rental.mapper";
import { ApiError } from "@/lib/api/api-error";
import { apiEndpoints } from "@/lib/api/endpoints";
import { serverApi } from "@/lib/api/server";
import type {
  Rental,
  RentalListFilters,
  RentalListResult,
} from "@/types/rental";

function createEmptyRentalResult(
  page: number,
  limit: number,
): RentalListResult {
  return {
    items: [],
    page,
    limit,
    total: 0,
    totalPages: 1,
  };
}

export async function getCustomerRentals(
  filters: RentalListFilters = {},
): Promise<RentalListResult> {
  const requestedPage = Math.max(
    1,
    Math.floor(filters.page ?? 1),
  );

  const limit = Math.max(
    1,
    Math.floor(filters.limit ?? 12),
  );

  let payload: unknown;

  try {
    /*
     * The current backend endpoint rejects
     * pagination or status query parameters.
     * Therefore, rentals are loaded first and
     * filtered/paginated locally.
     */
    payload = await serverApi.get<unknown>(
      apiEndpoints.rentals.mine,
      {
        cache: "no-store",
      },
    );
  } catch (error) {
  /*
   * The deployed backend currently rejects
   * or does not provide the customer-rentals
   * endpoint. Return an empty result so the
   * customer dashboard can still render.
   */
  if (
    error instanceof ApiError &&
    [400, 404, 422].includes(error.status)
  ) {
    return createEmptyRentalResult(
      requestedPage,
      limit,
    );
  }

  /*
   * Authentication and unexpected server errors
   * must still be passed to the route boundary.
   */
  throw error;
}

  const normalizedItems = findRentalArray(
    payload,
  )
    .map(normalizeRental)
    .filter(
      (rental): rental is Rental =>
        rental !== null,
    );

  const filteredItems =
    filters.status &&
    filters.status !== "UNKNOWN"
      ? normalizedItems.filter(
          (rental) =>
            rental.status ===
            filters.status,
        )
      : normalizedItems;

  const total = filteredItems.length;

  const totalPages = Math.max(
    1,
    Math.ceil(total / limit),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const startIndex =
    (currentPage - 1) * limit;

  const items = filteredItems.slice(
    startIndex,
    startIndex + limit,
  );

  return {
    items,
    page: currentPage,
    limit,
    total,
    totalPages,
  };
}

export const getCustomerRentalById =
  cache(
    async (
      rentalId: string,
    ): Promise<Rental> => {
      const payload =
        await serverApi.get<unknown>(
          apiEndpoints.rentals.byId(
            rentalId,
          ),
          {
            cache: "no-store",
          },
        );

      const rental = normalizeRental(
        findSingleRental(payload),
      );

      if (!rental) {
        throw new ApiError(
          "Rental not found.",
          404,
        );
      }

      return rental;
    },
  );
"use client";

import { apiEndpoints } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/client";
import {
  extractRentalId,
  findSingleRental,
  normalizeRental,
} from "@/features/rentals/rental.mapper";
import type {
  CreateRentalInput,
  CreateRentalResult,
  Rental,
} from "@/types/rental";

export async function createRental(
  input: CreateRentalInput,
): Promise<CreateRentalResult> {
  const payload =
    await apiClient.post<unknown>(
      apiEndpoints.rentals.create,
      {
        gearId: input.gearId,
        startDate: input.startDate,
        endDate: input.endDate,
      },
    );

  const rentalId =
    extractRentalId(payload);

  if (!rentalId) {
    throw new Error(
      "The backend did not return a rental ID.",
    );
  }

  return {
    rentalId,
  };
}

export async function cancelRental(
  rentalId: string,
): Promise<Rental | null> {
  const payload =
    await apiClient.patch<unknown>(
      apiEndpoints.rentals.cancel(
        rentalId,
      ),
    );

  return normalizeRental(
    findSingleRental(payload),
  );
}
"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  cancelRental,
  createRental,
} from "@/features/rentals/rental.api";

export const rentalQueryKeys = {
  all: ["rentals"] as const,

  mine: () =>
    ["rentals", "mine"] as const,

  detail: (rentalId: string) =>
    [
      "rentals",
      "detail",
      rentalId,
    ] as const,
};

export function useCreateRentalMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createRental,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          rentalQueryKeys.mine(),
      });
    },
  });
}

export function useCancelRentalMutation(
  rentalId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: () =>
      cancelRental(rentalId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            rentalQueryKeys.mine(),
        }),

        queryClient.invalidateQueries({
          queryKey:
            rentalQueryKeys.detail(
              rentalId,
            ),
        }),
      ]);
    },
  });
}
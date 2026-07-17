"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCurrentUser,
  login,
  logout,
  registerUser,
} from "@/features/auth/auth.api";
import type { AuthUser } from "@/types/auth";

export const authQueryKey = [
  "auth",
  "current-user",
] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKey,
    queryFn: getCurrentUser,
    staleTime: 60_000,
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: ({ user }) => {
      queryClient.setQueryData<AuthUser>(
        authQueryKey,
        user,
      );
    },
  });
}

export function useRegisterMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (result) => {
      if (
        result.authenticated &&
        result.user
      ) {
        queryClient.setQueryData<AuthUser>(
          authQueryKey,
          result.user,
        );
      }
    },
  });
}

export function useLogoutMutation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(
        authQueryKey,
        null,
      );

      queryClient.removeQueries({
        predicate: (query) =>
          query.queryKey[0] !== "auth",
      });
    },
  });
}
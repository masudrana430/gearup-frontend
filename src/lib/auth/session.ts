import "server-only";

import { cache } from "react";

import {
  extractAuthUser,
} from "@/lib/auth/auth-response";
import { ApiError } from "@/lib/api/api-error";
import { apiEndpoints } from "@/lib/api/endpoints";
import { serverApi } from "@/lib/api/server";
import type { AuthUser } from "@/types/auth";

export const getServerUser = cache(
  async (): Promise<AuthUser | null> => {
    try {
      const payload =
        await serverApi.get<unknown>(
          apiEndpoints.auth.me,
          {
            cache: "no-store",
          },
        );

      return extractAuthUser(payload);
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.status === 401
      ) {
        return null;
      }

      throw error;
    }
  },
);
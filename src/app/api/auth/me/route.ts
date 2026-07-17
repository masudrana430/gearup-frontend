import { NextResponse } from "next/server";

import {
  extractAuthUser,
} from "@/lib/auth/auth-response";
import {
  deleteAuthCookie,
  getAuthToken,
} from "@/lib/auth/cookies";
import { createAuthErrorResponse } from "@/lib/auth/route-error";
import { ApiError } from "@/lib/api/api-error";
import { apiEndpoints } from "@/lib/api/endpoints";
import { serverApi } from "@/lib/api/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated.",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const payload =
      await serverApi.get<unknown>(
        apiEndpoints.auth.me,
        {
          withAuth: false,

          headers: {
            authorization: `Bearer ${token}`,
          },

          cache: "no-store",
        },
      );

    const user =
      extractAuthUser(payload);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid user profile response.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Current user loaded.",
      data: {
        user,
      },
    });
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 401
    ) {
      await deleteAuthCookie();
    }

    return createAuthErrorResponse(error);
  }
}
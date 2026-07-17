import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { registerRequestSchema } from "@/features/auth/auth.schema";
import {
  extractAccessToken,
  extractAuthMessage,
  extractAuthUser,
} from "@/lib/auth/auth-response";
import { setAuthCookie } from "@/lib/auth/cookies";
import { createAuthErrorResponse } from "@/lib/auth/route-error";
import { apiEndpoints } from "@/lib/api/endpoints";
import { serverApi } from "@/lib/api/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON request body.",
      },
      {
        status: 400,
      },
    );
  }

  const validated =
    registerRequestSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please correct the registration form.",
        errors:
          validated.error.flatten()
            .fieldErrors,
      },
      {
        status: 422,
      },
    );
  }

  try {
    const payload =
      await serverApi.post<unknown>(
        apiEndpoints.auth.register,
        validated.data,
        {
          withAuth: false,
        },
      );

    const token =
      extractAccessToken(payload);

    let user =
      extractAuthUser(payload);

    if (token) {
      await setAuthCookie(token);

      if (!user) {
        const profilePayload =
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

        user =
          extractAuthUser(profilePayload);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          extractAuthMessage(payload),

        data: {
          authenticated: Boolean(
            token && user,
          ),
          user,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return createAuthErrorResponse(error);
  }
}
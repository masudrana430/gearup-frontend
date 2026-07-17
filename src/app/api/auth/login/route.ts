import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { loginSchema } from "@/features/auth/auth.schema";
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
    loginSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please correct the login form.",
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
        apiEndpoints.auth.login,
        validated.data,
        {
          withAuth: false,
        },
      );

    const token =
      extractAccessToken(payload);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The backend did not return an access token.",
        },
        {
          status: 502,
        },
      );
    }

    let user =
      extractAuthUser(payload);

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

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The backend returned an invalid user profile.",
        },
        {
          status: 502,
        },
      );
    }

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message:
        extractAuthMessage(payload),
      data: {
        user,
      },
    });
  } catch (error) {
    return createAuthErrorResponse(error);
  }
}
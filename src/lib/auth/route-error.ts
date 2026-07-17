import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/api-error";

export function createAuthErrorResponse(
  error: unknown,
): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        code: error.code,
        details: error.details,
      },
      {
        status: error.status,
      },
    );
  }

  console.error("Authentication error:", error);

  return NextResponse.json(
    {
      success: false,
      message:
        "An unexpected authentication error occurred.",
    },
    {
      status: 500,
    },
  );
}
import { cookies } from "next/headers";
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    path: string[];
  }>;
}

const forwardedRequestHeaders = [
  "accept",
  "accept-language",
  "content-type",
] as const;

const forwardedResponseHeaders = [
  "cache-control",
  "content-disposition",
  "content-type",
  "etag",
  "last-modified",
] as const;

async function proxyRequest(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { path } = await context.params;

    const normalizedPath = path
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    /*
     * Authentication requests will use dedicated secure route handlers
     * during the authentication phase.
     */
    if (
      normalizedPath === "auth" ||
      normalizedPath.startsWith("auth/")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authentication endpoints must use /api/auth routes.",
        },
        {
          status: 400,
        },
      );
    }

    const upstreamUrl = new URL(
      `${serverEnv.BACKEND_API_URL}/${normalizedPath}`,
    );

    upstreamUrl.search = request.nextUrl.search;

    const headers = new Headers();

    forwardedRequestHeaders.forEach((headerName) => {
      const value = request.headers.get(headerName);

      if (value) {
        headers.set(headerName, value);
      }
    });

    const cookieStore = await cookies();

    const token = cookieStore.get(
      serverEnv.AUTH_COOKIE_NAME,
    )?.value;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    const supportsBody = !["GET", "HEAD"].includes(
      request.method,
    );

    const requestBody = supportsBody
      ? await request.arrayBuffer()
      : undefined;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body:
        requestBody && requestBody.byteLength > 0
          ? requestBody
          : undefined,
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers();

    forwardedResponseHeaders.forEach((headerName) => {
      const value =
        upstreamResponse.headers.get(headerName);

      if (value) {
        responseHeaders.set(headerName, value);
      }
    });

    responseHeaders.set(
      "x-content-type-options",
      "nosniff",
    );

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Backend proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to communicate with the backend.",
      },
      {
        status: 502,
      },
    );
  }
}

export function GET(
  request: NextRequest,
  context: RouteContext,
) {
  return proxyRequest(request, context);
}

export function POST(
  request: NextRequest,
  context: RouteContext,
) {
  return proxyRequest(request, context);
}

export function PUT(
  request: NextRequest,
  context: RouteContext,
) {
  return proxyRequest(request, context);
}

export function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  return proxyRequest(request, context);
}

export function DELETE(
  request: NextRequest,
  context: RouteContext,
) {
  return proxyRequest(request, context);
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    },
  });
}
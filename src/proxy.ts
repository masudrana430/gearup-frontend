import {
  type NextRequest,
  NextResponse,
} from "next/server";

const protectedPrefixes = [
  "/customer",
  "/provider",
  "/admin",
];

export function proxy(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

  const protectedRoute =
    protectedPrefixes.some(
      (prefix) =>
        pathname === prefix ||
        pathname.startsWith(
          `${prefix}/`,
        ),
    );

  if (!protectedRoute) {
    return NextResponse.next();
  }

  const cookieName =
    process.env.AUTH_COOKIE_NAME ??
    "gearup_access_token";

  const token =
    request.cookies.get(
      cookieName,
    )?.value;

  if (!token) {
    const loginUrl =
      request.nextUrl.clone();

    loginUrl.pathname = "/login";

    loginUrl.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(
      loginUrl,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/customer/:path*",
    "/provider/:path*",
    "/admin/:path*",
  ],
};
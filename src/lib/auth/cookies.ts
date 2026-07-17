import "server-only";

import { cookies } from "next/headers";

import { serverEnv } from "@/lib/env";

const AUTH_COOKIE_MAX_AGE =
  60 * 60 * 24 * 7;

export async function setAuthCookie(
  token: string,
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(
    serverEnv.AUTH_COOKIE_NAME,
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE,
      priority: "high",
    },
  );
}

export async function deleteAuthCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(
    serverEnv.AUTH_COOKIE_NAME,
    "",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    },
  );
}

export async function getAuthToken(): Promise<
  string | null
> {
  const cookieStore = await cookies();

  return (
    cookieStore.get(
      serverEnv.AUTH_COOKIE_NAME,
    )?.value ?? null
  );
}
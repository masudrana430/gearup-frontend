"use client";

import { parseApiResponse } from "@/lib/api/response";
import type { ApiResponse } from "@/types/api";
import type {
  AuthSessionResult,
  AuthUser,
  LoginInput,
  LoginResult,
  RegisterInput,
  RegisterResult,
} from "@/types/auth";

async function authRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...options,

    headers: {
      accept: "application/json",
      "content-type": "application/json",
      ...options?.headers,
    },

    credentials: "include",
    cache: "no-store",
  });

  return parseApiResponse<T>(response);
}

export async function login(
  input: LoginInput,
): Promise<LoginResult> {
  const response =
    await authRequest<
      ApiResponse<LoginResult>
    >("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });

  return response.data;
}

export async function registerUser(
  input: RegisterInput,
): Promise<RegisterResult> {
  const response =
    await authRequest<
      ApiResponse<RegisterResult>
    >("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });

  return response.data;
}

export async function getCurrentUser(): Promise<
  AuthUser | null
> {
  const response = await fetch(
    "/api/auth/me",
    {
      credentials: "include",
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    return null;
  }

  const payload =
    await parseApiResponse<
      ApiResponse<AuthSessionResult>
    >(response);

  return payload.data.user;
}

export async function logout(): Promise<void> {
  await authRequest<
    ApiResponse<null>
  >("/api/auth/logout", {
    method: "POST",
  });
}
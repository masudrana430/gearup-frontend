import "server-only";

import { cookies } from "next/headers";

import { serverEnv } from "@/lib/env";
import { parseApiResponse } from "@/lib/api/response";
import { buildQueryString } from "@/lib/utils/query-string";
import type { QueryParams } from "@/types/api";

interface NextFetchConfiguration {
  revalidate?: number | false;
  tags?: string[];
}

type JsonBody =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null;

export interface ServerRequestOptions
  extends Omit<RequestInit, "body" | "method"> {
  body?: BodyInit | JsonBody;
  query?: QueryParams;
  withAuth?: boolean;
  next?: NextFetchConfiguration;
}

function createUrl(
  path: string,
  query?: QueryParams,
): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${serverEnv.BACKEND_API_URL}${normalizedPath}${buildQueryString(query)}`;
}

function createRequestBody(
  body: ServerRequestOptions["body"],
  headers: Headers,
): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (
    typeof body === "string" ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return JSON.stringify(body);
}

async function request<T>(
  method: string,
  path: string,
  options: ServerRequestOptions = {},
): Promise<T> {
  const {
    body,
    query,
    withAuth = true,
    headers: initialHeaders,
    ...requestOptions
  } = options;

  const headers = new Headers(initialHeaders);

  if (!headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  if (withAuth && !headers.has("authorization")) {
    const cookieStore = await cookies();

    const token = cookieStore.get(
      serverEnv.AUTH_COOKIE_NAME,
    )?.value;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(createUrl(path, query), {
    ...requestOptions,
    method,
    headers,
    body: createRequestBody(body, headers),
    cache: requestOptions.cache ?? "no-store",
  });

  return parseApiResponse<T>(response);
}

export const serverApi = {
  get<T>(
    path: string,
    options?: ServerRequestOptions,
  ) {
    return request<T>("GET", path, options);
  },

  post<T>(
    path: string,
    body?: ServerRequestOptions["body"],
    options?: ServerRequestOptions,
  ) {
    return request<T>("POST", path, {
      ...options,
      body,
    });
  },

  patch<T>(
    path: string,
    body?: ServerRequestOptions["body"],
    options?: ServerRequestOptions,
  ) {
    return request<T>("PATCH", path, {
      ...options,
      body,
    });
  },

  put<T>(
    path: string,
    body?: ServerRequestOptions["body"],
    options?: ServerRequestOptions,
  ) {
    return request<T>("PUT", path, {
      ...options,
      body,
    });
  },

  delete<T>(
    path: string,
    options?: ServerRequestOptions,
  ) {
    return request<T>("DELETE", path, options);
  },
};
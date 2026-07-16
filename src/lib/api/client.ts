"use client";

import { API_PROXY_BASE } from "@/lib/constants";
import { parseApiResponse } from "@/lib/api/response";
import { buildQueryString } from "@/lib/utils/query-string";
import type { QueryParams } from "@/types/api";

type JsonBody =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null;

export interface ClientRequestOptions
  extends Omit<RequestInit, "body" | "method"> {
  body?: BodyInit | JsonBody;
  query?: QueryParams;
  timeoutMs?: number;
}

function createRequestBody(
  body: ClientRequestOptions["body"],
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

function createUrl(
  path: string,
  query?: QueryParams,
): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${API_PROXY_BASE}${normalizedPath}${buildQueryString(query)}`;
}

async function request<T>(
  method: string,
  path: string,
  options: ClientRequestOptions = {},
): Promise<T> {
  const {
    body,
    query,
    timeoutMs = 15_000,
    headers: initialHeaders,
    signal: externalSignal,
    ...requestOptions
  } = options;

  const headers = new Headers(initialHeaders);

  if (!headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  const controller = new AbortController();

  const abortFromExternalSignal = () => {
    controller.abort(externalSignal?.reason);
  };

  if (externalSignal?.aborted) {
    abortFromExternalSignal();
  } else {
    externalSignal?.addEventListener(
      "abort",
      abortFromExternalSignal,
      { once: true },
    );
  }

  const timeoutId = window.setTimeout(() => {
    controller.abort(
      new DOMException("Request timed out.", "TimeoutError"),
    );
  }, timeoutMs);

  try {
    const response = await fetch(createUrl(path, query), {
      ...requestOptions,
      method,
      headers,
      body: createRequestBody(body, headers),
      credentials: "include",
      signal: controller.signal,
    });

    return await parseApiResponse<T>(response);
  } finally {
    window.clearTimeout(timeoutId);

    externalSignal?.removeEventListener(
      "abort",
      abortFromExternalSignal,
    );
  }
}

export const apiClient = {
  get<T>(
    path: string,
    options?: ClientRequestOptions,
  ) {
    return request<T>("GET", path, options);
  },

  post<T>(
    path: string,
    body?: ClientRequestOptions["body"],
    options?: ClientRequestOptions,
  ) {
    return request<T>("POST", path, {
      ...options,
      body,
    });
  },

  patch<T>(
    path: string,
    body?: ClientRequestOptions["body"],
    options?: ClientRequestOptions,
  ) {
    return request<T>("PATCH", path, {
      ...options,
      body,
    });
  },

  put<T>(
    path: string,
    body?: ClientRequestOptions["body"],
    options?: ClientRequestOptions,
  ) {
    return request<T>("PUT", path, {
      ...options,
      body,
    });
  },

  delete<T>(
    path: string,
    options?: ClientRequestOptions,
  ) {
    return request<T>("DELETE", path, options);
  },
};
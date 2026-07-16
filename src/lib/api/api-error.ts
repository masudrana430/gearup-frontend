import type { ApiFailure } from "@/types/api";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : undefined;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: unknown,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    const contentType = response.headers.get("content-type") ?? "";

    let payload: unknown = null;

    try {
      payload = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    } catch {
      payload = null;
    }

    const failure: ApiFailure | null = isRecord(payload)
      ? (payload as ApiFailure)
      : null;

    const message =
      getString(failure?.message) ??
      getString(failure?.error) ??
      getString(payload) ??
      `Request failed with status ${response.status}`;

    const code = getString(failure?.code);

    const details =
      failure?.details ??
      failure?.errors ??
      payload;

    return new ApiError(
      message,
      response.status,
      code,
      details,
    );
  }
}
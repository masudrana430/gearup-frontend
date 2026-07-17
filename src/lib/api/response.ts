import { ApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/types/api";

export async function parseApiResponse<T>(
  response: Response,
): Promise<T> {
  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (
    contentType.includes("application/json") ||
    text.startsWith("{") ||
    text.startsWith("[")
  ) {
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new ApiError(
        "The server returned invalid JSON.",
        response.status,
      );
    }
  }

  return text as T;
}

export function unwrapApiData<T>(
  response: ApiResponse<T>,
): T {
  return response.data;
}
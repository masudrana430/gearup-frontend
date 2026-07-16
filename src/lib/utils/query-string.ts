import type {
  QueryParams,
  QueryPrimitive,
} from "@/types/api";

function normalizeQueryValue(
  value: QueryPrimitive,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

export function buildQueryString(
  query?: QueryParams,
): string {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];

    values.forEach((item) => {
      const normalized = normalizeQueryValue(item);

      if (normalized !== null) {
        searchParams.append(key, normalized);
      }
    });
  });

  const result = searchParams.toString();

  return result ? `?${result}` : "";
}
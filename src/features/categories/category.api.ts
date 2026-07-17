import "server-only";

import { apiEndpoints } from "@/lib/api/endpoints";
import { serverApi } from "@/lib/api/server";
import type { Category } from "@/types/category";

type UnknownRecord = Record<string, unknown>;

function asRecord(
  value: unknown,
): UnknownRecord | null {
  return typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function stringValue(
  ...values: unknown[]
): string {
  for (const value of values) {
    if (
      typeof value === "string" &&
      value.trim()
    ) {
      return value.trim();
    }
  }

  return "";
}

function numberValue(
  ...values: unknown[]
): number {
  for (const value of values) {
    const converted = Number(value);

    if (Number.isFinite(converted)) {
      return converted;
    }
  }

  return 0;
}

function findCategoryArray(
  payload: unknown,
  depth = 0,
): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (depth > 3) {
    return [];
  }

  const record = asRecord(payload);

  if (!record) {
    return [];
  }

  const possibleKeys = [
    "categories",
    "items",
    "results",
    "data",
  ];

  for (const key of possibleKeys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }

    const nested = findCategoryArray(
      value,
      depth + 1,
    );

    if (nested.length > 0) {
      return nested;
    }
  }

  return [];
}

function normalizeCategory(
  value: unknown,
): Category | null {
  const category = asRecord(value);

  if (!category) {
    return null;
  }

  const count = asRecord(category._count);

  const id = stringValue(
    category.id,
    category._id,
  );

  const name = stringValue(
    category.name,
    category.title,
  );

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,

    description: stringValue(
      category.description,
      category.details,
    ),

    imageUrl:
      stringValue(
        category.imageUrl,
        category.image,
      ) || undefined,

    gearCount: numberValue(
      category.gearCount,
      category.totalGear,
      count?.gear,
      count?.gears,
    ),
  };
}

export async function getPublicCategories(): Promise<
  Category[]
> {
  const response = await serverApi.get<unknown>(
    apiEndpoints.categories.list,
    {
      withAuth: false,
      cache: "force-cache",

      next: {
        revalidate: 300,
        tags: ["categories"],
      },
    },
  );

  return findCategoryArray(response)
    .map(normalizeCategory)
    .filter(
      (category): category is Category =>
        category !== null,
    );
}
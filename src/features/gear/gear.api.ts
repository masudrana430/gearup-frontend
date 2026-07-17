import "server-only";

import { cache } from "react";

import { ApiError } from "@/lib/api/api-error";
import { apiEndpoints } from "@/lib/api/endpoints";
import { serverApi } from "@/lib/api/server";
import type { QueryParams } from "@/types/api";
import type {
  Gear,
  GearAvailability,
  GearFilters,
  GearListResult,
  GearSort,
} from "@/types/gear";

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

function normalizeImages(
  gear: UnknownRecord,
): string[] {
  const possibleImages = [
    gear.imageUrls,
    gear.images,
    gear.photos,
    gear.gallery,
  ];

  const result: string[] = [];

  for (const candidate of possibleImages) {
    if (!Array.isArray(candidate)) {
      continue;
    }

    for (const image of candidate) {
      if (typeof image === "string") {
        result.push(image);
        continue;
      }

      const imageRecord = asRecord(image);

      const url = stringValue(
        imageRecord?.url,
        imageRecord?.src,
        imageRecord?.imageUrl,
      );

      if (url) {
        result.push(url);
      }
    }
  }

  const singleImage = stringValue(
    gear.imageUrl,
    gear.image,
    gear.thumbnail,
    gear.coverImage,
  );

  if (singleImage) {
    result.unshift(singleImage);
  }

  return Array.from(new Set(result));
}

function normalizeAvailability(
  gear: UnknownRecord,
): GearAvailability {
  const status = stringValue(
    gear.availability,
    gear.availabilityStatus,
    gear.status,
  ).toUpperCase();

  if (
    status === "AVAILABLE" ||
    status === "ACTIVE"
  ) {
    return "AVAILABLE";
  }

  if (
    status === "UNAVAILABLE" ||
    status === "INACTIVE"
  ) {
    return "UNAVAILABLE";
  }

  if (status === "RENTED") {
    return "RENTED";
  }

  if (status === "MAINTENANCE") {
    return "MAINTENANCE";
  }

  if (gear.isAvailable === true) {
    return "AVAILABLE";
  }

  if (gear.isAvailable === false) {
    return "UNAVAILABLE";
  }

  return "UNKNOWN";
}

function normalizeSpecifications(
  gear: UnknownRecord,
): Record<string, string | number | boolean> {
  const source =
    asRecord(gear.specifications) ??
    asRecord(gear.specs);

  if (!source) {
    return {};
  }

  const entries = Object.entries(source).filter(
    (
      entry,
    ): entry is [
      string,
      string | number | boolean,
    ] => {
      const value = entry[1];

      return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      );
    },
  );

  return Object.fromEntries(entries);
}

function normalizeGear(
  value: unknown,
): Gear | null {
  const gear = asRecord(value);

  if (!gear) {
    return null;
  }

  const category = asRecord(gear.category);
  const provider = asRecord(gear.provider);

  const id = stringValue(
    gear.id,
    gear._id,
  );

  const name = stringValue(
    gear.name,
    gear.title,
  );

  if (!id || !name) {
    return null;
  }

  const categoryId = stringValue(
    category?.id,
    category?._id,
    gear.categoryId,
  );

  const categoryName = stringValue(
    category?.name,
    category?.title,
    gear.categoryName,
  );

  const providerId = stringValue(
    provider?.id,
    provider?._id,
    gear.providerId,
  );

  const providerName = stringValue(
    provider?.name,
    provider?.fullName,
    provider?.businessName,
    gear.providerName,
  );

  return {
    id,
    name,

    description: stringValue(
      gear.description,
      gear.details,
      gear.summary,
    ),

    pricePerDay: numberValue(
      gear.pricePerDay,
      gear.dailyRate,
      gear.dailyPrice,
      gear.rentPerDay,
      gear.price,
    ),

    depositAmount: numberValue(
      gear.depositAmount,
      gear.securityDeposit,
      gear.deposit,
    ),

    location: stringValue(
      gear.location,
      gear.city,
      provider?.location,
      provider?.city,
    ),

    images: normalizeImages(gear),

    availability:
      normalizeAvailability(gear),

    averageRating: numberValue(
      gear.averageRating,
      gear.avgRating,
      gear.rating,
    ),

    reviewCount: numberValue(
      gear.reviewCount,
      gear.totalReviews,
      gear.reviewsCount,
    ),

    category:
      categoryId || categoryName
        ? {
            id: categoryId,
            name:
              categoryName || "Uncategorized",
          }
        : null,

    provider:
      providerId || providerName
        ? {
            id: providerId,
            name:
              providerName || "GearUp Provider",
          }
        : null,

    specifications:
      normalizeSpecifications(gear),

    createdAt:
      stringValue(
        gear.createdAt,
        gear.created_at,
      ) || undefined,
  };
}

function findGearArray(
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
    "gear",
    "gears",
    "items",
    "results",
    "data",
  ];

  for (const key of possibleKeys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }

    const nested = findGearArray(
      value,
      depth + 1,
    );

    if (nested.length > 0) {
      return nested;
    }
  }

  return [];
}

function findMetadata(
  payload: unknown,
): UnknownRecord {
  const root = asRecord(payload);
  const data = asRecord(root?.data);

  return (
    asRecord(root?.meta) ??
    asRecord(root?.pagination) ??
    asRecord(data?.meta) ??
    asRecord(data?.pagination) ??
    {}
  );
}

function findSingleGear(
  payload: unknown,
): unknown {
  const root = asRecord(payload);

  const firstData = root?.data;
  const dataRecord = asRecord(firstData);

  return (
    dataRecord?.gear ??
    root?.gear ??
    firstData ??
    payload
  );
}

function getSortQuery(
  sort: GearSort,
): {
  sortBy: string;
  sortOrder: "asc" | "desc";
} {
  switch (sort) {
    case "price-low":
      return {
        sortBy: "pricePerDay",
        sortOrder: "asc",
      };

    case "price-high":
      return {
        sortBy: "pricePerDay",
        sortOrder: "desc",
      };

    case "rating":
      return {
        sortBy: "averageRating",
        sortOrder: "desc",
      };

    case "newest":
    default:
      return {
        sortBy: "createdAt",
        sortOrder: "desc",
      };
  }
}

/*
 * Adjust query names here if Swagger uses
 * different filter parameter names.
 */
function toGearQuery(
  filters: GearFilters,
): QueryParams {
  const sort = getSortQuery(filters.sort);

  return {
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
    categoryId: filters.categoryId,
    location: filters.location,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,

    status: filters.availableOnly
      ? "AVAILABLE"
      : undefined,

    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  };
}

export async function getPublicGear(
  filters: GearFilters,
): Promise<GearListResult> {
  const response = await serverApi.get<unknown>(
    apiEndpoints.gear.list,
    {
      withAuth: false,
      query: toGearQuery(filters),
      cache: "no-store",
    },
  );

  const items = findGearArray(response)
    .map(normalizeGear)
    .filter(
      (gear): gear is Gear =>
        gear !== null,
    );

  const metadata = findMetadata(response);

  const page = Math.max(
    1,
    numberValue(
      metadata.page,
      metadata.currentPage,
      filters.page,
    ),
  );

  const limit = Math.max(
    1,
    numberValue(
      metadata.limit,
      metadata.pageSize,
      filters.limit,
    ),
  );

  const total = Math.max(
    0,
    numberValue(
      metadata.total,
      metadata.totalItems,
      metadata.count,
      items.length,
    ),
  );

  const totalPages = Math.max(
    1,
    numberValue(
      metadata.totalPages,
      metadata.totalPage,
      metadata.pages,
      Math.ceil(total / limit),
    ),
  );

  return {
    items,
    page,
    limit,
    total,
    totalPages,
  };
}

export const getPublicGearById = cache(
  async (id: string): Promise<Gear> => {
    const response =
      await serverApi.get<unknown>(
        apiEndpoints.gear.byId(id),
        {
          withAuth: false,
          cache: "no-store",
        },
      );

    const gear = normalizeGear(
      findSingleGear(response),
    );

    if (!gear) {
      throw new ApiError(
        "Gear not found.",
        404,
      );
    }

    return gear;
  },
);
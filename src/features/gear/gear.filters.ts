import type {
  GearFilters,
  GearSort,
} from "@/types/gear";

export type RawSearchParams = Record<
  string,
  string | string[] | undefined
>;

const validSortValues: GearSort[] = [
  "newest",
  "price-low",
  "price-high",
  "rating",
];

function firstValue(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value)
    ? value[0]
    : value;
}

function positiveNumber(
  value: string | undefined,
): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) &&
    parsed >= 0
    ? parsed
    : undefined;
}

export function parseGearFilters(
  searchParams: RawSearchParams,
): GearFilters {
  const page =
    positiveNumber(
      firstValue(searchParams.page),
    ) ?? 1;

  const sortValue =
    firstValue(searchParams.sort);

  const sort: GearSort =
    validSortValues.includes(
      sortValue as GearSort,
    )
      ? (sortValue as GearSort)
      : "newest";

  return {
    page: Math.max(1, Math.floor(page)),
    limit: 12,

    search:
      firstValue(searchParams.search)?.trim() ||
      undefined,

    categoryId:
      firstValue(
        searchParams.categoryId,
      ) || undefined,

    location:
      firstValue(
        searchParams.location,
      )?.trim() || undefined,

    minPrice: positiveNumber(
      firstValue(searchParams.minPrice),
    ),

    maxPrice: positiveNumber(
      firstValue(searchParams.maxPrice),
    ),

    availableOnly:
      firstValue(searchParams.available) ===
      "1",

    sort,
  };
}
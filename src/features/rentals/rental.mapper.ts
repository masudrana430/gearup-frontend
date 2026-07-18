import { calculateRentalDays } from "@/lib/utils/date";
import type {
  PaymentStatus,
  Rental,
  RentalStatus,
} from "@/types/rental";

type UnknownRecord = Record<string, unknown>;

export function asRecord(
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

function normalizeRentalStatus(
  value: unknown,
): RentalStatus {
  const status = stringValue(
    value,
  ).toUpperCase();

  switch (status) {
    case "PENDING":
    case "CONFIRMED":
    case "ACTIVE":
    case "COMPLETED":
    case "CANCELLED":
    case "REJECTED":
      return status;

    default:
      return "UNKNOWN";
  }
}

function normalizePaymentStatus(
  value: unknown,
): PaymentStatus {
  const status = stringValue(
    value,
  ).toUpperCase();

  switch (status) {
    case "UNPAID":
    case "PENDING":
    case "PAID":
    case "FAILED":
    case "REFUNDED":
      return status;

    default:
      return "UNKNOWN";
  }
}

function normalizeGearImage(
  gear: UnknownRecord,
): string | undefined {
  const images = gear.images;

  if (Array.isArray(images)) {
    const firstImage = images.find(
      (image) =>
        typeof image === "string" &&
        image.trim(),
    );

    if (typeof firstImage === "string") {
      return firstImage;
    }
  }

  return (
    stringValue(
      gear.imageUrl,
      gear.image,
      gear.thumbnail,
      gear.coverImage,
    ) || undefined
  );
}

export function normalizeRental(
  value: unknown,
): Rental | null {
  const rental = asRecord(value);

  if (!rental) {
    return null;
  }

  const gear =
    asRecord(rental.gear) ??
    asRecord(rental.equipment);

  if (!gear) {
    return null;
  }

  const provider =
    asRecord(rental.provider) ??
    asRecord(gear.provider);

  const id = stringValue(
    rental.id,
    rental._id,
    rental.rentalId,
  );

  const gearId = stringValue(
    gear.id,
    gear._id,
    rental.gearId,
  );

  const gearName = stringValue(
    gear.name,
    gear.title,
    rental.gearName,
  );

  if (!id || !gearId || !gearName) {
    return null;
  }

  const startDate = stringValue(
    rental.startDate,
    rental.start_date,
    rental.fromDate,
  );

  const endDate = stringValue(
    rental.endDate,
    rental.end_date,
    rental.toDate,
  );

  const pricePerDay = numberValue(
    gear.pricePerDay,
    gear.dailyRate,
    gear.dailyPrice,
    rental.pricePerDay,
  );

  const rentalDays =
    numberValue(
      rental.rentalDays,
      rental.totalDays,
      rental.duration,
    ) ||
    (startDate && endDate
      ? calculateRentalDays(
          startDate,
          endDate,
        )
      : 0);

  return {
    id,
    startDate,
    endDate,
    rentalDays,

    totalAmount:
      numberValue(
        rental.totalAmount,
        rental.totalPrice,
        rental.amount,
      ) ||
      pricePerDay * rentalDays,

    depositAmount: numberValue(
      rental.depositAmount,
      rental.securityDeposit,
      rental.deposit,
    ),

    status: normalizeRentalStatus(
      rental.status,
    ),

    paymentStatus:
      normalizePaymentStatus(
        rental.paymentStatus,
      ),

    gear: {
      id: gearId,
      name: gearName,
      imageUrl: normalizeGearImage(gear),
      pricePerDay,

      location:
        stringValue(
          gear.location,
          rental.location,
        ) || undefined,
    },

    provider:
      provider &&
      stringValue(
        provider.id,
        provider._id,
      )
        ? {
            id: stringValue(
              provider.id,
              provider._id,
            ),

            name:
              stringValue(
                provider.name,
                provider.fullName,
                provider.businessName,
              ) || "GearUp Provider",
          }
        : null,

    createdAt:
      stringValue(
        rental.createdAt,
        rental.created_at,
      ) || undefined,

    updatedAt:
      stringValue(
        rental.updatedAt,
        rental.updated_at,
      ) || undefined,
  };
}

export function findRentalArray(
  payload: unknown,
  depth = 0,
): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (depth > 4) {
    return [];
  }

  const record = asRecord(payload);

  if (!record) {
    return [];
  }

  const keys = [
    "rentals",
    "items",
    "results",
    "orders",
    "data",
  ];

  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }

    const nested = findRentalArray(
      value,
      depth + 1,
    );

    if (nested.length > 0) {
      return nested;
    }
  }

  return [];
}

export function findSingleRental(
  payload: unknown,
): unknown {
  const root = asRecord(payload);
  const data = asRecord(root?.data);

  return (
    data?.rental ??
    data?.order ??
    root?.rental ??
    root?.order ??
    root?.data ??
    payload
  );
}

export function findRentalMeta(
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

export function extractRentalId(
  payload: unknown,
): string | null {
  const normalized = normalizeRental(
    findSingleRental(payload),
  );

  if (normalized) {
    return normalized.id;
  }

  const root = asRecord(payload);
  const data = asRecord(root?.data);

  return (
    stringValue(
      root?.rentalId,
      root?.id,
      data?.rentalId,
      data?.id,
    ) || null
  );
}
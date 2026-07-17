import "server-only";

import type {
  AuthUser,
  UserRole,
} from "@/types/auth";

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

function normalizeRole(
  value: unknown,
): UserRole | null {
  const role = stringValue(value).toUpperCase();

  if (
    role === "CUSTOMER" ||
    role === "PROVIDER" ||
    role === "ADMIN"
  ) {
    return role;
  }

  return null;
}

export function extractAccessToken(
  payload: unknown,
): string | null {
  const root = asRecord(payload);
  const data = asRecord(root?.data);
  const tokens =
    asRecord(data?.tokens) ??
    asRecord(root?.tokens);

  return (
    stringValue(
      root?.accessToken,
      root?.token,
      root?.jwt,
      data?.accessToken,
      data?.token,
      data?.jwt,
      tokens?.accessToken,
      tokens?.token,
    ) || null
  );
}

export function extractAuthUser(
  payload: unknown,
): AuthUser | null {
  const root = asRecord(payload);
  const data = asRecord(root?.data);

  const candidates = [
    asRecord(data?.user),
    asRecord(root?.user),
    asRecord(data?.profile),
    asRecord(root?.profile),
    data,
    root,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const id = stringValue(
      candidate.id,
      candidate._id,
      candidate.userId,
    );

    const email = stringValue(
      candidate.email,
    );

    const role = normalizeRole(
      candidate.role,
    );

    if (!id || !email || !role) {
      continue;
    }

    const name =
      stringValue(
        candidate.name,
        candidate.fullName,
        candidate.username,
      ) || email.split("@")[0];

    return {
      id,
      email,
      name,
      role,

      phone:
        stringValue(candidate.phone) ||
        undefined,

      avatarUrl:
        stringValue(
          candidate.avatarUrl,
          candidate.avatar,
          candidate.image,
        ) || undefined,
    };
  }

  return null;
}

export function extractAuthMessage(
  payload: unknown,
): string {
  const root = asRecord(payload);
  const data = asRecord(root?.data);

  return (
    stringValue(
      root?.message,
      data?.message,
    ) || "Request completed successfully."
  );
}
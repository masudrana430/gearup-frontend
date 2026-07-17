import type { UserRole } from "@/types/auth";

export const roleDashboardRoutes: Record<
  UserRole,
  string
> = {
  CUSTOMER: "/customer",
  PROVIDER: "/provider",
  ADMIN: "/admin",
};

export function getRoleDashboard(
  role: UserRole,
): string {
  return roleDashboardRoutes[role];
}

export function getSafeRedirectPath(
  path?: string | null,
): string | null {
  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("//")
  ) {
    return null;
  }

  return path;
}
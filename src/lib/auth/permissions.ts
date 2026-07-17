import "server-only";

import { redirect } from "next/navigation";

import { getRoleDashboard } from "@/lib/auth/roles";
import { getServerUser } from "@/lib/auth/session";
import type {
  AuthUser,
  UserRole,
} from "@/types/auth";

export async function requireUser(): Promise<AuthUser> {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(
  allowedRoles: UserRole[],
): Promise<AuthUser> {
  const user = await requireUser();

  if (
    !allowedRoles.includes(user.role)
  ) {
    redirect(
      getRoleDashboard(user.role),
    );
  }

  return user;
}
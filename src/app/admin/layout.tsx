import { requireRole } from "@/lib/auth/permissions";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  await requireRole(["ADMIN"]);

  return <>{children}</>;
}
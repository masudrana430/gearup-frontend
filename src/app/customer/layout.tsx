import { requireRole } from "@/lib/auth/permissions";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default async function CustomerLayout({
  children,
}: CustomerLayoutProps) {
  await requireRole(["CUSTOMER"]);

  return <>{children}</>;
}
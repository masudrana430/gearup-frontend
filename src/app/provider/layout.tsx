import { requireRole } from "@/lib/auth/permissions";

interface ProviderLayoutProps {
  children: React.ReactNode;
}

export default async function ProviderLayout({
  children,
}: ProviderLayoutProps) {
  await requireRole(["PROVIDER"]);

  return <>{children}</>;
}
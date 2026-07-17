import { requireRole } from "@/lib/auth/permissions";

export default async function ProviderPage() {
  const user =
    await requireRole(["PROVIDER"]);

  return (
    <main className="container-shell py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
        Provider dashboard
      </p>

      <h1 className="mt-4 font-display text-4xl font-semibold">
        Welcome, {user.name}
      </h1>

      <p className="mt-4 text-muted-foreground">
        Gear and order management will be
        added in a later phase.
      </p>
    </main>
  );
}
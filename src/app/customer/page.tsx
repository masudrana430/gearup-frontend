import { requireRole } from "@/lib/auth/permissions";

export default async function CustomerPage() {
  const user =
    await requireRole(["CUSTOMER"]);

  return (
    <main className="container-shell py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
        Customer dashboard
      </p>

      <h1 className="mt-4 font-display text-4xl font-semibold">
        Welcome, {user.name}
      </h1>

      <p className="mt-4 text-muted-foreground">
        Your rental dashboard will be built
        in the next phase.
      </p>
    </main>
  );
}
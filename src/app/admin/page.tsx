import { requireRole } from "@/lib/auth/permissions";

export default async function AdminPage() {
  const user =
    await requireRole(["ADMIN"]);

  return (
    <main className="container-shell py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
        Administrator dashboard
      </p>

      <h1 className="mt-4 font-display text-4xl font-semibold">
        Welcome, {user.name}
      </h1>

      <p className="mt-4 text-muted-foreground">
        Platform management tools will be
        added in the admin phase.
      </p>
    </main>
  );
}
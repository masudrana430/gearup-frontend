import { CustomerNav } from "@/components/dashboard/customer-nav";
import { UserMenu } from "@/components/layout/user-menu";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { requireRole } from "@/lib/auth/permissions";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default async function CustomerLayout({
  children,
}: CustomerLayoutProps) {
  const user = await requireRole([
    "CUSTOMER",
  ]);

  return (
    <div className="min-h-svh bg-surface/35">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-background/95 p-5 backdrop-blur-xl lg:block">
        <Logo />

        <div className="mt-10">
          <CustomerNav />
        </div>

        <div className="absolute right-5 bottom-6 left-5 rounded-2xl border bg-muted/35 p-4">
          <p className="text-xs text-muted-foreground">
            Signed in as
          </p>

          <p className="mt-1 truncate font-semibold">
            {user.name}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-2xl">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.18em] text-primary uppercase">
                Customer account
              </p>

              <p className="mt-1 font-display font-semibold">
                GearUp dashboard
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>

          <div className="overflow-x-auto border-t px-4 py-2 lg:hidden">
            <div className="min-w-max">
              <CustomerNav />
            </div>
          </div>
        </header>

        <main className="px-5 py-8 sm:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const benefits = [
  "Secure HttpOnly authentication",
  "Verified customers and providers",
  "Role-based account dashboards",
];

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="grid min-h-svh lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-foreground p-12 text-background lg:flex lg:flex-col dark:bg-card dark:text-foreground">
        <div className="premium-grid absolute inset-0 opacity-25" />

        <div className="absolute -top-36 -left-36 size-96 rounded-full bg-primary/25 blur-[110px]" />

        <div className="relative">
          <Logo className="text-background dark:text-foreground" />
        </div>

        <div className="relative my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-4 py-2 text-sm">
            <Sparkles className="size-4 text-primary" />
            Premium gear marketplace
          </div>

          <h1 className="mt-7 font-display text-5xl leading-[0.98] font-semibold tracking-[-0.055em]">
            One account for every GearUp journey.
          </h1>

          <p className="mt-6 max-w-lg leading-8 text-background/65 dark:text-muted-foreground">
            Rent quality equipment, manage your
            orders or build a provider business
            through one secure platform.
          </p>

          <div className="mt-10 space-y-4">
            {benefits.map((benefit) => (
              <p
                key={benefit}
                className="flex items-center gap-3 text-sm"
              >
                <CheckCircle2 className="size-5 text-primary" />
                {benefit}
              </p>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-background/55">
          <ShieldCheck className="size-4 text-primary" />
          GearUp secure authentication
        </div>
      </section>

      <section className="relative flex min-h-svh items-center justify-center px-5 py-12 sm:px-8">
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>

        <Link
          href="/"
          className="absolute top-6 left-6 lg:hidden"
        >
          <Logo />
        </Link>

        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
    </main>
  );
}
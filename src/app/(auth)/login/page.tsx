import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your GearUp customer, provider or administrator account.",
};

interface LoginPageProps {
  searchParams: Promise<{
    next?: string;
    registered?: string;
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  return (
    <div>
      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
        Welcome back
      </p>

      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em]">
        Sign in to GearUp
      </h1>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Access your rentals, equipment,
        payments and account dashboard.
      </p>

      <div className="mt-8">
        <LoginForm
          nextPath={params.next}
          registered={
            params.registered === "1"
          }
        />
      </div>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Do not have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
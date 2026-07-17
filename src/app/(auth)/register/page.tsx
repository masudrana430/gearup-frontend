import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a GearUp customer or provider account.",
};

export default function RegisterPage() {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
        Join GearUp
      </p>

      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em]">
        Create your account
      </h1>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Register as a customer to rent gear
        or as a provider to list equipment.
      </p>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
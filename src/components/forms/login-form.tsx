"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/auth.schema";
import { useLoginMutation } from "@/features/auth/auth.hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getRoleDashboard,
  getSafeRedirectPath,
} from "@/lib/auth/roles";

interface LoginFormProps {
  nextPath?: string;
  registered?: boolean;
}

export function LoginForm({
  nextPath,
  registered = false,
}: LoginFormProps) {
  const router = useRouter();
  const loginMutation =
    useLoginMutation();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: LoginFormValues,
  ) {
    try {
      const result =
        await loginMutation.mutateAsync(
          values,
        );

      toast.success(
        `Welcome back, ${result.user.name}.`,
      );

      const destination =
        getSafeRedirectPath(nextPath) ??
        getRoleDashboard(
          result.user.role,
        );

      router.replace(destination);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to log in.",
      );
    }
  }

  const pending =
    isSubmitting ||
    loginMutation.isPending;

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      {registered ? (
        <div className="rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-primary">
          Your account was created successfully.
          Log in to continue.
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">
          Email address
        </Label>

        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 rounded-xl pl-10"
            aria-invalid={
              Boolean(errors.email)
            }
            {...register("email")}
          />
        </div>

        {errors.email ? (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-12 rounded-xl px-10"
            aria-invalid={
              Boolean(errors.password)
            }
            {...register("password")}
          />

          <button
            type="button"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            onClick={() => {
              setShowPassword(
                (current) => !current,
              );
            }}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {errors.password ? (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-xl"
        disabled={pending}
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
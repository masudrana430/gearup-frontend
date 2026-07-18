"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/features/auth/auth.schema";
import { useRegisterMutation } from "@/features/auth/auth.hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRoleDashboard } from "@/lib/auth/roles";

export function RegisterForm() {
  const router = useRouter();

  const registerMutation = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      const requestBody = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      const result = await registerMutation.mutateAsync(requestBody);

      toast.success("Your GearUp account was created.");

      if (result.authenticated && result.user) {
        router.replace(getRoleDashboard(result.user.role));
      } else {
        router.replace("/login?registered=1");
      }

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create account.",
      );
    }
  }

  const pending = isSubmitting || registerMutation.isPending;

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>

        <div className="relative">
          <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="name"
            autoComplete="name"
            placeholder="Your full name"
            className="h-12 rounded-xl pl-10"
            {...register("name")}
          />
        </div>

        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>

        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 rounded-xl pl-10"
            {...register("email")}
          />
        </div>

        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Account type</Label>

        <select
          id="role"
          className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
          {...register("role")}
        >
          <option value="CUSTOMER">Customer — I want to rent gear</option>

          <option value="PROVIDER">Provider — I want to list gear</option>
        </select>

        {errors.role ? (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-12 rounded-xl px-10"
            {...register("password")}
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
            onClick={() => {
              setShowPassword((current) => !current);
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
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>

        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Enter the password again"
          className="h-12 rounded-xl"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword ? (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
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
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}

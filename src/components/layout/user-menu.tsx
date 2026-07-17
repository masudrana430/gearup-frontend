"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useCurrentUser,
  useLogoutMutation,
} from "@/features/auth/auth.hooks";
import { buttonVariants } from "@/components/ui/button";
import { getRoleDashboard } from "@/lib/auth/roles";
import { cn } from "@/lib/utils/cn";

export function UserMenu() {
  const router = useRouter();
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [open, setOpen] =
    useState(false);

  const {
    data: user,
    isLoading,
  } = useCurrentUser();

  const logoutMutation =
    useLogoutMutation();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(
      event: PointerEvent,
    ) {
      if (
        !containerRef.current?.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open]);

  if (isLoading) {
    return (
      <span className="flex size-10 items-center justify-center rounded-full border">
        <LoaderCircle className="size-4 animate-spin" />
      </span>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "hidden rounded-full md:inline-flex",
        )}
      >
        Sign in
      </Link>
    );
  }

  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync();

      setOpen(false);

      toast.success(
        "You have been signed out.",
      );

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign out.",
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border bg-background p-1.5 pr-3 transition hover:border-primary/40"
        onClick={() => {
          setOpen(
            (current) => !current,
          );
        }}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {initials || (
            <UserRound className="size-4" />
          )}
        </span>

        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name}
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+0.75rem)] right-0 z-50 w-64 rounded-2xl border bg-popover p-2 text-popover-foreground shadow-2xl"
        >
          <div className="border-b px-3 py-3">
            <p className="truncate font-semibold">
              {user.name}
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {user.email}
            </p>

            <span className="mt-2 inline-flex rounded-full bg-primary/12 px-2.5 py-1 font-mono text-[0.65rem] text-primary">
              {user.role}
            </span>
          </div>

          <Link
            href={getRoleDashboard(
              user.role,
            )}
            role="menuitem"
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-muted"
            onClick={() => {
              setOpen(false);
            }}
          >
            <LayoutDashboard className="size-4 text-primary" />
            Open dashboard
          </Link>

          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-destructive transition hover:bg-destructive/10"
            disabled={
              logoutMutation.isPending
            }
            onClick={handleLogout}
          >
            {logoutMutation.isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}

            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
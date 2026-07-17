"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import {
  ArrowUpRight,
  X,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  items: NavigationItem[];
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({
  open,
  items,
  pathname,
  onClose,
}: MobileMenuProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] lg:hidden"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <button
            type="button"
            aria-label="Close mobile menu"
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            className="absolute inset-x-3 top-3 overflow-hidden rounded-[2rem] border bg-background shadow-2xl"
            initial={{
              opacity: 0,
              y: -24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <Logo />

              <button
                type="button"
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border bg-muted/50 transition hover:bg-muted"
                onClick={onClose}
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="space-y-1 p-4">
              {items.map((item, index) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" &&
                    pathname.startsWith(
                      `${item.href}/`,
                    ));

                return (
                  <motion.div
                    key={item.href}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.08 + index * 0.05,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-5 py-4 font-display text-xl font-medium transition",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {item.label}

                      <ArrowUpRight className="size-5" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="grid gap-3 border-t p-4">
              <Link
                href="/login"
                onClick={onClose}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-12 rounded-full",
                )}
              >
                Sign in
              </Link>

              <Link
                href="/register"
                onClick={onClose}
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "h-12 rounded-full",
                )}
              >
                Create account
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
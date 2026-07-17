"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Menu,
} from "lucide-react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Gear",
    href: "/gear",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-2xl">
        <div className="container-shell flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(
                    `${item.href}/`,
                  ));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}

                  {active ? (
                    <span className="absolute inset-x-4 -bottom-[1.65rem] h-0.5 rounded-full bg-primary" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

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

            <Link
              href="/gear"
              className={cn(
                buttonVariants(),
                "hidden rounded-full px-5 md:inline-flex",
              )}
            >
              Explore gear
              <ArrowUpRight className="size-4" />
            </Link>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full lg:hidden"
              aria-label="Open navigation menu"
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        items={navigationItems}
        pathname={pathname}
        onClose={() => {
          setMenuOpen(false);
        }}
      />
    </>
  );
}
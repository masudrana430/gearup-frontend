"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageCheck,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

const customerLinks = [
  {
    label: "Overview",
    href: "/customer",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "My rentals",
    href: "/customer/rentals",
    icon: PackageCheck,
  },
  {
    label: "Browse gear",
    href: "/gear",
    icon: Search,
  },
];

export function CustomerNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {customerLinks.map((item) => {
        const Icon = item.icon;

        const active = item.exact
          ? pathname === item.href
          : pathname === item.href ||
            pathname.startsWith(
              `${item.href}/`,
            );

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
              active
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
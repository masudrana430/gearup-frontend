import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { Logo } from "@/components/shared/logo";

const footerGroups = [
  {
    title: "Explore",
    links: [
      {
        label: "All gear",
        href: "/gear",
      },
      {
        label: "Categories",
        href: "/categories",
      },
      {
        label: "Become a provider",
        href: "/register",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About GearUp",
        href: "/about",
      },
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Safety",
        href: "/about",
      },
    ],
  },
  {
    title: "Account",
    links: [
      {
        label: "Sign in",
        href: "/login",
      },
      {
        label: "Create account",
        href: "/register",
      },
      {
        label: "My rentals",
        href: "/customer/rentals",
      },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    mark: "f",
  },
  {
    label: "Instagram",
    href: "#",
    mark: "ig",
  },
  {
    label: "LinkedIn",
    href: "#",
    mark: "in",
  },
  {
    label: "GitHub",
    href: "https://github.com/masudrana430",
    mark: "gh",
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-surface/45">
      <div className="container-shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Logo />

            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              GearUp connects customers with trusted equipment providers, making
              premium gear accessible for every project and adventure.
            </p>

            <div className="mt-7 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                Chattogram, Bangladesh
              </p>

              <a
                href="mailto:hello@gearup.com"
                className="flex items-center gap-3 transition hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                hello@gearup.com
              </a>
            </div>

            <div className="mt-8 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="flex size-10 items-center justify-center rounded-full border bg-background text-xs font-semibold uppercase transition hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {social.mark}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-display font-semibold">{group.title}</h3>

                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-primary"
                      >
                        {link.label}

                        <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GearUp. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link href="/about" className="hover:text-foreground">
              Privacy
            </Link>

            <Link href="/about" className="hover:text-foreground">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

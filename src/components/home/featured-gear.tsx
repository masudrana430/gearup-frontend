import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Camera,
  MapPin,
  Star,
  TentTree,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils/cn";

interface FeaturedItem {
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  icon: LucideIcon;
  gradient: string;
}

const featuredItems: FeaturedItem[] = [
  {
    name: "Sony Cinema Camera Kit",
    category: "Photography",
    location: "Chattogram",
    rating: 4.9,
    reviews: 38,
    price: 3500,
    icon: Video,
    gradient:
      "from-blue-500/25 via-cyan-500/10 to-transparent",
  },
  {
    name: "Four-Person Adventure Tent",
    category: "Outdoor",
    location: "Dhaka",
    rating: 4.8,
    reviews: 25,
    price: 1800,
    icon: TentTree,
    gradient:
      "from-lime-500/25 via-emerald-500/10 to-transparent",
  },
  {
    name: "Professional Mirrorless Camera",
    category: "Photography",
    location: "Sylhet",
    rating: 4.9,
    reviews: 44,
    price: 2800,
    icon: Camera,
    gradient:
      "from-violet-500/25 via-purple-500/10 to-transparent",
  },
  {
    name: "Premium Mountain Bike",
    category: "Cycling",
    location: "Cox's Bazar",
    rating: 4.7,
    reviews: 31,
    price: 2200,
    icon: Bike,
    gradient:
      "from-orange-500/25 via-amber-500/10 to-transparent",
  },
];

export function FeaturedGear() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Featured collection"
              title="Highly rated gear, ready when you are."
              description="Explore popular equipment selected for quality, provider reliability and customer satisfaction."
            />
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              href="/gear"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "rounded-full px-6",
              )}
            >
              View all gear
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.name}
                delay={index * 0.06}
              >
                <Link
                  href="/gear"
                  className="group block overflow-hidden rounded-[2rem] border bg-card shadow-sm transition duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-premium"
                >
                  <div
                    className={`relative flex aspect-[1.15] items-center justify-center overflow-hidden bg-gradient-to-br ${item.gradient}`}
                  >
                    <div className="absolute inset-5 rounded-[1.5rem] border border-white/10 bg-background/20 backdrop-blur-sm" />

                    <Icon className="relative size-20 text-foreground/75 transition duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:text-primary" />

                    <span className="absolute top-4 left-4 rounded-full border bg-background/75 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 text-primary" />
                      {item.location}
                    </div>

                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                      {item.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="flex items-center gap-1 font-medium">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        {item.rating}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        ({item.reviews} reviews)
                      </span>
                    </div>

                    <div className="mt-6 flex items-end justify-between border-t pt-5">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          From
                        </p>

                        <p className="mt-1 font-display text-xl font-semibold">
                          {formatCurrency(item.price)}
                          <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
                            /day
                          </span>
                        </p>
                      </div>

                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
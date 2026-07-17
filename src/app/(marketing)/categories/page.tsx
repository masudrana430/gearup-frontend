import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
} from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPublicCategories } from "@/features/categories/category.api";

export const metadata: Metadata = {
  title: "Gear Categories",
  description:
    "Explore equipment rental categories available on GearUp.",
};

export default async function CategoriesPage() {
  const categories =
    await getPublicCategories();

  return (
    <div>
      <section className="border-b bg-surface/40">
        <div className="container-shell py-16 sm:py-20">
          <SectionHeading
            eyebrow="All categories"
            title="Find equipment organized around what you want to achieve."
            description="Browse all GearUp categories and discover rental equipment from trusted providers."
          />
        </div>
      </section>

      <section className="container-shell py-14 lg:py-20">
        {categories.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed py-20 text-center">
            <Boxes className="mx-auto size-12 text-primary" />

            <h2 className="mt-5 font-display text-2xl font-semibold">
              No categories available
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(
              (category, index) => (
                <Reveal
                  key={category.id}
                  delay={index * 0.05}
                >
                  <Link
                    href={`/gear?categoryId=${encodeURIComponent(
                      category.id,
                    )}`}
                    className="group flex min-h-64 flex-col rounded-[2rem] border bg-card p-7 transition duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-premium"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-13 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Boxes className="size-6" />
                      </span>

                      <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </div>

                    <div className="mt-auto pt-12">
                      <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                        {category.gearCount} items
                      </p>

                      <h2 className="mt-3 font-display text-2xl font-semibold">
                        {category.name}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {category.description ||
                          `Explore available ${category.name.toLowerCase()} equipment.`}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}
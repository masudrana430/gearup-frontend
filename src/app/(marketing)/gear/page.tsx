import type { Metadata } from "next";

import { GearFiltersPanel } from "@/components/gear/gear-filters";
import { GearGrid } from "@/components/gear/gear-grid";
import { CatalogPagination } from "@/components/shared/catalog-pagination";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPublicCategories } from "@/features/categories/category.api";
import { getPublicGear } from "@/features/gear/gear.api";
import {
  parseGearFilters,
  type RawSearchParams,
} from "@/features/gear/gear.filters";

export const metadata: Metadata = {
  title: "Explore Gear",
  description:
    "Search and rent premium outdoor, photography, cycling, event and professional gear.",
};

interface GearPageProps {
  searchParams: Promise<RawSearchParams>;
}

export default async function GearPage({
  searchParams,
}: GearPageProps) {
  const rawSearchParams =
    await searchParams;

  const filters = parseGearFilters(
    rawSearchParams,
  );

  const [gearResult, categories] =
    await Promise.all([
      getPublicGear(filters),
      getPublicCategories(),
    ]);

  return (
    <div>
      <section className="border-b bg-surface/40">
        <div className="container-shell py-16 sm:py-20">
          <SectionHeading
            eyebrow="Gear marketplace"
            title="Find the right equipment for your next idea."
            description="Search trusted rental equipment by category, price, location and availability."
          />
        </div>
      </section>

      <section className="container-shell py-12 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[18rem_1fr]">
          <aside className="lg:sticky lg:top-28">
            <GearFiltersPanel
              categories={categories}
              filters={filters}
            />
          </aside>

          <div>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  {gearResult.total}
                </strong>{" "}
                items found
              </p>

              <p className="text-sm text-muted-foreground">
                Page {gearResult.page} of{" "}
                {gearResult.totalPages}
              </p>
            </div>

            <GearGrid
              gear={gearResult.items}
            />

            <CatalogPagination
              page={gearResult.page}
              totalPages={
                gearResult.totalPages
              }
              filters={filters}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
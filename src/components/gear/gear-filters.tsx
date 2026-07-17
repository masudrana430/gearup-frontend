import Link from "next/link";
import {
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import type { Category } from "@/types/category";
import type { GearFilters } from "@/types/gear";

interface GearFiltersProps {
  categories: Category[];
  filters: GearFilters;
}

const selectClassName =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

export function GearFiltersPanel({
  categories,
  filters,
}: GearFiltersProps) {
  return (
    <form
      action="/gear"
      method="get"
      className="glass-panel rounded-[2rem] p-5"
    >
      <div className="flex items-center gap-2 border-b pb-4">
        <Filter className="size-4 text-primary" />

        <h2 className="font-display font-semibold">
          Search and filter
        </h2>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium"
          >
            Search
          </label>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="search"
              name="search"
              defaultValue={filters.search}
              placeholder="Camera, tent, bicycle..."
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="categoryId"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>

          <select
            id="categoryId"
            name="categoryId"
            defaultValue={
              filters.categoryId ?? ""
            }
            className={selectClassName}
          >
            <option value="">
              All categories
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium"
          >
            Location
          </label>

          <Input
            id="location"
            name="location"
            defaultValue={filters.location}
            placeholder="Dhaka, Chattogram..."
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="minPrice"
              className="mb-2 block text-sm font-medium"
            >
              Minimum
            </label>

            <Input
              id="minPrice"
              name="minPrice"
              type="number"
              min="0"
              defaultValue={filters.minPrice}
              placeholder="৳0"
              className="h-11 rounded-xl"
            />
          </div>

          <div>
            <label
              htmlFor="maxPrice"
              className="mb-2 block text-sm font-medium"
            >
              Maximum
            </label>

            <Input
              id="maxPrice"
              name="maxPrice"
              type="number"
              min="0"
              defaultValue={filters.maxPrice}
              placeholder="৳10000"
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-medium"
          >
            Sort by
          </label>

          <select
            id="sort"
            name="sort"
            defaultValue={filters.sort}
            className={selectClassName}
          >
            <option value="newest">
              Newest first
            </option>

            <option value="price-low">
              Price: low to high
            </option>

            <option value="price-high">
              Price: high to low
            </option>

            <option value="rating">
              Highest rating
            </option>
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border bg-muted/25 p-3 text-sm">
          <input
            type="checkbox"
            name="available"
            value="1"
            defaultChecked={
              filters.availableOnly
            }
            className="size-4 accent-primary"
          />

          Show available gear only
        </label>

        <div className="grid gap-3">
          <button
            type="submit"
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "h-11 rounded-xl",
            )}
          >
            Apply filters
          </button>

          <Link
            href="/gear"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "h-11 rounded-xl",
            )}
          >
            <RotateCcw className="size-4" />
            Reset filters
          </Link>
        </div>
      </div>
    </form>
  );
}
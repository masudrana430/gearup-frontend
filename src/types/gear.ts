export type GearAvailability =
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "RENTED"
  | "MAINTENANCE"
  | "UNKNOWN";

export type GearSort =
  | "newest"
  | "price-low"
  | "price-high"
  | "rating";

export interface GearCategory {
  id: string;
  name: string;
}

export interface GearProvider {
  id: string;
  name: string;
}

export interface Gear {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  depositAmount: number;
  location: string;
  images: string[];
  availability: GearAvailability;
  averageRating: number;
  reviewCount: number;
  category: GearCategory | null;
  provider: GearProvider | null;
  specifications: Record<
    string,
    string | number | boolean
  >;
  createdAt?: string;
}

export interface GearFilters {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  availableOnly?: boolean;
  sort: GearSort;
}

export interface GearListResult {
  items: Gear[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
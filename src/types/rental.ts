export const RENTAL_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
  "UNKNOWN",
] as const;

export type RentalStatus =
  (typeof RENTAL_STATUSES)[number];

export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "UNKNOWN";

export interface RentalGear {
  id: string;
  name: string;
  imageUrl?: string;
  pricePerDay: number;
  location?: string;
}

export interface RentalProvider {
  id: string;
  name: string;
}

export interface Rental {
  id: string;
  startDate: string;
  endDate: string;
  rentalDays: number;
  totalAmount: number;
  depositAmount: number;
  status: RentalStatus;
  paymentStatus: PaymentStatus;
  gear: RentalGear;
  provider: RentalProvider | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRentalInput {
  gearId: string;
  startDate: string;
  endDate: string;
}

export interface CreateRentalResult {
  rentalId: string;
}

export interface RentalListFilters {
  page?: number;
  limit?: number;
  status?: RentalStatus;
}

export interface RentalListResult {
  items: Rental[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
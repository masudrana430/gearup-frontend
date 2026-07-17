export const APP_NAME = "GearUp";

export const API_PROXY_BASE = "/api/backend";

export const routes = {
  home: "/",
  gear: "/gear",
  categories: "/categories",
  about: "/about",
  contact: "/contact",
  login: "/login",
  register: "/register",

  customer: "/customer",
  provider: "/provider",
  admin: "/admin",
} as const;

export const queryKeys = {
  health: ["health"] as const,
  categories: ["categories"] as const,
  gear: ["gear"] as const,
  rentals: ["rentals"] as const,
  payments: ["payments"] as const,
  reviews: ["reviews"] as const,
  users: ["users"] as const,
};
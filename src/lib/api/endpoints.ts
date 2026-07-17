function encodeSegment(
  value: string | number,
): string {
  return encodeURIComponent(String(value));
}

export const apiEndpoints = {
  health: "/health",

  auth: {
    login: "/auth/login",
  },

  categories: {
    list: "/categories",

    byId: (id: string | number) =>
      `/categories/${encodeSegment(id)}`,
  },

  gear: {
    list: "/gear",

    byId: (id: string | number) =>
      `/gear/${encodeSegment(id)}`,
  },

  rentals: {
    list: "/rentals",

    byId: (id: string | number) =>
      `/rentals/${encodeSegment(id)}`,
  },

  reviews: {
    list: "/reviews",
  },
} as const;
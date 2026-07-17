function encodeSegment(
  value: string | number,
): string {
  return encodeURIComponent(String(value));
}

export const apiEndpoints = {
  health: "/health",

  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
  },

  categories: {
    list: "/categories",

    byId: (id: string | number) =>
      `/categories/${encodeURIComponent(String(id))}`,
  },

  gear: {
    list: "/gear",

    byId: (id: string | number) =>
      `/gear/${encodeURIComponent(String(id))}`,
  },

  rentals: {
    list: "/rentals",

    byId: (id: string | number) =>
      `/rentals/${encodeURIComponent(String(id))}`,
  },

  reviews: {
    list: "/reviews",
  },
} as const;
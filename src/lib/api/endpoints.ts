function encodeSegment(value: string | number): string {
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

    byId: (id: string | number) => `/categories/${encodeSegment(id)}`,
  },

  gear: {
    list: "/gear",

    byId: (id: string | number) => `/gear/${encodeSegment(id)}`,
  },

  rentals: {
    create: "/rentals",
    mine: "/rentals/my-rentals",

    byId: (id: string | number) => `/rentals/${encodeURIComponent(String(id))}`,

    cancel: (id: string | number) =>
      `/rentals/${encodeURIComponent(String(id))}/cancel`,
  },

  reviews: {
    list: "/reviews",
  },
} as const;

function encodeSegment(value: string | number): string {
  return encodeURIComponent(String(value));
}

export const apiEndpoints = {
  health: "/health",

  auth: {
    login: "/auth/login",
  },

  resource: {
    collection: (resource: string) =>
      `/${encodeSegment(resource)}`,

    byId: (
      resource: string,
      id: string | number,
    ) =>
      `/${encodeSegment(resource)}/${encodeSegment(id)}`,
  },
} as const;
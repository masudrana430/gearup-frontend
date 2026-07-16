export type QueryPrimitive =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export type QueryValue =
  | QueryPrimitive
  | QueryPrimitive[];

export type QueryParams = Record<string, QueryValue>;

export interface PaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta | Record<string, unknown>;
}

export interface ApiFailure {
  success?: false;
  message?: string;
  error?: string;
  code?: string;
  details?: unknown;
  errors?: unknown;
}
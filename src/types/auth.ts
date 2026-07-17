export const USER_ROLES = [
  "CUSTOMER",
  "PROVIDER",
  "ADMIN",
] as const;

export const REGISTRATION_ROLES = [
  "CUSTOMER",
  "PROVIDER",
] as const;

export type UserRole =
  (typeof USER_ROLES)[number];

export type RegistrationRole =
  (typeof REGISTRATION_ROLES)[number];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: RegistrationRole;
}

export interface LoginResult {
  user: AuthUser;
}

export interface RegisterResult {
  authenticated: boolean;
  user: AuthUser | null;
}

export interface AuthSessionResult {
  user: AuthUser | null;
}
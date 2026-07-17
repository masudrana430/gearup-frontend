import "server-only";

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const backendApiUrl = getRequiredEnvironmentVariable(
  "BACKEND_API_URL",
).replace(/\/$/, "");

export const serverEnv = Object.freeze({
  BACKEND_API_URL: backendApiUrl,

  AUTH_COOKIE_NAME:
    process.env.AUTH_COOKIE_NAME?.trim() || "gearup_access_token",

  NODE_ENV: process.env.NODE_ENV || "development",
});
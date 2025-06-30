// Constants
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
} as const;

export const ENDPOINTS = {
  REFRESH: "v1/auth/refresh",
  BASE_URL: import.meta.env.VITE_BASE_URL,
  EXPRESS_URL: import.meta.env.VITE_EXPRESS_URL,
} as const;

import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const authTokensString = localStorage.getItem("token");
  if (authTokensString) {
    return authTokensString;
  }
  return "";
};

export const isTokenExpiredOld = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const isTokenExpired = (token: string, marginSeconds = 1): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const expiryTimeMs = exp * 1000;
    const marginMs = marginSeconds * 1000;
    return expiryTimeMs < Date.now() + marginMs;
  } catch {
    return true;
  }
};

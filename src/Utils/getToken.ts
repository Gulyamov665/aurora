import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const authTokensString = localStorage.getItem("token");
  if (authTokensString) {
    return authTokensString;
  }
  return "";
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

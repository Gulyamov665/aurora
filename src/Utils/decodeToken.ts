import { IsUserType } from "@store/user/types";
import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("token");
  let decodedToken: IsUserType | null = null;

  if (token) {
    try {
      decodedToken = jwtDecode<IsUserType>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return decodedToken;
  }
  return null;
};

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;
// const admins = "admins/";

const getToken = () => {
  const authTokensString = localStorage.getItem("authTokens");

  if (authTokensString) {
    const authTokens = JSON.parse(authTokensString);
    return authTokens ? `Bearer ${authTokens.access}` : "";
  }
};

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
});

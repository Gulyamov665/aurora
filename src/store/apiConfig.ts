import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseURL = import.meta.env.VITE_BASE_URL;

const getToken = () => {
  const authTokensString = localStorage.getItem("token");
  if (authTokensString) {
    return `Bearer ${authTokensString}`;
  }
  return "";
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

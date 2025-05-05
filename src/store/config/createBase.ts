import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { getToken } from "@/Utils/getToken";

export const createBaseQuery = (url: string) => {
  return fetchBaseQuery({
    baseUrl: url,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};

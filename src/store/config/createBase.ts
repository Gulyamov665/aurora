import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { getToken } from "@/Utils/getToken";
import { getCookie } from "@/Utils/tools";

export const createBaseQuery = (url: string) => {
  return fetchBaseQuery({
    baseUrl: url,
    // credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const csrfToken = getCookie("csrftoken");
      if (csrfToken) {
        headers.set("X-CSRFToken", csrfToken);
      }
      return headers;
    },
  });
};

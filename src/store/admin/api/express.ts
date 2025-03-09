import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => {
  const authTokensString = localStorage.getItem("token");
  if (authTokensString) {
    return `Bearer ${authTokensString}`;
  }
  return "";
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
});

export const testExpress = createApi({
  reducerPath: "express",
  tagTypes: ["express"],
  baseQuery,

  endpoints: (build) => ({
    getOrders: build.query({
      query: () => "/orders",
    }),
  }),
});

export const { useGetOrdersQuery } = testExpress;

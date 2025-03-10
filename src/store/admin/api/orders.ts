import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrdersType } from "@store/user/types";

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

export const ordersApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders"],
  baseQuery,

  endpoints: (build) => ({
    getOrders: build.query<OrdersType[], void>({
      query: () => "/orders",
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;

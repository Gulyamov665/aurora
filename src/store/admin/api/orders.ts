import { getToken } from "@/Utils/getToken";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { OrdersData } from "@store/user/types";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_EXPRESS_URL;
export const socket = io("https://backend.aurora-app.uz"); // Подключаем WebSocket

export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 500) {
    console.error("Ошибка 500: проблема на сервере", result.error);
    const errorData = result.error.data as { message: string };
    alert(`${errorData.message}! Попробуйте позже.`);
  }
  return result;
};

export const ordersApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders"],
  baseQuery: baseQueryWithInterceptor,

  endpoints: (build) => ({
    getOrders: build.query<OrdersData, void>({
      query: () => "/orders",
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useLazyGetOrdersQuery } = ordersApi;

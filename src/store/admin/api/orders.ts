import { getToken } from "@/Utils/getToken";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { OrdersData, OrdersType } from "@store/user/types";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_EXPRESS_URL;

export const socket = io("https://new.aurora-api.uz", {
  path: "/api-node/socket.io",
}); // Подключаем WebSocket
// export const socket = io("http://localhost:3000"); // Подключаем WebSocket

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
  tagTypes: ["orders", "cart"],
  baseQuery: baseQueryWithInterceptor,

  endpoints: (build) => ({
    getOrders: build.query<OrdersData, { vendorId: number; page: number; limit: number }>({
      query: ({ vendorId, page, limit }) => ({
        url: `/orders/${vendorId}`,
        params: { page, limit },
      }),
    }),
    getMyOrders: build.query<OrdersType[], { userId: number | undefined }>({
      query: ({ userId }) => ({
        url: `/orders/me/${userId}`,
      }),
      providesTags: ["orders"],
    }),
    getOrderById: build.query({
      query: (id) => ({
        url: `/orders/getOrderById/${id}`,
      }),
      providesTags: ["orders"],
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders", "cart"],
    }),
    getCart: build.query({
      query: ({ user, vendorId }) => ({
        url: `/cart?user_id=${user}&restaurant_id=${vendorId}`,
      }),
      providesTags: ["cart"],
    }),
    addToCart: build.mutation({
      query: (body) => ({
        url: "/cart/addToCart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    decreaseItem: build.mutation({
      query: (body) => ({
        url: "/cart/decrease",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    removeCart: build.mutation({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export type addToCartMutationType = ReturnType<typeof useAddToCartMutation>;
export type decreaseItemMutationType = ReturnType<typeof useDecreaseItemMutation>;
export type getCart = ReturnType<typeof useGetCartQuery>;
export type createOrderMutationType = ReturnType<typeof useCreateOrderMutation>;
export type getOrders = ReturnType<typeof useGetOrdersQuery>;
export type getMyOrders = ReturnType<typeof useGetMyOrdersQuery>;
export type getOrderById = ReturnType<typeof useGetOrderByIdQuery>;
export type removeCartMutationType = ReturnType<typeof useRemoveCartMutation>;

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useLazyGetOrdersQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useDecreaseItemMutation,
  useGetMyOrdersQuery,
  useRemoveCartMutation,
  useGetOrderByIdQuery,
} = ordersApi;

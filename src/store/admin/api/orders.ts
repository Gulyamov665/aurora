import { getToken } from "@/Utils/getToken";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setUser } from "@store/user/slices/authSlice";
import { GroupedOrder, OrdersData, OrdersType } from "@store/user/types";

const url = import.meta.env.VITE_EXPRESS_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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

  if (result.error?.status === 401) {
    api.dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  }

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
      providesTags: ["orders"],
    }),
    getMyOrders: build.query<GroupedOrder[], { userId: number | undefined }>({
      query: ({ userId }) => ({
        url: `/orders/me/${userId}`,
      }),
      providesTags: ["orders"],
    }),
    getOrderById: build.query<OrdersType, number>({
      query: (id) => ({
        url: `/orders/getOrderById/${id}`,
      }),
      providesTags: ["orders"],
    }),
    createOrder: build.mutation<OrdersType, any>({
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
export type getOrderByIdType = ReturnType<typeof useGetOrderByIdQuery>;
export type lazyGetOrderByIdType = ReturnType<typeof useLazyGetOrderByIdQuery>;
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
  useLazyGetOrderByIdQuery,
} = ordersApi;

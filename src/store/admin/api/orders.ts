import { BaseQueryFn, createApi, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@store/apiConfig";
import { decreaseProductInCache } from "@store/tools";
import { CartData, ChangeOrderBody, GroupedOrder, OrdersData, OrdersType } from "@store/user/types";
import { CartBadResponse, CartItem } from "@store/user/types";

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
        express: true,
      }),

      providesTags: ["orders"],
    }),
    getMyOrders: build.query<GroupedOrder[], { userId: number | undefined }>({
      query: ({ userId }) => ({
        url: `/orders/me/${userId}`,
        express: true,
      }),

      providesTags: ["orders"],
    }),
    getOrderById: build.query<OrdersType, number>({
      query: (id) => ({
        url: `/orders/getOrderById/${id}`,
        express: true,
      }),

      providesTags: ["orders"],
    }),
    createOrder: build.mutation<OrdersType, any>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
        express: true,
      }),

      invalidatesTags: ["orders", "cart"],
    }),
    updateOrder: build.mutation({
      query: ({ id, body }) => ({
        url: `/orders/update/${id}`,
        method: "PUT",
        body,
        express: true,
      }),

      invalidatesTags: ["orders"],
    }),
    getCart: build.query<any, { user?: number; vendorId?: number; loc_change?: boolean }>({
      query: ({ user, vendorId, loc_change = false }) => {
        const params: Record<string, any> = {
          user_id: user,
          restaurant_id: vendorId,
          loc_change,
        };
        return {
          url: `/cart`,
          params,
          express: true,
        };
      },

      providesTags: ["cart"],
    }),
    addToCart: build.mutation<CartData | CartBadResponse, CartItem>({
      query: (body) => ({
        url: "/cart/addToCart",
        method: "POST",
        body,
        express: true,
      }),

      transformResponse: (response: any, meta?: { response?: Response }) => {
        if (meta?.response?.status === 201) {
          // Успешно, возвращаем CartData
          return response as CartData;
        }
        // Любой другой статус (например, 200) — это CartBadResponse
        return { ...response, status: meta?.response?.status };
      },
      invalidatesTags: ["cart"],
    }),
    changeOrder: build.mutation<OrdersType, ChangeOrderBody>({
      query: (body) => ({
        url: "orders/changeOrderComposition",
        method: "POST",
        body,
        express: true,
      }),

      invalidatesTags: ["orders"],
    }),
    decreaseItem: build.mutation({
      query: (body) => ({
        url: "/cart/decrease",
        method: "POST",
        body,
        express: true,
      }),
      async onQueryStarted(newItem, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApi.util.updateQueryData(
            "getCart",
            { user: newItem.user_id, vendorId: newItem.restaurant_id },
            (draft: CartData) => {
              decreaseProductInCache(draft, newItem);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["cart"],
    }),
    removeCart: build.mutation({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
        method: "DELETE",
        express: true,
      }),

      invalidatesTags: ["cart"],
    }),
  }),
});

export type addToCartMutationType = ReturnType<typeof useAddToCartMutation>;
export type UpdateOrderMutationType = ReturnType<typeof useUpdateOrderMutation>;
export type decreaseItemMutationType = ReturnType<typeof useDecreaseItemMutation>;
export type getCart = ReturnType<typeof useGetCartQuery>;
export type createOrderMutationType = ReturnType<typeof useCreateOrderMutation>;
export type getOrders = ReturnType<typeof useGetOrdersQuery>;
export type getMyOrders = ReturnType<typeof useGetMyOrdersQuery>;
export type getOrderByIdType = ReturnType<typeof useGetOrderByIdQuery>;
export type lazyGetOrderByIdType = ReturnType<typeof useLazyGetOrderByIdQuery>;
export type removeCartMutationType = ReturnType<typeof useRemoveCartMutation>;
export type ChangeOrderMutationType = ReturnType<typeof useChangeOrderMutation>;

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
  useUpdateOrderMutation,
  useChangeOrderMutation,
} = ordersApi;

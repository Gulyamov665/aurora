import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { DeliveryRuleType } from "@store/user/types";

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",
  tagTypes: ["delivery"],
  baseQuery,
  endpoints: (build) => ({
    getDeliverRulesByRestaurant: build.query<DeliveryRuleType[], number>({
      query: (id) => `v1/delivery/rules?restaurant_id=${id}`,
      providesTags: ["delivery"],
    }),

    getDeliveryRule: build.query<DeliveryRuleType, number>({
      query: (id) => `v1/delivery/rules/${id}`,
      providesTags: ["delivery"],
    }),

    addDeliveryRule: build.mutation({
      query: (body) => ({
        url: "v1/delivery/rules",
        method: "POST",
        body,
      }),
      invalidatesTags: ["delivery"],
    }),

    updateDeliveryRule: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/delivery/rules/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["delivery"],
    }),
    toggleActiveDeliveryRule: build.mutation({
      query: ({ id, is_active}) => ({
        url: `v1/delivery/rules/${id}/active`,
        method: "POST",
        body: is_active,
      }),
      invalidatesTags: ["delivery"],
    }),
    deleteDeliveryRule: build.mutation({
      query: (id) => ({
        url: `v1/delivery/rules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delivery"],
    }),
  }),
});

export type AddDeliveryRuleMutationType = ReturnType<typeof useAddDeliveryRuleMutation>;
export type GetDeliveryRuleQueryType = ReturnType<typeof useGetDeliveryRuleQuery>;
export type GetDeliverRulesByRestaurantQueryType = ReturnType<typeof useGetDeliverRulesByRestaurantQuery>;
export type UpdateDeliveryRuleMutationType = ReturnType<typeof useUpdateDeliveryRuleMutation>;
export type DeleteDeliveryRuleMutationType = ReturnType<typeof useDeleteDeliveryRuleMutation>;
export type LazyGetDeliverRulesByRestaurantQueryType = ReturnType<typeof useLazyGetDeliverRulesByRestaurantQuery>;
export type useToggleActiveDeliveryRuleMutationType = ReturnType<typeof useToggleActiveDeliveryRuleMutation>;


export const {
useAddDeliveryRuleMutation,
useGetDeliveryRuleQuery,
useGetDeliverRulesByRestaurantQuery,
useDeleteDeliveryRuleMutation,
useLazyGetDeliverRulesByRestaurantQuery,
useUpdateDeliveryRuleMutation,
useToggleActiveDeliveryRuleMutation
} = deliveryApi;

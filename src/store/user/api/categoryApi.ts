import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfigUser";

export const categoriesApiUser = createApi({
  reducerPath: "categoriesApiUser",
  baseQuery,

  endpoints: (build) => ({
    getCategories: build.query({
      query: (res) => `category?restaurant__name=${res}`,
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
    }),
    updateOrder: build.mutation({
      query: (body) => ({
        url: "categories/update_order/",
        method: "POST",
        body,
      }),
    }),

    updateCategory: build.mutation({
      query: (body) => ({
        url: "category/",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateOrderMutation } = categoriesApiUser;

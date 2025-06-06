import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";
import { CategoryType } from "@/apps/client/features/category/types";

export const categoriesApiUser = createApi({
  reducerPath: "categoriesApiUser",
  baseQuery,

  endpoints: (build) => ({
    getCategories: build.query<CategoryType[], string>({
      query: (res) => `/v1/category?restaurant__name=${res}`,
    }),
    addCategory: build.mutation<CategoryType, Partial<CategoryType>>({
      query: (body) => ({
        url: "/v1/category",
        method: "POST",
        body,
      }),
    }),
    updateOrder: build.mutation<CategoryType, Partial<CategoryType>>({
      query: (body) => ({
        url: "category/update_order/",
        method: "POST",
        body,
      }),
    }),

    updateCategory: build.mutation<CategoryType, Partial<CategoryType>>({
      query: (body) => ({
        url: "/client/categorys",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateOrderMutation } = categoriesApiUser;

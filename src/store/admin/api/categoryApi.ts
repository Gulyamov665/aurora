import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { ProductType } from "@store/user/types";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["Categories"],
  baseQuery,

  endpoints: (build) => ({
    getCategories: build.query({
      query: (res) => `v1/category/?restaurant__name=${res}`,
      providesTags: ["Categories"],
    }),
    getFilteredCategories: build.query<Record<string, ProductType[]>, number>({
      query: (id) => `v1/category/menu/${id}`,
      providesTags: ["Categories"],
    }),

    addCategory: build.mutation({
      query: (body) => ({
        url: "v1/category/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateOrder: build.mutation({
      query: (body) => ({
        url: "v1/category/update_order/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/category/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `v1/category/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export type CategoryMutationType = ReturnType<typeof useAddCategoryMutation>;
export type UpdateCategoryType = ReturnType<typeof useUpdateCategoryMutation>;
export type DeleteCategoryType = ReturnType<typeof useDeleteCategoryMutation>;
export type GetCategoriesQueryType = ReturnType<typeof useGetCategoriesQuery>;

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateOrderMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetFilteredCategoriesQuery,
} = categoriesApi;

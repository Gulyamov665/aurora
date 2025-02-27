import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery,
  endpoints: (build) => ({
    getProducts: build.query({
      query: (res) => `menu?restaurant__name=${res}`,
      providesTags: ["Products"],
    }),

    getProduct: build.query({
      query: (id) => `menu/${id}`,
      providesTags: ["Products"],
    }),

    addProduct: build.mutation({
      query: (body) => ({
        url: "menu/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation({
      query: ({ body, updatedItem }) => ({
        url: `menu/${updatedItem}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
} = productsApi;

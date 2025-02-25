import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfigUser";
import { ProductType } from "../types";

export const productsApiUser = createApi({
  reducerPath: "productsApiUser",
  baseQuery,
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], string>({
      query: (res) => `menu?restaurant__name=${res}`,
    }),
    addProduct: build.mutation<ProductType, Partial<ProductType>>({
      query: (body) => ({
        url: "menus",
        method: "POST",
        body,
      }),
    }),
    updateProduct: build.mutation<ProductType, { body: Partial<ProductType>; updatedItem: number }>({
      query: ({ body, updatedItem }) => ({
        url: `menus/${updatedItem}`,
        method: "PUT",
        body,
      }),
    }),
    deleteProduct: build.mutation<{ success: boolean }, { id: number }>({
      query: ({ id }) => ({
        url: `menus/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } =
  productsApiUser;

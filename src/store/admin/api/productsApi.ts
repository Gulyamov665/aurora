import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { ProductType } from "@store/user/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery,
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ res, category }) =>
        !category ? `v1/menu/?restaurant__name=${res}` : `v1/menu/?restaurant__name=${res}&category_id=${category}`,
      providesTags: ["Products"],
      keepUnusedDataFor: 300,
    }),

    getProduct: build.query<ProductType, string>({
      query: (id) => `v1/menu/${id}/`,
      providesTags: ["Products"],
    }),

    getImages: build.query({
      query: ({ vendor, category }) => `v1/menu/thumb/?restaurant__name=${vendor}&category_id=${category}`,
      providesTags: ["Products"],
    }),

    getImageById: build.query({
      query: (productId) => `v1/menu/thumb/${productId}`,
      providesTags: ["Products"],
    }),

    updateImage: build.mutation({
      query: ({ body, productId }) => ({
        url: `v1/menu/thumb/${productId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "v1/menu/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/menu/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `v1/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    variant: build.mutation({
      query: (body) => ({
        url: `v1/variant`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    variantDelete: build.mutation({
      query: (id) => ({
        url: `v1/variant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    variantToggleActive: build.mutation({
      query: (id) => ({
        url: `v1/variant/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export type AddProductMutationType = ReturnType<typeof useAddProductMutation>;
export type LoadImageMutation = ReturnType<typeof useUpdateImageMutation>;
export type VariantMutationType = ReturnType<typeof useVariantMutation>;
export type VariantDeleteMutationType = ReturnType<typeof useVariantDeleteMutation>;
export type VariantToggleActiveMutationType = ReturnType<typeof useVariantToggleActiveMutation>;
export type LazyGetProductsQueryType = ReturnType<typeof useLazyGetProductsQuery>;

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useLazyGetProductsQuery,
  useGetImagesQuery,
  useUpdateImageMutation,
  useGetImageByIdQuery,
  useVariantMutation,
  useVariantDeleteMutation,
  useVariantToggleActiveMutation,
} = productsApi;

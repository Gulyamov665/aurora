import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../apiConfigUser'



export const productsApiUser = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Products'],
    baseQuery,
    endpoints: (build) => ({
        getProducts: build.query({
            query: (res) => `menu/${res}`,
            providesTags: ["Products"]
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'menus',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Products']
        }),

        updateProduct: build.mutation({
            query: ({ body, updatedItem }) => ({
                url: `menus/${updatedItem}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Products']
        }),

        deleteProduct: build.mutation({
            query: ({ id }) => ({
                url: `menus/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApiUser
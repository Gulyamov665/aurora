import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../apiConfigUser'



export const productsApiUser = createApi({
    reducerPath: 'productsApiUser',
    baseQuery,
    endpoints: (build) => ({
        getProducts: build.query({
            query: (res) => `menu/${res}`,
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'menus',
                method: "POST",
                body,
            }),
        }),

        updateProduct: build.mutation({
            query: ({ body, updatedItem }) => ({
                url: `menus/${updatedItem}`,
                method: 'PUT',
                body
            }),
        }),

        deleteProduct: build.mutation({
            query: ({ id }) => ({
                url: `menus/${id}`,
                method: 'DELETE',
            }),
        })
    })
})

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApiUser
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../apiConfig'



export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    tagTypes: ['Categories'],
    baseQuery,

    endpoints: build => ({
        getCategories: build.query({
            query: res => `category/${res}`,
            providesTags: ['Categories']
        }),
        addCategory: build.mutation({
            query: body => ({
                url: 'categorys',
                method: "POST",
                body
            }),
            invalidatesTags: ['Categories']
        }),
        updateOrder: build.mutation({
            query: body => ({
                url: 'categories/update_order/',
                method: "POST",
                body
            }),
            invalidatesTags: ['Categories']
        }),

        updateCategory: build.mutation({
            query: ({ body, id }) => ({
                url: `categorys/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Categories']
        }),

        deleteCategory: build.mutation({
            query: ({ id }) => ({
                url: `categorys/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories']
        })
    })
})

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateOrderMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi
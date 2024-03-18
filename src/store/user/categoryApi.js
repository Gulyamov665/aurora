import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../apiConfigUser'



export const categoriesApiUser = createApi({
    reducerPath: 'categoriesApiUser',
    baseQuery,

    endpoints: build => ({
        getCategories: build.query({
            query: res => `category/${res}`,
        }),
        addCategory: build.mutation({
            query: body => ({
                url: 'categorys',
                method: "POST",
                body
            }),
        }),
        updateOrder: build.mutation({
            query: body => ({
                url: 'categories/update_order/',
                method: "POST",
                body
            }),
        }),

        updateCategory: build.mutation({
            query: body => ({
                url: 'categorys/',
                method: 'PUT',
                body
            })
        })
    })
})

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateOrderMutation } = categoriesApiUser
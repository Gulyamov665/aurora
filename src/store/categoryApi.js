import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './apiConfig'



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
        updateCategory: build.mutation({
            query: body => ({
                url: 'categorys/',
                method: 'PUT',
                body
            })
        })
    })
})

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoriesApi
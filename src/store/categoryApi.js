import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURL = process.env.REACT_APP_BASE_URL
const admins = 'admins/'

const getToken = () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    return authTokens ? `Bearer ${authTokens.access}` : ''
}


const baseQuery = fetchBaseQuery({
    baseUrl: baseURL + admins,
    prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
            headers.set('Authorization', token)
        }

        return headers
    },
})


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
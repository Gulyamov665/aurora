import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURL = process.env.REACT_APP_BASE_URL
const getToken = () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    return authTokens ? `Bearer ${authTokens.access}` : ''
}

const admins = 'admins/'

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL + admins,
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
        const token = getToken();
        if (token) {
            headers.set('Authorization', token)
        }
        return headers
    },
})

export const productsApi = createApi({
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

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { baseQuery } from './apiConfig'

const baseURL = process.env.REACT_APP_BASE_URL

const getToken = () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    return authTokens ? `Bearer ${authTokens.access}` : ''
}

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
            headers.set('Authorization', token)
        }

        return headers
    },
})

export const tokenApi = createApi({
    reducerPath: 'tokenApi',
    baseQuery,

    endpoints: build => ({
        getToken: build.mutation({
            query: body => ({
                url: 'token/',
                method: 'POST',
                body
            })
        })
    })
})




export const { useGetTokenMutation } = tokenApi
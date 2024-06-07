import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURL = import.meta.env.VITE_BASE_URL
const admins = 'admins/'

const getToken = () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    return authTokens ? `Bearer ${authTokens.access}` : ''
}


export const baseQuery = fetchBaseQuery({
    baseUrl: baseURL + admins,
    prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
            headers.set('Authorization', token)
        }

        return headers
    },
})
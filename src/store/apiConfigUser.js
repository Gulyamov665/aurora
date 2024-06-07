import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURL = import.meta.env.VITE_BASE_URL
const admins = 'client/'



export const baseQuery = fetchBaseQuery({
    baseUrl: baseURL + admins,
})
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURL = process.env.REACT_APP_BASE_URL
const admins = 'client/'



export const baseQuery = fetchBaseQuery({
    baseUrl: baseURL + admins,
})
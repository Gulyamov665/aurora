import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfig";



export const promosApi = createApi({
    reducerPath: 'promosApi',
    tagTypes: ['Promos'],
    baseQuery,

    endpoints: build => ({
        getPromos: build.query({
            query: res => `promo/${res}`,
            providesTags: ['Prmos']
        })
    })
})


export const { useGetPromosQuery } = promosApi
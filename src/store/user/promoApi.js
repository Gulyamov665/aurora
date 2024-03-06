import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";



export const promosApiUser = createApi({
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


export const { useGetPromosQuery } = promosApiUser
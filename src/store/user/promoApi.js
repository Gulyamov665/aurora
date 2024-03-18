import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";



export const promosApiUser = createApi({
    reducerPath: 'promosApiUser',
    tagTypes: ['Promos'],
    baseQuery,

    endpoints: build => ({
        getPromos: build.query({
            query: res => `promo/${res}`,
            providesTags: ['Promos']
        })
    })
})


export const { useGetPromosQuery } = promosApiUser
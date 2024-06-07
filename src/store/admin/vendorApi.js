import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../apiConfig"


export const vendorApi = createApi({
    reducerPath: 'vendorApi',
    tagTypes: ['vendor'],
    baseQuery,

    endpoints: build => ({
        load: build.query({
            query: (params) => `restaurants/${params}`
        })
    })
})

export const { useLoadQuery } = vendorApi
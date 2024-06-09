import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../apiConfig"


export const vendorApi = createApi({
    reducerPath: 'vendorApi',
    tagTypes: ['vendor'],
    baseQuery,

    endpoints: build => ({
        load: build.query({
            query: (params) => `restaurants/${params}`,
            providesTags: ['vendor']
        }),
        update: build.mutation({
            query: ({ body, vendor }) => ({
                url: `restaurants/${vendor}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vendor']
        })
    })

})

export const { useLoadQuery, useUpdateMutation } = vendorApi
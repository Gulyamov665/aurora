import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../../apiConfigUser";

const URL = import.meta.env.VITE_NOTIFICATION_URL


export const dispatcher = createApi({
    reducerPath: 'dispatcher',
    tagTypes: ['notification'],
    baseQuery,


    endpoints: build => ({
        sendMessage: build.mutation({
            query: body => ({
                url: URL + 'dispatcher/',
                method: "POST",
                body,
            }),
            invalidatesTags: ['notification']
        }),

        waiterCall: build.mutation({
            query: body => ({
                url: URL + 'waiterCall/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['notification']
        })
    })
})

export const { useSendMessageMutation, useWaiterCallMutation } = dispatcher
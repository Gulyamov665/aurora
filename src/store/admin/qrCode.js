import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfig";


export const qrCodeApi = createApi({
    reducerPath: 'qrCodeApi',
    baseQuery,

    endpoints: build => ({
        getQrCode: build.query({
            query: () => 'download/qr',
            responseType: 'blob'
        }),

        qrCode: build.mutation({
            query: (body) => ({
                url: 'generate/qr',
                method: 'POST',
                body
            })
        })
    })
})

export const { useGetQrCodeQuery, useQrCodeMutation } = qrCodeApi
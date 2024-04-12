import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfig";



export const promosApi = createApi({
    reducerPath: 'promosApi',
    tagTypes: ['Promos'],
    baseQuery,

    endpoints: build => ({
        getPromos: build.query({
            query: res => `promo/${res}`,
            providesTags: ['Promos']
        }),

        getPromo: build.query({
            query: id => `promo/${id}`,
            providesTags: ['Promos']
        }),

        addPromos: build.mutation({
            query: (body) => ({
                url: 'promos',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Promos']
        }),
        updatePromo: build.mutation({
            query: ({ body, id }) => ({
                url: `promos/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Promos']
        }),
        deletePromo: build.mutation({
            query: ({ id }) => ({
                url: `promos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Promos']
        })
    })
})


export const { useGetPromosQuery, useAddPromosMutation, useUpdatePromoMutation } = promosApi
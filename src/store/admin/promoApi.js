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
            query: id => `promos/${id}`,
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
            query: (id) => ({
                url: `promos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Promos']
        })
    })
})


export const { useGetPromosQuery, useAddPromosMutation, useUpdatePromoMutation, useGetPromoQuery, useDeletePromoMutation } = promosApi


// http://localhost:8000/api/admins/promo/Olivia  ------->  GET filter by restaurant

// http://localhost:8000/api/admins/promos/       ------->  GET all promos

// http://localhost:8000/api/admins/promos/       ------->  POST for promo model

// http://localhost:8000/api/admins/promos/int:pk ------->  GET only one promo by promo_id

// http://localhost:8000/api/admins/promos/int:pk ------->  PUT update promo by promo_id

// http://localhost:8000/api/admins/promos/int:pk ------->  DELETE delete promo by promo_id
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";

export const promosApi = createApi({
  reducerPath: "promosApi",
  tagTypes: ["Promos"],
  baseQuery,

  endpoints: (build) => ({
    getPromos: build.query({
      query: (res) => `v1/promo/?restaurant__name=${res}`,
      providesTags: ["Promos"],
    }),

    getPromo: build.query({
      query: (id) => `v1/promo/${id}`,
      providesTags: ["Promos"],
    }),

    addPromos: build.mutation({
      query: (body) => ({
        url: "v1/promo/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Promos"],
    }),
    updatePromo: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/promo/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Promos"],
    }),
    deletePromo: build.mutation({
      query: (id) => ({
        url: `v1/promo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promos"],
    }),
  }),
});

export const {
  useGetPromosQuery,
  useAddPromosMutation,
  useUpdatePromoMutation,
  useGetPromoQuery,
  useDeletePromoMutation,
} = promosApi;

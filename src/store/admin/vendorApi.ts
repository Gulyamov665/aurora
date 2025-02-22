import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfig";

type Vendor = {
  waiter_chat_id: number;
  photo: string;
  name: string;
  adress: string;
  instagramm: string;
  telegram: string;
  logo: string;
};

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  tagTypes: ["vendor"],
  baseQuery,

  endpoints: (build) => ({
    load: build.query<Vendor | null, string>({
      query: (params) => `restaurants/${params}`,
      providesTags: ["vendor"],
    }),
    update: build.mutation({
      query: ({ body, vendor }) => ({
        url: `restaurants/${vendor}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["vendor"],
    }),
  }),
});

export const { useLoadQuery, useUpdateMutation } = vendorApi;

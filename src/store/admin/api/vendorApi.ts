import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { UpdateMutationType, VendorInfoType } from "@store/user/types";
import { setVendorId } from "@store/user/slices/authSlice";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  tagTypes: ["vendor"],
  baseQuery,

  endpoints: (build) => ({
    load: build.query<VendorInfoType, string>({
      query: (params) => `v1/restaurant/${params}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setVendorId(data?.id));
        } catch (error) {
          // опционально: лог или обработка ошибки
        }
      },
      providesTags: ["vendor"],
    }),
    update: build.mutation<VendorInfoType, UpdateMutationType>({
      query: ({ body, vendor }) => ({
        url: `admins/restaurants/${vendor}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["vendor"],
    }),
  }),
});

export const { useLoadQuery, useUpdateMutation } = vendorApi;

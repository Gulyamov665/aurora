import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";
import { VendorInfoType } from "../types";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery,
  endpoints: (build) => ({
    getRestaurants: build.query<VendorInfoType[], void>({
      query: () => `v1/restaurant`,
    }),
  }),
});

export const { useGetRestaurantsQuery } = restaurantsApi;

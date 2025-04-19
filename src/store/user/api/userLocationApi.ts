import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";

export const userLocationApi = createApi({
  reducerPath: "userLocationApi",
  baseQuery,
  endpoints: (build) => ({
    getUserLocations: build.query({
      query: ({ lat, lon }) => ({
        url: "v1/auth/user/location",
        method: "GET",
        params: {
          lat,
          lon,
          format: "json",
        },
      }),
    }),
    addUserLocation: build.mutation({
      query: (body) => ({
        url: "v1/auth/user/location",
        method: "POST",
        body,
      }),
    }),
  }),
});

export type addUserLocationMutationType = ReturnType<typeof useAddUserLocationMutation>;

export const { useAddUserLocationMutation } = userLocationApi;

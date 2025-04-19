import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";
import { UserLocationType } from "../types";

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
    getUserLocationById: build.query({
      query: (id) => ({
        url: `v1/auth/user/location/${id}`,
        method: "GET",
      }),
    }),
    addUserLocation: build.mutation<UserLocationType, UserLocationType>({
      query: (body) => ({
        url: "v1/auth/user/location",
        method: "POST",
        body,
      }),
    }),
  }),
});

export type addUserLocationMutationType = ReturnType<typeof useAddUserLocationMutation>;

export const { useAddUserLocationMutation, useGetUserLocationByIdQuery } = userLocationApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";
import { UserLocationType } from "../types";

export const userLocationApi = createApi({
  reducerPath: "userLocationApi",
  baseQuery,
  tagTypes: ["UserLocation"],
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
      providesTags: ["UserLocation"],
    }),
    getUserLocationById: build.query({
      query: (id) => ({
        url: `v1/auth/user/location/${id}`,
        method: "GET",
      }),
      providesTags: ["UserLocation"],
    }),
    addUserLocation: build.mutation<UserLocationType, UserLocationType>({
      query: (body) => ({
        url: "v1/auth/user/location",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserLocation"],
    }),
  }),
});

export type addUserLocationMutationType = ReturnType<typeof useAddUserLocationMutation>;

export const { useAddUserLocationMutation, useGetUserLocationByIdQuery } = userLocationApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NominatimReverseResponse } from "../types";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nominatim.openstreetmap.org/" }),
  endpoints: (build) => ({
    getLocations: build.query<NominatimReverseResponse, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: "/reverse",
        method: "GET",
        params: {
          lat,
          lon,
          format: "json",
        },
      }),
    }),
  }),
});

export type getLocationsQueryType = ReturnType<typeof useLazyGetLocationsQuery>;

export const { useLazyGetLocationsQuery } = locationApi;

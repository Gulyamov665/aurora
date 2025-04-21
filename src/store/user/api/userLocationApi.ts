import { UserLocationResponseType, UserLocationType } from "../types";
import { sharedApi } from "./shared";

export const userLocationApi = sharedApi.injectEndpoints({
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
    getUserLocationById: build.query<UserLocationResponseType[], number>({
      query: (id) => ({
        url: `v1/auth/user/location`,
        method: "GET",
        params: { user_id: id },
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
    toggleActiveLocation: build.mutation({
      query: (id) => ({
        url: `v1/auth/user/location/${id}/toggle_active`,
        method: "PATCH",
      }),
      invalidatesTags: ["UserLocation"],
    }),
    updateUserLocation: build.mutation({
      query: ({ id, body }) => ({
        url: `v1/auth/user/location/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserLocation"],
    }),
    deleteUserLocation: build.mutation({
      query: (id) => ({
        url: `v1/auth/user/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserLocation"],
    }),
  }),
});

export type getUserLocationByIdQueryType = ReturnType<typeof useUpdateUserLocationMutation>;
export type toggleActiveLocation = ReturnType<typeof useToggleActiveLocationMutation>;
export type addUserLocationMutationType = ReturnType<typeof useAddUserLocationMutation>;

export const {
  useAddUserLocationMutation,
  useGetUserLocationByIdQuery,
  useToggleActiveLocationMutation,
  useUpdateUserLocationMutation,
  useDeleteUserLocationMutation,
} = userLocationApi;

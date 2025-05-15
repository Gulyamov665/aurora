import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { RoleType, StaffType } from "@store/user/types";

export const staffApi = createApi({
  reducerPath: "staffApi",
  tagTypes: ["Staff"],
  baseQuery,
  endpoints: (build) => ({
    getUserRole: build.query<RoleType[], void>({
      query: () => `v1/auth/user/roles`,
      providesTags: ["Staff"],
      // keepUnusedDataFor: 300,
    }),

    getStaff: build.query<StaffType, number>({
      query: (id) => `v1/restaurant/editors/${id}`,
      providesTags: ["Staff"],
    }),

    addStaff: build.mutation({
      query: (body) => ({
        url: "v1/auth/vendor/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),

    updateStaff: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/auth/user/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export type AddStaffMutationType = ReturnType<typeof useAddStaffMutation>;
export type GetStaffQueryType = ReturnType<typeof useGetStaffQuery>;
export type GetUserRoleQueryType = ReturnType<typeof useGetUserRoleQuery>;
export type LazyGetUserRoleQueryType = ReturnType<typeof useLazyGetUserRoleQuery>;

export const {
  useAddStaffMutation,
  useGetStaffQuery,
  useLazyGetStaffQuery,
  useGetUserRoleQuery,
  useUpdateStaffMutation,
  useLazyGetUserRoleQuery
} = staffApi;

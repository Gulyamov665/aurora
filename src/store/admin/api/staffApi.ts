import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { CourierTypes, RoleType, StaffType } from "@store/user/types";

export const staffApi = createApi({
  reducerPath: "staffApi",
  tagTypes: ["employee"],
  baseQuery,
  endpoints: (build) => ({
    getUserRole: build.query<RoleType[], void>({
      query: () => `v1/auth/user/roles`,
      providesTags: ["employee"],
    }),

    getStaff: build.query<StaffType, number>({
      query: (id) => `v1/restaurant/editors/${id}`,
      providesTags: ["employee"],
    }),

    getCouriers: build.query<CourierTypes, number>({
      query: (id) => `v1/restaurant/couriers/${id}`,
      providesTags: ["employee"],
    }),

    addStaff: build.mutation({
      query: (body) => ({
        url: "v1/auth/vendor/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["employee"],
    }),

    updateStaff: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/auth/user/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});

export type AddStaffMutationType = ReturnType<typeof useAddStaffMutation>;
export type GetStaffQueryType = ReturnType<typeof useGetStaffQuery>;
export type GetUserRoleQueryType = ReturnType<typeof useGetUserRoleQuery>;
export type LazyGetUserRoleQueryType = ReturnType<typeof useLazyGetUserRoleQuery>;
export type LazyGetCouriersQueryType = ReturnType<typeof useLazyGetCouriersQuery>;
export type UseGetCouriersQueryType = ReturnType<typeof useGetCouriersQuery>;

export const {
  useAddStaffMutation,
  useGetStaffQuery,
  useLazyGetStaffQuery,
  useGetUserRoleQuery,
  useUpdateStaffMutation,
  useLazyGetUserRoleQuery,
  useLazyGetCouriersQuery,
  useGetCouriersQuery,
} = staffApi;

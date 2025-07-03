import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../apiConfig";
import { ScheduleType } from "@store/user/types";

export const schedulesApi = createApi({
  reducerPath: "schedulesApi",
  tagTypes: ["schedule"],
  baseQuery,
  endpoints: (build) => ({
    getScheduleRestaurant: build.query({
      query: ({id}) => `v1/restaurant/schedule?restaurant_id=${id}`,
      providesTags: ["schedule"],
    }),

    getSchedule: build.query<ScheduleType, number>({
      query: (id) => `v1/restaurant/schedule/${id}`,
      providesTags: ["schedule"],
    }),

    addSchedule: build.mutation({
      query: (body) => ({
        url: "v1/restaurant/schedule",
        method: "POST",
        body,
      }),
      invalidatesTags: ["schedule"],
    }),

    updateSchedule: build.mutation({
      query: ({ body, id }) => ({
        url: `v1/restaurant/schedule${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["schedule"],
    }),
  }),
});

export type AddScheduleMutationType = ReturnType<typeof useAddScheduleMutation>;
export type GetScheduleQueryType = ReturnType<typeof useGetScheduleQuery>;
export type GetScheduleRestaurantQueryType = ReturnType<typeof useGetScheduleRestaurantQuery>;
export type LazyGetScheduleQueryType = ReturnType<typeof useLazyGetScheduleQuery>;
export type LazyGetScheduleRestaurantQuery = ReturnType<typeof useLazyGetScheduleRestaurantQuery>;
export type UpdateScheduleMutationType = ReturnType<typeof useUpdateScheduleMutation>;


export const {
  useAddScheduleMutation,
  useGetScheduleQuery,
  useGetScheduleRestaurantQuery,
  useLazyGetScheduleQuery,
  useLazyGetScheduleRestaurantQuery,
  useUpdateScheduleMutation
} = schedulesApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@store/apiConfig";
import { ReportsType } from "@store/user/types";

export const reportsApi = createApi({
  reducerPath: "reports",
  baseQuery,
  tagTypes: ["reports"],
  endpoints: (build) => ({
    reports: build.mutation<ReportsType, { startDate: string; endDate: string; restaurantId: number }>({
      query: ({ startDate, endDate, restaurantId }) => ({
        url: "/orders/ordersByDateRange",
        method: "POST",
        body: { startDate, endDate, restaurantId },
        express: true,
      }),
      invalidatesTags: ["reports"],
    }),
  }),
});

export const { useReportsMutation } = reportsApi;

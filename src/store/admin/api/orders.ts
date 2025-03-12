import { getToken } from "@/Utils/getToken";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { OrdersData } from "@store/user/types";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://backend.aurora-app.uz/api",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 500) {
    console.error("Ошибка 500: проблема на сервере", result.error);
    const errorData = result.error.data as { message: string };
    alert(`${errorData.message}! Попробуйте позже.`);
  }

  return result;
};

export const ordersApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders"],
  baseQuery: baseQueryWithInterceptor,

  endpoints: (build) => ({
    getOrders: build.query<OrdersData, void>({
      query: () => "/orders",
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;

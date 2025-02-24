import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});

export const userAuth = createApi({
  reducerPath: "userAuth",
  baseQuery,

  endpoints: (build) => ({
    auth: build.mutation({
      query: (body) => ({
        url: "auth/user/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAuthMutation } = userAuth;

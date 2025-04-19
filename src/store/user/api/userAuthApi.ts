import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserInfoType } from "../types";

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
        url: "v1/auth/user/login",
        method: "POST",
        body,
      }),
    }),
    me: build.query<UserInfoType, number>({
      query: (id) => `v1/auth/user/${id}`,
    }),
  }),
});

export type meQueryType = ReturnType<typeof useMeQuery>;

export const { useAuthMutation, useMeQuery } = userAuth;

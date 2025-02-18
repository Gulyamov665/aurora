import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});

export const userRegistration = createApi({
  reducerPath: "userRegistration",
  baseQuery,

  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    codeRequest: build.mutation({
      query: ({ id, code }) => ({
        url: `auth/user/${id}/verify`,
        method: "PATCH",
        body: code,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useCodeRequestMutation } = userRegistration;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegistrationRequestType, RegistrationResponseType } from "../types";

const baseURL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});

export const userRegistration = createApi({
  reducerPath: "userRegistration",
  baseQuery,

  endpoints: (build) => ({
    registration: build.mutation<RegistrationResponseType, Partial<RegistrationRequestType>>({
      query: (body) => ({
        url: "v1/auth/register",
        method: "POST",
        body,
      }),
    }),
    codeRequest: build.mutation<{ success: boolean }, { id: string; code: { code: string } }>({
      query: ({ id, code }) => ({
        url: `auth/user/${id}/verify`,
        method: "PATCH",
        body: code,
      }),
    }),
  }),
});

export type RegistrationMutation = ReturnType<typeof useRegistrationMutation>;
export type CodeRequest = ReturnType<typeof useCodeRequestMutation>;

export const { useRegistrationMutation, useCodeRequestMutation } = userRegistration;

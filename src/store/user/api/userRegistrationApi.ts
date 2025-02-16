import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

// const getToken = () => {
//   const authTokensString = localStorage.getItem("authTokens");

//   if (authTokensString) {
//     const authTokens = JSON.parse(authTokensString);
//     return authTokens ? `Bearer ${authTokens.access}` : "";
//   }
// };

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  //   prepareHeaders: (headers) => {
  //     const token = getToken();
  //     if (token) {
  //       headers.set("Authorization", token);
  //     }

  //     return headers;
  //   },
});

export const userRegistration = createApi({
  reducerPath: "userRegistration",
  baseQuery,

  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body,
      }),
    }),
    codeRequest: build.mutation({
      query: ({ id, code }) => ({
        url: `/api/v1/auth/user/${id}/verify`,
        method: "PATCH",
        body: { code: code },
      }),
    }),
  }),
});

export const { useRegistrationMutation, useCodeRequestMutation } = userRegistration;

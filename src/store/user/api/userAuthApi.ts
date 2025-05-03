import { UserInfoType } from "../types";
import { sharedApi } from "./shared";

export const userAuth = sharedApi.injectEndpoints({
  endpoints: (build) => ({
    auth: build.mutation({
      query: (body) => ({
        url: "v1/auth/user/login",
        method: "POST",
        body,
      }),
    }),
    refresh: build.mutation({
      query: (body) => ({
        url: "v1/auth/refresh",
        body,
      }),
    }),
    me: build.query<UserInfoType, number>({
      query: (id) => `v1/auth/user/${id}`,
      providesTags: ["UserLocation"],
    }),
  }),
});

export type meQueryType = ReturnType<typeof useMeQuery>;

export const { useAuthMutation, useMeQuery, useLazyMeQuery } = userAuth;

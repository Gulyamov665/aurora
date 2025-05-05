import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query";
import { logout } from "@store/user/authThunks";
import { ENDPOINTS } from "./constants";

export type TokenType = {
  access_token: string;
  refresh: string;
};

export const handleRefreshToken = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
  base: BaseQueryFn
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
  const refreshResult = await base(
    {
      url: ENDPOINTS.REFRESH,
      method: "POST",
      credentials: "include",
    },
    api,
    extraOptions
  );

  if (refreshResult?.data) {
    const newToken = (refreshResult.data as TokenType)?.access_token;
    localStorage.setItem("token", newToken);

    return (await base(args, api, extraOptions)) as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
  }

  await api.dispatch(logout());
  return refreshResult as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
};

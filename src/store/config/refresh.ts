import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query";
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
  base: BaseQueryFn<
    string | FetchArgs,
    unknown, // Data
    FetchBaseQueryError, // Error
    FetchBaseQueryMeta // Meta
  >
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

  if (refreshResult?.error) {
    if (
      "status" in refreshResult.error &&
      typeof refreshResult.error.status === "number" &&
      refreshResult.error.status === 401
    ) {
      await api.dispatch(logout());
    }
  }
  // localStorage.removeItem("token");
  return refreshResult as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
};

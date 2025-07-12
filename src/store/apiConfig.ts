import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createBaseQuery } from "./config/createBase";
import { HTTP_STATUS } from "./config/constants";
import { handleRefreshToken } from "./config/refresh";
import { handleServerError } from "./config/errorHandlers";
import { ENDPOINTS } from "./config/constants";
import { getToken, isTokenExpired } from "@/Utils/getToken";

const base = createBaseQuery(ENDPOINTS.BASE_URL);
const expressBase = createBaseQuery(ENDPOINTS.EXPRESS_URL);

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export const baseQuery: BaseQueryFn<
  string | (FetchArgs & { express?: boolean }),
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const isExpress = typeof args !== "string" && Boolean((args as any).express);
  const executor = isExpress ? expressBase : base;

  try {
    const token = getToken();
    if (token && isTokenExpired(token, 2)) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = handleRefreshToken(api, extraOptions, base).finally(() => {
          isRefreshing = false;
        });
      }
      await refreshPromise;
    }

    let result = await executor(args, api, extraOptions);

    if (
      (typeof result.error?.status === "number" && result.error?.status === HTTP_STATUS.SERVER_ERROR) ||
      (result.error?.status === "PARSING_ERROR" && result.error.originalStatus === HTTP_STATUS.SERVER_ERROR)
    ) {
      handleServerError(result.error);
    }

    return result;
  } catch (error) {
    return { error: error as FetchBaseQueryError };
  }
};

import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createBaseQuery } from "./config/createBase";
import { HTTP_STATUS } from "./config/constants";
import { handleRefreshToken } from "./config/refresh";
import { handleServerError } from "./config/errorHandlers";
import { ENDPOINTS } from "./config/constants";
import { getToken, isTokenExpired } from "@/Utils/getToken";

const base = createBaseQuery(ENDPOINTS.BASE_URL);

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  try {
    const token = getToken();

    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = handleRefreshToken(args, api, extraOptions, base)
          .then((refreshResult) => {
            if ("error" in refreshResult) {
              throw refreshResult.error;
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      // Ждём пока токен обновится, чтобы другие запросы тоже ждали
      await refreshPromise;
    }
    let result = await base(args, api, extraOptions);

    // if (result.error?.status === HTTP_STATUS.UNAUTHORIZED) {
    //   result = await handleRefreshToken(args, api, extraOptions, base);
    // }

    if (
      (typeof result.error?.status === "number" && result.error?.status === HTTP_STATUS.SERVER_ERROR) ||
      (result.error?.status === "PARSING_ERROR" && result.error.originalStatus === HTTP_STATUS.SERVER_ERROR)
    ) {
      handleServerError(result.error);
    }

    return result;
  } catch (error) {
    console.error("Query Error:", error);
    return { error: error as FetchBaseQueryError };
  }
};

import { getToken } from "@/Utils/getToken";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setUser } from "./user/slices/authSlice";
const baseURL = import.meta.env.VITE_BASE_URL;

const base = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await base(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  }

  if (result.error?.status === 500) {
    console.error("Ошибка 500: проблема на сервере", result.error);
    const errorData = result.error.data as { message: string };
    alert(`${errorData.message}! Попробуйте позже.`);
  }

  return result;
};

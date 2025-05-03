// import { getToken } from "@/Utils/getToken";
// import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// import { setUser } from "./user/slices/authSlice";
// const baseURL = import.meta.env.VITE_BASE_URL;

// const base = fetchBaseQuery({
//   baseUrl: baseURL,
//   credentials: "include",
//   prepareHeaders: (headers) => {
//     const token = getToken();
//     if (token) {
//       headers.set("Authorization", token);
//     }
//     return headers;
//   },
// });

// export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   const result = await base(args, api, extraOptions);

//   if (result.error?.status === 401) {
//     const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

//     api.dispatch(setUser(null));
//     localStorage.removeItem("token");
//     localStorage.removeItem("refresh");
//   }

//   if (result.error?.status === 500) {
//     console.error("Ошибка 500: проблема на сервере", result.error);
//     const errorData = result.error.data as { message: string };
//     alert(`${errorData.message}! Попробуйте позже.`);
//   }

//   return result;
// };

import { getToken } from "@/Utils/getToken";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query/react";
import { logout } from "./user/slices/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

const baseQuery1 = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include", // 🔐 отправляет HttpOnly cookie
  prepareHeaders: (headers) => {
    const token = getToken(); // 🔄 accessToken из памяти / localStorage (если используешь)
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery1(args, api, extraOptions);

  if (result.error?.status === 401) {
    // 🔄 Пробуем обновить accessToken через refreshToken из HttpOnly cookie
    const refreshResult = await baseQuery1(
      {
        url: "v1/auth/refresh",
        method: "POST", // 👈 меняем метод
        body: { refresh: localStorage.getItem("refresh") },
        credentials: "include",
      },
      api,
      extraOptions
    );

    if (refreshResult.data && typeof refreshResult.data === "object" && "accessToken" in refreshResult.data) {
      const newToken = (refreshResult.data as any).accessToken;
      localStorage.setItem("token", newToken);
      // ✅ Сохраняем новый токен в localStorage/памяти и повторяем исходный запрос
      // setToken(newToken);
      // api.dispatch(setUser({ token: newToken })); // адаптируй под свою структуру

      // 🔁 Повторяем запрос с новым токеном
      result = (await baseQuery1(args, api, extraOptions)) as QueryReturnValue<
        unknown,
        FetchBaseQueryError,
        FetchBaseQueryMeta
      >;
    } else {
      // 🔐 Не удалось обновить токен — деавторизуем
      api.dispatch(logout());
      localStorage.removeItem("token");
    }
  }

  if (result.error?.status === 500) {
    console.error("Ошибка 500: проблема на сервере", result.error);
    const errorData = result.error.data as { message: string };
    alert(`${errorData.message}! Попробуйте позже.`);
  }

  return result;
};

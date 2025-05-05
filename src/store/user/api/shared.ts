import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "@store/user/apiConfigUser";
import { baseQuery } from "@store/apiConfig";

export const sharedApi = createApi({
  reducerPath: "sharedApi",
  baseQuery,
  tagTypes: ["UserLocation"], // все общие теги здесь
  endpoints: () => ({}),
});

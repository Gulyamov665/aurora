import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiConfigUser";

export const sharedApi = createApi({
  reducerPath: "sharedApi",
  baseQuery,
  tagTypes: ["UserLocation"], // все общие теги здесь
  endpoints: () => ({}),
});

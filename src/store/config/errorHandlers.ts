import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const handleServerError = (error: FetchBaseQueryError): void => {
  console.log("error handler");
  console.error("Server Error:", error);
  const errorData = error.data as { message: string };
  window.alert(`${errorData.message}! Please try again later.`);
};

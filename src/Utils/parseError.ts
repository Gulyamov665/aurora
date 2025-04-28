import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorType } from "@store/user/types";

export const parseError = (error: FetchBaseQueryError | SerializedError | undefined): ErrorType | undefined => {
  if (!error) return undefined;

  if ("status" in error) {
    const errorData = error.data as { detail?: string; message?: string };

    return {
      message: errorData.detail || errorData.message || "Ошибка запроса",
      code: Number(error.status),
    };
  }

  return {
    message: error.message || "Неизвестная ошибка",
    code: 500,
  };
};

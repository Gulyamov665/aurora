import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "./slices/authSlice";

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  localStorage.removeItem("token"); // побочный эффект ВНЕ редьюсера
  dispatch(clearUser()); // очистка пользователя в store
});

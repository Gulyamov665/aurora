import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { AuthState, ErrorType, IsUserType } from "../types";
import { decodeToken } from "@/Utils/decodeToken";

const initialState: AuthState = {
  regStep: 0,
  userId: "",
  botLink: "",
  isUser: decodeToken() || null,
  error: {
    message: "",
    code: 0,
  },
};

const userAuth = createSlice({
  name: "authState",
  initialState,
  reducers: {
    regStepChange(state, action) {
      state.regStep = action.payload;
    },
    userId(state, action) {
      state.userId = action.payload;
    },
    botLinkAction(state, action) {
      state.botLink = action.payload;
    },
    regError(state, action: PayloadAction<ErrorType>) {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<IsUserType | null>) {
      state.isUser = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.authState;

export const { regStepChange, userId, botLinkAction, regError, setUser } = userAuth.actions;
export default userAuth.reducer;

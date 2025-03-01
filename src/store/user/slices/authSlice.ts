import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

interface ErrorType {
  message: string;
  code: number;
}

const userAuth = createSlice({
  name: "authState",
  initialState: {
    regStep: 0,
    userId: "",
    botLink: "",
    isUser: !!localStorage.getItem("token") || false,
    error: {
      message: "",
      code: 0,
    },
  },
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
    setUser(state, action) {
      state.isUser = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.authState;

export const { regStepChange, userId, botLinkAction, regError, setUser } = userAuth.actions;
export default userAuth.reducer;

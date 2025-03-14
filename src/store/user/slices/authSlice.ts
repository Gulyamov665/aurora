import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { AuthState, ErrorType, IsUserType } from "../types";
import { decodeToken } from "@/Utils/decodeToken";
// import { userAuth } from "../api/userAuthApi";

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

const userAuthState = createSlice({
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
    logout(state) {
      localStorage.removeItem("token");
      state.isUser = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(logout, (state) => {
  //       console.log("Logout action dispatched");
  //       localStorage.removeItem("token");
  //       state.isUser = null;
  //     })
  //     .addMatcher(userAuth.endpoints.auth.matchPending, (state, action: PayloadAction<undefined>) => {
  //       console.log("Pending action:", action.type);
  //     })
  //     .addMatcher(userAuth.endpoints.auth.matchFulfilled, (state, action: PayloadAction<{ accessToken: string }>) => {
  //       console.log("Fulfilled action:", action.payload);
  //     })
  //     .addMatcher(userAuth.endpoints.auth.matchRejected, (state, action) => {
  //       console.log("Rejected action:", action.payload);
  //     });
  // },
});

export const authState = (state: RootState) => state.authState;

export const { regStepChange, userId, botLinkAction, regError, setUser, logout } = userAuthState.actions;
export default userAuthState.reducer;

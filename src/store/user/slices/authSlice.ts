import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const userAuth = createSlice({
  name: "authState",
  initialState: {
    regStep: 0,
    userId: "",
    botLink: "",
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
  },
});

export const authState = (state: RootState) => state.authState;

export const { regStepChange, userId, botLinkAction } = userAuth.actions;
export default userAuth.reducer;

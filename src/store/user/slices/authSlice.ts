import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const userAuth = createSlice({
  name: "authState",
  initialState: {
    regStep: 0,
    userId: "",
  },
  reducers: {
    regStepChange(state, action) {
      state.regStep = action.payload;
    },
    userId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.authState;

export const { regStepChange, userId } = userAuth.actions;
export default userAuth.reducer;

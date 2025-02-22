import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

const appSlice = createSlice({
  name: "modals",
  initialState: {
    data: [],
    categoryData: [],
    removedData: [],
    createModal: false,
    updateModal: false,
    selectedCategory: null,
    search: "",
  },
  reducers: {
    toggleCreate(state) {
      state.createModal = !state.createModal;
    },
    toggleUpdate(state) {
      state.updateModal = !state.updateModal;
    },
    selectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    productSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const modals = (state: RootState) => state.modals;

export const { toggleCreate, toggleUpdate, selectedCategory, productSearch } = appSlice.actions;

export default appSlice.reducer;

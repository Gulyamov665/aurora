import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
interface DeleteModalState {
  open: boolean;
  message: string;
  type: string;
  id: number | null;
}

interface AppState {
  data: any[];
  categoryData: any[];
  removedData: any[];
  createModal: boolean;
  updateModal: boolean;
  selectedCategory: any | null;
  search: string;
  deleteModal: DeleteModalState;
  deleteConfirmed: boolean;
  isLoading: boolean;
  isRejected: boolean;
  error: {} | null;
}

const initialState: AppState = {
  data: [],
  categoryData: [],
  removedData: [],
  createModal: false,
  updateModal: false,
  selectedCategory: null,
  search: "",
  deleteModal: { open: false, message: "", type: "", id: null },
  deleteConfirmed: false,
  isLoading: false,
  isRejected: false,
  error: null,
};

const appSlice = createSlice({
  name: "modals",
  initialState,
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
    showDeleteModal: (state, action: PayloadAction<{ message: string; type: string; id: number | null }>) => {
      state.deleteModal.open = true;
      state.deleteModal.message = action.payload.message;
      state.deleteModal.type = action.payload.type;
      state.deleteModal.id = action.payload.id;
    },
    closeDeleteModal: (state) => {
      state.deleteModal.open = false;
      state.deleteModal.type = "";
      state.deleteModal.id = null;
      state.deleteConfirmed = false;
    },
    confirmDeletion: (state) => {
      state.deleteConfirmed = true;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const modals = (state: RootState) => state.modals;

export const {
  toggleCreate,
  toggleUpdate,
  selectedCategory,
  productSearch,
  showDeleteModal,
  closeDeleteModal,
  confirmDeletion,
} = appSlice.actions;

export default appSlice.reducer;

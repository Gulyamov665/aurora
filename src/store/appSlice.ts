import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface DeleteModalState {
  open: boolean;
  message: string;
  type: string;
  id: number | null;
}

interface AddModalState {
  open: boolean;
  type: string;
  vendorId: number | null;
  categoryId?: number | null;
  changeItem?: string;
}

interface ISnack {
  open: boolean
  color?: "success" | "info" | "warning" | "error"
  message?: string
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
  addModalState: AddModalState;
  addressSelector: boolean;
  snackState: ISnack
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
  addModalState: {
    open: false,
    type: "",
    vendorId: null,
    categoryId: null,
    changeItem: "",
  },
  addressSelector: false,
  snackState:{
    open: false,
    color: 'info',
    message: ''
  }
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
    setOpenAddModal: (
      state,
      action: PayloadAction<{ vendorId: number; categoryId?: number; type: string; changeItem?: string }>
    ) => {
      state.addModalState.open = true;
      state.addModalState.vendorId = action.payload.vendorId;
      state.addModalState.categoryId = action.payload.categoryId;
      state.addModalState.type = action.payload.type;
      state.addModalState.changeItem = action.payload.changeItem;
    },
    onCloseAddModal: (state) => {
      state.addModalState.open = false;
      state.addModalState.vendorId = null;
      state.addModalState.categoryId = null;
      state.addModalState.type = "";
      state.addModalState.changeItem = "";
    },
    AddressSelectorToggle: (state, action) => {
      state.addressSelector = action.payload;
    },
    snack : (state, action: PayloadAction<ISnack>) => {
      state.snackState.open = action.payload.open
      state.snackState.color = action.payload.color
      state.snackState.message = action.payload.message
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(
  //       (action) => action.type.endsWith("/pending"),
  //       (state) => {
  //         state.isLoading = true;
  //       }
  //     )
  //     .addMatcher(
  //       (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
  //       (state) => {
  //         state.isLoading = false;
  //       }
  //     );
  // },
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
  setOpenAddModal,
  onCloseAddModal,
  AddressSelectorToggle,
  snack
} = appSlice.actions;

export default appSlice.reducer;

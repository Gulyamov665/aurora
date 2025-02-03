import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'modals',
    initialState: {
        data: [],
        categoryData: [],
        removedData: [],
        createModal: false,
        updateModal: false,
        selectedCategory: null,
        search: '',
    },
    reducers: {
        toggleCreate(state) {
            state.createModal = !state.createModal
        },
        toggleUpdate(state) {
            state.updateModal = !state.updateModal
        },
        selectedCategory(state, action) {
            state.selectedCategory = action.payload
        },
        productSearch(state, action) {
            state.search = action.payload
        },
    },

}

)


export const { toggleCreate, toggleUpdate, selectedCategory, removeData, productSearch } = appSlice.actions

export default appSlice.reducer

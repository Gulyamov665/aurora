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
        }
    },

}

)


export const { toggleCreate, toggleUpdate, selectedCategory, removeData } = appSlice.actions

export default appSlice.reducer

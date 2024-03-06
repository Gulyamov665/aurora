import { createSlice } from "@reduxjs/toolkit";
import { useAddProductMutation } from './admin/productsApi'




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

export const addProductAsync = (productData) => async (dispatch) => {
    const { data, error } = await useAddProductMutation(productData);

    if (data) {
        // Обработка успешного ответа
        console.log('Продукт успешно добавлен:', data);
        dispatch(/* Ваш экшен при успешном запросе */);
    } else if (error) {
        // Обработка ошибки
        console.error('Не удалось добавить продукт:', error);
        dispatch(/* Ваш экшен при ошибке */);
    }
};

export const { toggleCreate, toggleUpdate, selectedCategory, removeData } = appSlice.actions

export default appSlice.reducer

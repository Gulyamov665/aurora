import { createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../Utils/calc";


const initialState = {
    totalPrice: 0,
    items: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeCartItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeCartItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem.count) {
                findItem.count--;
            }
            if (findItem.count === 0) {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }


            state.totalPrice = calcTotalPrice(state.items);
        },
    }
})

export const { addCartItem, removeCartItems, removeCartItem, minusItem } = cartSlice.actions
export default cartSlice.reducer
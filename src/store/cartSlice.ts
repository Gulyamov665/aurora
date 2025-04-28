import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { calcTotalPrice } from "../Utils/calc";
import { CartItem, CartType } from "./user/types";
import { RootState } from "@store/index";

const initialState: CartType = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        // findItem.quantity++;
      } else {
        state.items.push({
          ...action.payload,
        });
      }
    },

    removeCartItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      // state.totalPrice = calcTotalPrice(state.items);
    },

    removeCartItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        // findItem.quantity--;
      }

      if (findItem && !findItem.quantity) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      }

      // state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const cart = (state: RootState) => state.cart;

export const { addCartItem, removeCartItems, removeCartItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

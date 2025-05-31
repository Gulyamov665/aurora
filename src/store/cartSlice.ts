import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartType } from "./user/types";
import { RootState } from "@store/index";

const initialState: CartType = {
  totalPrice: 0,
  CartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.CartItems.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.quantity) {
        findItem.quantity++;
      } else {
        state.CartItems.push({
          ...action.payload,
        });
      }
    },

    removeCartItem(state, action: PayloadAction<CartItem>) {
      state.CartItems = state.CartItems.filter((item) => item.id !== action.payload.id);
    },

    removeCartItems(state) {
      state.CartItems = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.CartItems.find((obj) => obj.id === action.payload.id);

      if (findItem && findItem.quantity) {
        findItem.quantity--;
      }

      if (findItem && !findItem.quantity) {
        state.CartItems = state.CartItems.filter((item) => item.id !== action.payload.id);
      }
    },
  },
});

export const cart = (state: RootState) => state.cart;

export const { addCartItem, removeCartItems, removeCartItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../Utils/calc";
import { CartType } from "./user/types";
import { RootState } from "@store/index";
import { ProductType } from "@/apps/client/modules/order/types/orderTypes";

const initialState: CartType = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<ProductType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeCartItem(state, action: PayloadAction<ProductType>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeCartItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<ProductType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
      }

      if (findItem && !findItem.count) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const cart = (state: RootState) => state.cart;

export const { addCartItem, removeCartItems, removeCartItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

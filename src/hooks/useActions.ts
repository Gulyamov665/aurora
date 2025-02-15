import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { addCartItem, minusItem } from "../store/cartSlice"; // Импорт экшенов

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ addCartItem, minusItem }, dispatch);
};

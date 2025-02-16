import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { addCartItem, minusItem } from "@/store/cartSlice";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ addCartItem, minusItem }, dispatch);
};

import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { addCartItem, minusItem } from "@/store/cartSlice";
import { logout } from "@store/user/slices/authSlice";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ addCartItem, minusItem, logout }, dispatch);
};

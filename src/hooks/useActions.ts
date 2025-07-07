import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { addCartItem, minusItem } from "@/store/cartSlice";
import { logout } from "@store/user/authThunks";
import {
  AddressSelectorToggle,
  closeDeleteModal,
  confirmDeletion,
  onCloseAddModal,
  setOpenAddModal,
  showDeleteModal,
  snack,
} from "@store/appSlice";
import { setVendorId } from "@store/user/slices/authSlice";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      addCartItem,
      minusItem,
      logout,
      showDeleteModal,
      closeDeleteModal,
      confirmDeletion,
      setOpenAddModal,
      onCloseAddModal,
      AddressSelectorToggle,
      snack,
      setVendorId,
    },
    dispatch
  );
};

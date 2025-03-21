import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { addCartItem, minusItem } from "@/store/cartSlice";
import { logout } from "@store/user/slices/authSlice";
import { closeDeleteModal, confirmDeletion, onCloseAddModal, setOpenAddModal, showDeleteModal } from "@store/appSlice";

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
    },
    dispatch
  );
};

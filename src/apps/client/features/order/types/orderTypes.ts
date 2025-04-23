import { CartItem, IsUserType, OrdersType, VendorInfoType } from "@store/user/types";
import { MouseEvent } from "react";
import { ProductData } from "../../products/types";
import { addToCartMutationType, decreaseItemMutationType, removeCartMutationType } from "@store/admin/api/orders";
import { NavigateFunction } from "react-router-dom";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { LocationData } from "../../map/types";

export type ProductType = {
  id: number;
  name: string;
  photo: string;
  price: number;
  count: number;
  description?: string;
  is_active: boolean;
  restaurant: number;
  availability: boolean;
  category: number;
};

export type OrderProductsProps = {
  product: CartItem;
  decrease: () => void;
  increase: (event: MouseEvent<HTMLButtonElement>, productData: ProductData) => void;
};

type OrderItems = {
  products: CartItem[];
  totalPrice: number;
  user: number;
  vendor: number;
  id: number;
};

export type OrderProps = {
  data: VendorInfoType;
  isUser: Partial<IsUserType> | null;
  items: OrderItems;
  decreaseItem: decreaseItemMutationType[0];
  addToCart: addToCartMutationType[0];
  removeCart: removeCartMutationType[0];
};

export type CostBoxType = {
  items: OrderItems;
  toConfirmPage: () => void;
};

export type ConfirmOrderProps = {
  state: { from: string };
  navigate: NavigateFunction;
  handleCreateOrder: () => void;
  items: OrderItems;
  register: UseFormRegister<LocationData>;
  watch?: UseFormWatch<LocationData>;
};

export type OrderHistoryProps = {
  order: OrdersType;
};

export type OrderDetailProps = {
  order: OrdersType;
};

export type GoToLoginProps = {
  goToLogin: () => void;
  goToRegister: () => void;
  text: string;
};

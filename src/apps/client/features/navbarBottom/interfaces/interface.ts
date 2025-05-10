import { CartItem, IsUserType, VendorInfoType } from "@store/user/types";

export type CartItems = {
  id: number;
  products: CartItem[];
  totalPrice: number;
  user: number;
  vendor: number;
};

export interface NavbarBottomProps {
  items: CartItems;
  isUser: Partial<IsUserType> | null;
  current?: string;
  visible: boolean;
}

export interface NavbarBottomPageProps {
  data?: VendorInfoType;
}

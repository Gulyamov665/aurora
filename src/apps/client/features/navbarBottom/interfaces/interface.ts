import { CartItem, IsUserType, UserInfoType, VendorInfoType } from "@store/user/types";

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
  user?: UserInfoType;
}

export interface NavbarBottomPageProps {
  data?: VendorInfoType;
  user?: UserInfoType;
}

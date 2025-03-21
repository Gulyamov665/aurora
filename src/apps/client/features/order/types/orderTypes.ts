// import { CartItem } from "@store/user/types";

import { CartItem } from "@store/user/types";

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
  increase: () => void;
  decrease: () => void;
};

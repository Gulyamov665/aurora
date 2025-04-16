import { MouseEvent } from "react";
import { ProductType } from "../../category/types";
import { ProductData } from "../../products/types";
import { CartItem } from "@store/user/types";

export type CardType = {
  product: CartItem;
  findItem: (id: number) => CartItem;
  decrease: (event: MouseEvent<HTMLButtonElement>, productData: number) => void;
  addToCart: (event: MouseEvent<HTMLButtonElement>, productData: ProductData) => Promise<void>;
};

export type CardViewProps = {
  item: ProductType | null;
  open: boolean;
  setIsOpen: (value: boolean) => void;
  count: number;
  setCount: (count: number) => void;
};

export type CardViewContentProps = {
  addToCart: (item: ProductType) => void;
  item: ProductType;
  count: number;
  setCount: (count: number) => void;
};

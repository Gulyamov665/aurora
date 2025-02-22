import { Dispatch, SetStateAction } from "react";
import { ProductType } from "../../category/types";

export type CardType = {
  id: number;
  photo: string;
  name: string;
  price: number;
  is_active: boolean;
  restaurant: number;
  availability: boolean;
  category: number;
};

export type CardViewProps = {
  item: ProductType | null;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export type CardViewContentProps = {
  addToCart: (item: ProductType) => void;
  item: ProductType;
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
};

export interface CartItem extends CardType {
  count: number;
}

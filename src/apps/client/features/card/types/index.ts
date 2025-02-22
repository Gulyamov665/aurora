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

export interface CartItem extends CardType {
  count: number;
}

import { MouseEvent } from "react";
import { ProductType } from "../../category/types";
import { ProductData } from "../../products/types";
import { CartItem } from "@store/user/types";
import { IVariants } from "../../order/types/orderTypes";

export type CardType = {
  product: CartItem;
  findItem: (id: number) => number;
  decrease: (event: MouseEvent<HTMLButtonElement>, productData: CartItem) => void;
  addToCart: (event: MouseEvent<HTMLButtonElement>, productData: ProductData, quantity: number) => Promise<void>;
};

export type CardViewProps = {
  item: ProductType | null;
  open: boolean;
  setIsOpen: (value: boolean) => void;
  count: number;
  setCount: (count: number) => void;
};

export type CardViewContentProps = {
  item: ProductType;
  count: number;
  setCount: (count: number) => void;
  setIsOpen: (value: boolean) => void;
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedVariant: number | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<number | null>>;
  option: IVariants | null;
};

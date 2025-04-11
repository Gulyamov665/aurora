import { RefObject } from "react";
import { CategoryType, ProductType } from "../../category/types";

export type ProductsProps = {
  menuItems: ProductType[];
  category: CategoryType[];
  sectionRefs: RefObject<HTMLDivElement[]>;
  handleView: (item: ProductType) => void;
};

export interface ProductData {
  id: number;
  name: string;
  price: number;
  photo: string;
  // quantity: number;
}

export type GuestBoxProps = {
  setToRegPage: React.Dispatch<React.SetStateAction<boolean>>;
};

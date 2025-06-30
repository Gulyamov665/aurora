import { RefObject } from "react";
import { CategoryType } from "../../category/types";
import { ProductType } from "@store/user/types";
import { IVariants } from "../../order/types/orderTypes";

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
  options?: IVariants | null;
}

export type GuestBoxProps = {
  setToRegPage: React.Dispatch<React.SetStateAction<boolean>>;
  singleBtn?: boolean;
  title?: string;
};

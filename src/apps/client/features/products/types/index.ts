import { RefObject } from "react";
import { CategoryType, ProductType } from "../../category/types";



export type ProductsProps = {
  menuItems: ProductType[];
  category: CategoryType[];
  sectionRefs: RefObject<HTMLDivElement[]>;
  handleView: (item: ProductType) => void;
};

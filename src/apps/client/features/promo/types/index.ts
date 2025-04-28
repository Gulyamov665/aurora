import { ProductType } from "../../category/types";

export type PromoTypes = {
  promo: ProductType[];
  handleViewPromo: (item: ProductType) => void;
};

import { MouseEvent } from "react";
import { ProductData } from "@/apps/client/features/products/types";

export type CalcType = {
  price: number;
  quantity: number;
};

export type SpyType = (
  entries: IntersectionObserverEntry[],
  navLinks: React.RefObject<HTMLAnchorElement[]>,
  setActiveIndex: (index: number) => void
) => void;

export type RestaurantOrderType = {
  id: number;
  name: string;
  photo: string;
  address: string;
  phone: 12321321;
};
export interface AddToCartArgs {
  event: MouseEvent<HTMLButtonElement>;
  productData: ProductData;
  userId: number;
  restaurantId: number;
  addToCart: (body: any) => Promise<any>; // уточни тип, если нужно
}

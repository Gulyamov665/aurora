import { ProductType } from "@/apps/client/modules/order/types/orderTypes";

export type CartType = {
  totalPrice: number;
  items: ProductType[];
};

export type { ProductType };

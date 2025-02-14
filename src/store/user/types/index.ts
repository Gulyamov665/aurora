import { ProductType } from "@/apps/client/features/order/types/orderTypes";

export type CartType = {
  totalPrice: number;
  items: ProductType[];
};

export type { ProductType };

import { OrdersData, OrdersType } from "@store/user/types";

export type OrderKey = keyof OrdersType;

export interface OrdersTableProps {
  data: OrdersData | undefined;
}

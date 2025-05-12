import { lazyGetOrderByIdType } from "@store/admin/api/orders";
import { OrdersType } from "@store/user/types";

export type OrderKey = keyof OrdersType;

export interface OrdersTableProps {
  data: OrdersType[] | undefined;
  isLoading: boolean;
  setDetails: React.Dispatch<React.SetStateAction<boolean>>;
  getOrderById: lazyGetOrderByIdType[0];
}

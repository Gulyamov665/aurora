// import { UpdateOrderMutationType } from "@store/admin/api/orders";
import { LazyGetCouriersQueryType } from "@store/admin/api/staffApi";
import { CartItem, OrdersType, ProductType } from "@store/user/types";
import { RefObject } from "react";
import { Control } from "react-hook-form";
import { ChangeOrderMutationType } from "@store/admin/api/orders";
import { IVariants } from "@/apps/client/features/order/types/orderTypes";

export type OrderKey = keyof OrdersType;

export interface OrdersTableProps {
  data: OrdersType[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  audioRef?: RefObject<HTMLAudioElement | null>;
  setSoundAllowed: (value: boolean) => void;
  soundAllowed: boolean;
  onEyeClick: (id: number) => Promise<void>;
}

export interface OrderDetailsFormProps {
  order?: OrdersType;
  couriersResult: LazyGetCouriersQueryType[1];
  control: Control<{ courier_id: number; status: string }>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  // updateOrder: UpdateOrderMutationType[0];
  isDirty: boolean;
  handleSubmit: any;
  onSubmit: (data: { courier_id: number; status: string }) => void;
}

export interface IOrderContentProps {
  handleChangeQuantity: (productId: number, type: string, optionId?: number) => Promise<void>;
  orderProducts: CartItem[];
  control: any;
}

export interface OrderProductEditProps {
  productsResult: Record<string, ProductType[]>;
  orderProducts: CartItem[];
  control: Control<any>;
  handleChangeOrder: ChangeOrderMutationType[0];
  orderId: number | undefined;
}

export interface IOrderProductsListProps {
  showOptions: boolean;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddProduct: (productId: number, type: string, optionId?: number) => Promise<void>;
  product: ProductType;
  control: Control<any>;
}

export interface IOrderVariantsDropdown {
  handleChangeQuantity: (productId: number, type: string, optionId?: number) => Promise<void>;
  variants?: IVariants[];
  id: number;
}

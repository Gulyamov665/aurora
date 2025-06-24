// import { UpdateOrderMutationType } from "@store/admin/api/orders";
import { LazyGetCouriersQueryType } from "@store/admin/api/staffApi";
import { OrdersType } from "@store/user/types";
import { RefObject } from "react";
import { Control } from "react-hook-form";

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

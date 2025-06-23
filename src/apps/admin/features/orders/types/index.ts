
import { OrdersType } from "@store/user/types";
import { RefObject } from "react";

export type OrderKey = keyof OrdersType;

export interface OrdersTableProps {
  data: OrdersType[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  audioRef?: RefObject<HTMLAudioElement | null>;
  setSoundAllowed: (value: boolean) => void;
  soundAllowed: boolean;
  onEyeClick: (id: number) => Promise<void>
}

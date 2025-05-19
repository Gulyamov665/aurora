import { useEffect } from "react";
import { OrdersType } from "@store/user/types";
import { useSocket } from "./useSocket";

interface UseOrderSocketProps {
  vendorId: number;
  onOrderUpdate: (params: { vendorId: number; page: number; limit: number }) => void;
}

export const useOrderSocket = ({ vendorId, onOrderUpdate }: UseOrderSocketProps) => {
  const socket = useSocket();
  useEffect(() => {
    const handleNewOrder = (newOrder: OrdersType) => {
      if (newOrder.restaurant.id === vendorId) {
        onOrderUpdate({ vendorId, page: 1, limit: 10 });
      }
    };

    const handleUpdateOrder = (updatedOrder: OrdersType) => {
      if (updatedOrder.restaurant.id === vendorId) {
        onOrderUpdate({ vendorId, page: 1, limit: 10 });
      }
    };

    socket?.on("new_order", handleNewOrder);
    socket?.on("update_order", handleUpdateOrder);

    return () => {
      socket?.off("new_order", handleNewOrder);
      socket?.off("update_order", handleUpdateOrder);
    };
  }, [vendorId, onOrderUpdate]);
};

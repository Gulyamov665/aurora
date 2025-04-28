import { useEffect } from "react";
import { socket } from "@store/admin/api/orders";
import { OrdersType } from "@store/user/types";

interface UseOrderSocketProps {
  vendorId: number;
  onOrderUpdate: (params: { vendorId: number; page: number; limit: number }) => void;
}

export const useOrderSocket = ({ vendorId, onOrderUpdate }: UseOrderSocketProps) => {
  useEffect(() => {
    const handleNewOrder = (newOrder: OrdersType) => {
      console.log("📦 Новый заказ по сокету:", newOrder);
      if (newOrder.restaurant.id === vendorId) {
        onOrderUpdate({ vendorId, page: 1, limit: 10 });
      }
    };

    const handleUpdateOrder = (updatedOrder: OrdersType) => {
      console.log("🔄 Обновление заказа по сокету:", updatedOrder);
      if (updatedOrder.restaurant.id === vendorId) {
        onOrderUpdate({ vendorId, page: 1, limit: 10 });
      }
    };

    socket.on("new_order", handleNewOrder);
    socket.on("update_order", handleUpdateOrder);

    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("update_order", handleUpdateOrder);
    };
  }, [vendorId, onOrderUpdate]);
};

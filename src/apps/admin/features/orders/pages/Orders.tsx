import { FC, useEffect } from "react";
import OrdersTable from "../components/OrdersTable";
import { useLazyGetOrdersQuery } from "@store/admin/api/orders";
import { socket } from "@store/admin/api/orders";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";

const Orders: FC = () => {
  const { data } = useOutletContext<OutletContextType>();
  const [getOrders, { data: lazyData, isLoading }] = useLazyGetOrdersQuery();

  useEffect(() => {
    if (data) getOrders();
  }, [data]);

  useEffect(() => {
    const handleNewOrder = (newOrder: any) => {
      console.log("📦 Новый заказ по сокету:", newOrder);
      if (newOrder.restaurant === data?.id) getOrders();
    };

    const handleUpdateOrder = (updatedOrder: any) => {
      console.log("🔄 Обновление заказа по сокету:", updatedOrder);
      if (updatedOrder.restaurant === data?.id) getOrders();
    };

    socket.on("new_order", handleNewOrder);
    socket.on("update_order", handleUpdateOrder);

    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("update_order", handleUpdateOrder);
    };
  }, [data, socket]);

  return (
    <div className="container">
      <OrdersTable data={lazyData} isLoading={isLoading} />
    </div>
  );
};

export default Orders;
